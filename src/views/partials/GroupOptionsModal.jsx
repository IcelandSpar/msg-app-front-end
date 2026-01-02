import { useState } from "react";
import {
  handleOptsModal,
  handleOpenConfirmModal,
  handleOpenConfirmDeleteModal,
  handleNevermindBtn,
  handleLeaveGroupBtn,
} from "../../utils/groupSettings.js";

import EditGroupNameInput from "./EditGroupNameInput.jsx";
import ConfirmLeaveGroupModal from "./ConfirmLeaveGroupModal.jsx";
import ConfirmDeleteGroupModal from "./ConfirmDeleteGroupModal.jsx";

import styles from "../../styles/GroupOptionsModal.module.css";

const GroupOptionModal = ({ groupInfo, setIsOptsModalOpen, setGroupInfo }) => {
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
        <h3 className={styles.settingsModalHeader}>
          {!groupInfo ? null : groupInfo.groupName} settings
        </h3>
        <ul className={styles.groupOptsUl}>
          <li className={styles.groupOptsLi}>
            <p>Edit group name?</p>
            <button onClick={toggleEditNameInput} className={styles.groupOptsBtn}>
              <p>{!isEditNameInputOpen ? "Edit" : "Close"}</p>
            </button>
            { !isEditNameInputOpen ? null : <EditGroupNameInput groupInfo={groupInfo} handleToggleInput={toggleEditNameInput} setGroupInfo={setGroupInfo}/> }
          </li>
          <li className={styles.groupOptsLi}>
            <p>Leave {!groupInfo ? null : groupInfo.groupName}?</p>
            <button
              onClick={(e) =>
                handleOpenConfirmModal(
                  e,
                  setIsOptsModalOpen,
                  setIsConfirmLeaveOpen
                )
              }
              className={styles.groupOptsBtn}
            >
              <p>Leave</p>
            </button>
          </li>
          <li className={styles.groupOptsLi}>
            <p>Delete {!groupInfo ? null : groupInfo.groupName}?</p>
            <button onClick={(e) => handleOpenConfirmDeleteModal(e, setIsConfirmDeleteGroupModalOpen)} className={styles.deleteGroupBtn}>
              <p>Delete</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupOptionModal;
