import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { handleOptsModal } from "../../utils/groupSettings.js";

import GroupOptionsModal from "./GroupOptionsModal.jsx";

import styles from "../../styles/OptsAndChatSidebar.module.css";

import optionsIcon from "../../assets/settings_icon.svg";
import addChatIcon from "../../assets/add_chat_icon.svg";
import addMemberIcon from "../../assets/add_friend_icon.svg";

const OptsAndChatSidebar = () => {
  const [isOptsModalOpen, setIsOptsModalOpen] = useState(false);
  const [ groupInfo, setGroupInfo ]= useState(null);
  const [ isConfirmLeaveOpen, setIsConfirmLeaveOpen ] = useState(false);
  const [ isConfirmDeleteGroupModalOpen, setIsConfirmDeleteGroupModalOpen ] = useState(false);

  const { groupId } = useParams();


  useEffect(() => {
    const token = sessionStorage.getItem("msgAppToken");
    if (token) {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/group-actions/get-group-info/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'GET',
        }
      )
      .then((res) => res.json())
      .then((res) => setGroupInfo(res));
    }
  }, []);

  return (
    <div className={styles.chatsAndOptsSidebar}>
      { !groupInfo ? null : (
        <h2>{groupInfo.groupName}</h2>
      )}
      {!isOptsModalOpen ? null : (
        <GroupOptionsModal groupInfo={groupInfo} setIsOptsModalOpen={setIsOptsModalOpen} setGroupInfo={setGroupInfo}/>
      )}
      <div className={styles.groupActionBtns}>
        <button
          className={styles.settingsBtn}
          type="button"
          title="Group Settings"
          onClick={(e) => handleOptsModal(e, setIsOptsModalOpen)}
        >
          <img src={optionsIcon} alt="Options" width={"25px"} height={"25px"} />
        </button>
        <button
          className={styles.addMemberBtn}
          type="button"
          title="Add Member to Group"
        >
          <img
            src={addMemberIcon}
            alt="Add Member"
            width={"25px"}
            height={"25px"}
          />
        </button>
        <button
          className={styles.addMemberBtn}
          type="button"
          title="Create Chat"
        >
          <img
            src={addChatIcon}
            alt="Create Chat"
            width={"25px"}
            height={"25px"}
          />
        </button>
      </div>
    </div>
  );
};

export default OptsAndChatSidebar;
