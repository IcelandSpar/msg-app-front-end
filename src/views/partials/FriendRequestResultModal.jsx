import styles from '../../styles/FriendRequestResultModal.module.css';

const FriendRequestResultModal = ({reqObj, closeBtnHandler}) => {
  return (
        <div onClick={closeBtnHandler} className={styles.reqModalBackground}>
          <div className={styles.reqModal}>
          <button className={styles.closeModalBtn} onClick={closeBtnHandler} type="button">X</button>
          <p>{reqObj.message}</p>
          </div>
        </div>
  )
};

export default FriendRequestResultModal;