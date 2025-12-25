import he from "he";
import styles from "../../styles/ConfirmDeleteGroupModal.module.css";

const ConfirmDeleteGroupModal = ({ handleOpenConfirmDeleteModal, groupInfo }) => {
  return (
    <div className={styles.confirmLeaveBackground}>
      <div className={styles.confirmLeaveModal}>
        <p className={styles.deleteQuestionParas}>Are you sure you want to <b>permanently delete</b></p>
        <p className={styles.groupName}><b>{he.decode(groupInfo.group.groupName)}?</b></p>
        <p>All messages will be deleted!</p>
        <img className={styles.groupImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupInfo.group.groupImgPath}`} alt="group image" width={'100px'} height={'100px'}/>
        <div className={styles.leaveBtnsCont}>
          <button onClick={handleOpenConfirmDeleteModal} className={styles.noLeaveBtn} type="button">Nevermind</button>
          <button className={styles.yesLeaveBtn} type="button">Delete Group</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteGroupModal;
