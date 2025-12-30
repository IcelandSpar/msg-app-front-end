import { useState } from "react";
import { useContext } from "react";
import he from "he";
import UserContext from "../../UserContext.jsx";
import { handleNevermindBtn, handleLeaveGroupBtn } from "../../utils/groupSettings.js";


import OptionsMenu from "./OptionsMenu.jsx";
import ConfirmLeaveGroupModal from "./ConfirmLeaveGroupModal.jsx";
import ConfirmDeleteGroupModal from "./ConfirmDeleteGroupModal.jsx";


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
  const [isConfirmDeleteGroupModalOpen, setIsConfirmDeleteGroupModalOpen] =
    useState(null);

  const { profile } = useContext(UserContext);

  const handleOptsBtn = (e) => {
    e.preventDefault();
    setIsOptsOpen((prev) => !prev);
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
        <h3 className={"navigateToGroupChat"}>
          {he.decode(groupInfo.group.groupName)}
        </h3>
      </div>
      {!isUserHomeList ? null : (
        <div onClick={handleOptsBtn} className={styles.moreOptsBtn}>
          <img src={moreVertIcon} alt="more options" />
          {!isOptsOpen ? null : (
            <OptionsMenu
              setIsOptsOpen={setIsOptsOpen}
              setIsConfirmLeaveOpen={setIsConfirmLeaveOpen}
              creatorId={groupInfo.group.creatorId}
            />
          )}
        </div>
      )}
      {!isConfirmDeleteGroupModalOpen ? null : <ConfirmDeleteGroupModal groupInfo={groupInfo} handleOpenConfirmDeleteModal={handleOpenConfirmDeleteModal} setMemberGroups={setMemberGroups}/>}
      {!isConfirmLeaveOpen ? null : (
        <ConfirmLeaveGroupModal
          handleNevermindBtn={handleNevermindBtn}
          groupInfo={groupInfo}
          handleLeaveGroupBtn={handleLeaveGroupBtn}
          setIsOptsOpen={setIsOptsOpen}
          setIsConfirmLeaveOpen={setIsConfirmLeaveOpen}
          setMemberGroups={setMemberGroups}
        />
      )}
    </li>
  );
};

export default GroupListItem;
