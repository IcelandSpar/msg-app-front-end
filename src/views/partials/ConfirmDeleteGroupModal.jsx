import { useContext } from "react";
import UserContext from "../../UserContext.jsx";
import { handleOpenConfirmDeleteModal, handleDeleteGroup } from "../../utils/groupSettings.js";

import he from "he";
import styles from "../../styles/ConfirmDeleteGroupModal.module.css";

const ConfirmDeleteGroupModal = ({ groupInfo, setIsConfirmDeleteGroupModalOpen, setMemberGroups }) => {

  const { profile } = useContext(UserContext);

  const closeDeleteModal = (e) => {
    e.preventDefault();
    if(Array.from(e.target.classList)[1] == 'closeDeleteModal') {
      handleOpenConfirmDeleteModal(e, setIsConfirmDeleteGroupModalOpen);
    }
  };

  const handleNevermindBtn = (e) => {
    e.preventDefault;
    setIsConfirmDeleteGroupModalOpen(false);
  }

  return (
    <div onClick={closeDeleteModal} className={`${styles.confirmLeaveBackground} closeDeleteModal`}>
      <div className={styles.confirmLeaveModal}>
        <p className={styles.deleteQuestionParas}>Are you sure you want to <b>permanently delete</b></p>
        <p className={styles.groupName}><b>{he.decode(groupInfo.group.groupName)}?</b></p>
        <p>All messages will be deleted!</p>
        <img className={styles.groupImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupInfo.group.groupImgPath}`} alt="group image" width={'100px'} height={'100px'}/>
        <div className={styles.leaveBtnsCont}>
          <button onClick={handleNevermindBtn} className={`${styles.noLeaveBtn}`} type="button">Nevermind</button>
          <button onClick={(e) => handleDeleteGroup(e, profile.id, groupInfo, setMemberGroups, setIsConfirmDeleteGroupModalOpen)} className={styles.yesLeaveBtn} type="button">Delete Group</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteGroupModal;
