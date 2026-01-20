import { useState } from "react";
import {
  handleOptsModal,
  handleOpenConfirmModal,
  handleOpenConfirmDeleteModal,
  handleNevermindBtn,
  handleLeaveGroupBtn,
} from "../../utils/groupSettings.js";
// import { useWithSound } from "../../customHooks/useWithSound.jsx";

import SoundTestBtn from "./SoundTestBtn.jsx";
import EditGroupNameInput from "./EditGroupNameInput.jsx";
import ConfirmLeaveGroupModal from "./ConfirmLeaveGroupModal.jsx";
import ConfirmDeleteGroupModal from "./ConfirmDeleteGroupModal.jsx";

import styles from "../../styles/GroupOptionsModal.module.css";
import leaveIcon from "../../assets/leave_group_icon.svg";
import deleteIcon from "../../assets/delete_icon.svg";
import GroupImgAndTitle from "./GroupImgAndTitle.jsx";
import volumeOffIcon from "../../assets/volume_off.svg";
import volumeUpIcon from "../../assets/volume_up.svg";

import sound1 from "../../assets/msg_notif_4.wav";
import sound2 from "../../assets/notification_sound.mp3";
import EditGroupInfoForm from "./EditGroupInfoForm.jsx";

const GroupOptionModal = ({ groupInfo, setIsOptsModalOpen, setGroupInfo, isAdmin = false }) => {
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false);
  const [isConfirmDeleteGroupModalOpen, setIsConfirmDeleteGroupModalOpen] =
    useState(false);
  const [isEditNameInputOpen, setIsEditNameInputOpen] = useState(false);
  const [ userNotifSound, setUserNotifSound ] = useState((!localStorage.getItem("msgAppNotifSound") || localStorage.getItem("msgAppNotifSound") == "sound1") ? "sound1" : "sound2");
  const [ isMuted, setIsMuted ] = useState(localStorage.getItem("msgAppIsMuted") == "true" ? true : false);

  const toggleEditNameInput = (e) => {
    e.preventDefault();
    setIsEditNameInputOpen((prev) => !prev);
  };

  const handleCloseOptsModal = (e) => {
    if (Array.from(e.target.classList)[1] == "closeOptsModal") {
      setIsOptsModalOpen((prev) => !prev);
    }
  };

  const handleClickMuteBtn = (e) => {
    e.preventDefault();
    setIsMuted((prev) => !isMuted);

    localStorage.setItem("msgAppIsMuted", !isMuted);
  };

  const handleChangeNotifOpt = (e) => {
    localStorage.setItem("msgAppNotifSound", e.target.value);
    setUserNotifSound(e.target.value);
    setIsOptsModalOpen(false);
  };

  return (
    <div
      onClick={handleCloseOptsModal}
      className={`${styles.optsModalBackground} closeOptsModal`}
    >
      {!isConfirmLeaveOpen ? null : (
        <ConfirmLeaveGroupModal
          handleNevermindBtn={handleNevermindBtn}
          groupInfo={{
            group: { ...groupInfo },
          }}
          handleLeaveGroupBtn={handleLeaveGroupBtn}
          setIsOptsOpen={setIsOptsModalOpen}
          setIsConfirmLeaveOpen={setIsConfirmLeaveOpen}
          setMemberGroups={null}
        />
      )}
      {!isConfirmDeleteGroupModalOpen ? null : (
        <ConfirmDeleteGroupModal
          groupInfo={{
            groupInfo,
            group: groupInfo,
          }}
          handleOpenConfirmDeleteModal={handleOpenConfirmDeleteModal}
          setIsConfirmDeleteGroupModalOpen={setIsConfirmDeleteGroupModalOpen}
          setMemberGroups={null}
        />
      )}
      <div className={styles.optsModal}>
        <button
          onClick={(e) => handleOptsModal(e, setIsOptsModalOpen)}
          className={styles.closeOptsModalBtn}
        >
          X
        </button>
        <div className={styles.settingsModalHeader}>
          {!groupInfo ? null : <GroupImgAndTitle groupInfo={groupInfo} />}
          <h3>Settings</h3>
        </div>
        <ul className={styles.groupOptsUl}>
          {isAdmin ? <EditGroupInfoForm styles={styles} groupInfo={groupInfo} setGroupInfo={setGroupInfo} toggleEditNameInput={toggleEditNameInput} isEditNameInputOpen={isEditNameInputOpen}/> : null}
          <li className={styles.groupOptsLi}>
            <h4 className={styles.audioHeader}>Audio Settings</h4>
            <p>Mute {groupInfo.groupName}</p>
            <button
              onClick={handleClickMuteBtn}
              type="button"
              className={styles.groupOptsBtn}
            >
              <img
                src={ !isMuted ?  volumeOffIcon : volumeUpIcon}
                alt="mute"
                width={"24px"}
                height={"24px"}
              />
              <p>{isMuted ? "Unmute" : "Mute"}</p>
            </button>
            <p>Test Sound</p>
            { userNotifSound == "sound1" ?  <SoundTestBtn styles={styles} sound={sound1}/> : <SoundTestBtn styles={styles} sound={sound2}/>}
            <p>Notification Sound</p>
            <select
              onChange={handleChangeNotifOpt}
              className={styles.notifSoundOptions}
              value={localStorage.getItem("msgAppNotifSound")}
            >
              <option value="sound1">Sound 1</option>
              <option value="sound2">Sound 2</option>
            </select>
          </li>
          <li className={styles.groupOptsLi}>
            <p>Leave {!groupInfo ? null : groupInfo.groupName}?</p>
            <button
              title="Leave Group"
              onClick={(e) =>
                handleOpenConfirmModal(
                  e,
                  setIsOptsModalOpen,
                  setIsConfirmLeaveOpen,
                )
              }
              className={styles.groupOptsBtn}
            >
              <img src={leaveIcon} alt="leave" width={"24px"} height={"24px"} />
              <p>Leave</p>
            </button>
          </li>
          <li className={styles.groupOptsLi}>
            <p>Delete {!groupInfo ? null : groupInfo.groupName}?</p>
            <button
              title="Delete Group"
              onClick={(e) =>
                handleOpenConfirmDeleteModal(
                  e,
                  setIsConfirmDeleteGroupModalOpen,
                )
              }
              className={styles.deleteGroupBtn}
            >
              <img
                src={deleteIcon}
                alt="delete"
                width={"24px"}
                height={"24px"}
              />
              <p>Delete</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupOptionModal;
