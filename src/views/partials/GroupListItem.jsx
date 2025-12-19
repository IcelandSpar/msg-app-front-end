import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../UserContext.jsx";

import OptionsMenu from "./OptionsMenu.jsx";
import ConfirmLeaveGroupModal from "./ConfirmLeaveGroupModal.jsx";

import moreVertIcon from "../../assets/more_vert_icon.svg";

const GroupListItem = ({
  styles,
  groupInfo,
  isUserHomeList,
  handleClickOnGroupLi,
  setMemberGroups,
}) => {
  const [isOptsOpen, setIsOptsOpen] = useState(false);
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false);

  const { profile } = useContext(UserContext);

  const handleOptsBtn = (e) => {
    e.preventDefault();
    setIsOptsOpen((prev) => !prev);
  };

  const handleOpenConfirmModal = (e) => {
    e.preventDefault();
    setIsOptsOpen(false);
    setIsConfirmLeaveOpen(true);
  };

  const handleNevermindBtn = (e) => {
    e.preventDefault();
    setIsOptsOpen(false);
    setIsConfirmLeaveOpen(false);
  };


  const handleLeaveGroupBtn = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");
    if (token && profile) {
      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/leave-group/${
          profile.id
        }/${groupInfo.groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setIsOptsOpen(false);
            setIsConfirmLeaveOpen(false);

            setMemberGroups((prev) =>
              prev.filter((item) => item.groupId != res.removedMember.groupId)
            );
          }
        });
    }
  };

  return (
    <li
      key={groupInfo.group.id}
      onClick={(e) => handleClickOnGroupLi(e, groupInfo.group.id)}
      className={`${styles.groupLiCont} navigateToGroupChat`}
    >
      <div className={`${styles.groupImgAndNameCont} navigateToGroupChat`}>
        <img
          className={`${styles.groupImg} navigateToGroupChat`}
          width={"25px"}
          height={"25px"}
          src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
            groupInfo.group.groupImgPath
          }`}
          alt={`${groupInfo.groupName} Group Chat Image`}
        />
        <h3 className={"navigateToGroupChat"}>{groupInfo.group.groupName}</h3>
      </div>
      {!isUserHomeList ? null : (
        <div onClick={handleOptsBtn} className={styles.moreOptsBtn}>
          <img src={moreVertIcon} alt="more options" />
          {!isOptsOpen ? null : (
            <OptionsMenu
              setMemberGroups={setMemberGroups}
              handleOptsBtn={handleOptsBtn}
              handleOpenConfirmModal={handleOpenConfirmModal}
              groupId={groupInfo.groupId}
              userRole={groupInfo.role}
            />
          )}
        </div>
      )}
    {!isConfirmLeaveOpen ? null : <ConfirmLeaveGroupModal handleNevermindBtn={handleNevermindBtn} groupInfo={groupInfo} handleLeaveGroupBtn={handleLeaveGroupBtn}/>}
    </li>
  );
};

export default GroupListItem;
