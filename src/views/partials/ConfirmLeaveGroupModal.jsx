import he from "he";

import styles from "../../styles/ConfirmLeaveGroupModal.module.css";

const ConfirmLeaveGroupModal = ({groupInfo, handleNevermindBtn, handleLeaveGroupBtn}) => {

    const closeLeaveModal = (e) => {
    e.preventDefault();
    if(Array.from(e.target.classList)[1] == 'closeLeaveGroupModal') {
      handleNevermindBtn(e);
    }
  };

  return (
    <div onClick={closeLeaveModal} className={`${styles.confirmLeaveBackground} closeLeaveGroupModal`}>
      <div className={styles.confirmLeaveModal}>
        <h3>Are you sure you want to leave</h3>
        <p>{he.decode(groupInfo.group.groupName)}?</p>
        <img className={styles.groupImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupInfo.group.groupImgPath}`} alt="group image" width={'100px'} height={'100px'}/>
        <div className={styles.leaveBtnsCont}>
          <button onClick={handleNevermindBtn} className={styles.noLeaveBtn} type="button">Nevermind</button>
          <button onClick={handleLeaveGroupBtn} className={styles.yesLeaveBtn} type="button">Leave Group</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLeaveGroupModal;
