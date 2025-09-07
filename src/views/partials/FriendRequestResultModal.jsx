import styles from '../../styles/FriendRequestResultModal.module.css';

const FriendRequestResultModal = ({reqObj, closeBtnHandler}) => {
  return (
        <div className={styles.reqModalBackground}>
          <div className={styles.reqModal}>
          <p>{reqObj.message}</p>
          <button onClick={closeBtnHandler} type="button">Close</button>
          </div>
        </div>
  )
};

export default FriendRequestResultModal;