import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { handleOptsModal, fetchGroupInfo, handleInviteModal } from "../../utils/groupSettings.js";

import GroupOptionsModal from "./GroupOptionsModal.jsx";

import styles from "../../styles/OptsAndChatSidebar.module.css";

import optionsIcon from "../../assets/settings_icon.svg";
import addChatIcon from "../../assets/add_chat_icon.svg";
import addMemberIcon from "../../assets/add_friend_icon.svg";
import GroupImgAndTitle from "./GroupImgAndTitle.jsx";

const OptsAndChatSidebar = ({ includeGroupName = false, groupInfo, setGroupInfo, isAdmin, setIsInviteModalOpen }) => {
  const [isOptsModalOpen, setIsOptsModalOpen] = useState(false);
  const [ isConfirmLeaveOpen, setIsConfirmLeaveOpen ] = useState(false);
  const [ isConfirmDeleteGroupModalOpen, setIsConfirmDeleteGroupModalOpen ] = useState(false);

  const { groupId } = useParams();



  useEffect(() => {
    fetchGroupInfo(groupId, setGroupInfo);
  }, []);

  return (
    <div className={styles.chatsAndOptsSidebar}>
      { !groupInfo || !includeGroupName ? null : (
        <GroupImgAndTitle groupInfo={groupInfo} imgPixelSize={40}/>
      )}
      {!isOptsModalOpen ? null : (
        <GroupOptionsModal groupInfo={groupInfo} setIsOptsModalOpen={setIsOptsModalOpen} setGroupInfo={setGroupInfo} isAdmin={isAdmin}/>
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
          onClick={(e) => handleInviteModal(e, setIsInviteModalOpen)}
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
