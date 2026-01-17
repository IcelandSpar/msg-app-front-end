import { useState } from "react";
import {
  handleOptsModal,
  handleOpenConfirmModal,
  handleOpenConfirmDeleteModal,
  handleNevermindBtn,
  handleLeaveGroupBtn,
} from "../../utils/groupSettings.js";
import { useWithSound } from "../../customHooks/useWithSound.jsx";

import EditGroupNameInput from "./EditGroupNameInput.jsx";
import ConfirmLeaveGroupModal from "./ConfirmLeaveGroupModal.jsx";
import ConfirmDeleteGroupModal from "./ConfirmDeleteGroupModal.jsx";

import styles from "../../styles/GroupOptionsModal.module.css";
import editIcon from "../../assets/edit_icon.svg";
import leaveIcon from "../../assets/leave_group_icon.svg";
import deleteIcon from "../../assets/delete_icon.svg";
import GroupImgAndTitle from "./GroupImgAndTitle.jsx";
import volumeOffIcon from "../../assets/volume_off.svg";

import sound1 from "../../assets/msg_notif_4.wav";
import sound2 from "../../assets/notification_sound.mp3";

const GroupOptionModal = ({ groupInfo, setIsOptsModalOpen, setGroupInfo }) => {
  const { playSound, playSound1, playSound2 } = useWithSound(sound1);
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false);
  const [ isConfirmDeleteGroupModalOpen, setIsConfirmDeleteGroupModalOpen ] = useState(false);
  const [ isEditNameInputOpen, setIsEditNameInputOpen ] = useState(false);


  const toggleEditNameInput = (e) => {
    e.preventDefault();
    setIsEditNameInputOpen((prev) => !prev);
  };


  const handleCloseOptsModal = (e) => {
    if(Array.from(e.target.classList)[1] == 'closeOptsModal') {
      setIsOptsModalOpen((prev) => !prev);
    }
  };

  const handleClickMuteBtn = (e) => {
    e.preventDefault();
    localStorage.getItem("msgAppNotifSound") == "notif1" ? playSound1 : playSound2;
  };

  const handleChangeNotifOpt = (e) => {
    localStorage.setItem("msgAppNotifSound", e.target.value);
  };


  return (
    <div onClick={handleCloseOptsModal} className={`${styles.optsModalBackground} closeOptsModal`}>
      {!isConfirmLeaveOpen ? null : (
        <ConfirmLeaveGroupModal
          handleNevermindBtn={handleNevermindBtn}
          groupInfo={{
            group: {...groupInfo},
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
          {!groupInfo ? null : <GroupImgAndTitle groupInfo={groupInfo}/>} 
          <p>Settings</p>
        </div>
        <ul className={styles.groupOptsUl}>
          <li className={styles.groupOptsLi}>
            <p>Edit group name?</p>
            <button title="Edit Group" onClick={toggleEditNameInput} className={styles.groupOptsBtn}>
              <img src={editIcon} alt="Edit" width={'24px'} height={'24px'}/>
              <p>{!isEditNameInputOpen ? "Edit" : "Close"}</p>
            </button>
            { !isEditNameInputOpen ? null : <EditGroupNameInput groupInfo={groupInfo} handleToggleInput={toggleEditNameInput} setGroupInfo={setGroupInfo}/> }
          </li>
          <li className={styles.groupOptsLi}>
            <p>Audio Settings</p>
            <div></div>
            <p>Mute {groupInfo.groupName}</p>
            <button onClick={handleClickMuteBtn} type="button" className={styles.groupOptsBtn}>
              <img src={volumeOffIcon} alt="mute" width={'24px'} height={'24px'}/>
              <p>Mute</p>
            </button>
            <p>Notification Sound</p>
            <select onChange={handleChangeNotifOpt} className={styles.notifSoundOptions}>
              <option value="notif1">Sound 1</option>
              <option value="notif2">Sound 2</option>
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
                  setIsConfirmLeaveOpen
                )
              }
              className={styles.groupOptsBtn}
            >
              <img src={leaveIcon} alt="leave" width={'24px'} height={'24px'}/>
              <p>Leave</p>
            </button>
          </li>
          <li className={styles.groupOptsLi}>
            <p>Delete {!groupInfo ? null : groupInfo.groupName}?</p>
            <button title="Delete Group" onClick={(e) => handleOpenConfirmDeleteModal(e, setIsConfirmDeleteGroupModalOpen)} className={styles.deleteGroupBtn}>
              <img src={deleteIcon} alt="delete" width={'24px'} height={'24px'}/>
              <p>Delete</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupOptionModal;
