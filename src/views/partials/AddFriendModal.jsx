import { useContext, useRef } from "react";

import UserContext from "../../UserContext";

import styles from "../../styles/AddFriendModal.module.css";
import wavingHandIcon from "../../assets/waving_hand_icon.svg";

const AddFriendModal = ({ handleFriendReqSubmit, handleCloseFriendModal }) => {
  const friendCodeInput = useRef(null);

  const { profile } = useContext(UserContext);

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalCont}>
        <button
          className={styles.exitModalBtn}
          onClick={handleCloseFriendModal}
          type="button"
        >
          X
        </button>

        <form className={styles.friendReqForm} onSubmit={(e) => handleFriendReqSubmit(e, friendCodeInput)}>
          <div className={styles.modalHeadingAndParaCont}>
            <h3 className={styles.modalHeading}>Send a Friend Request!</h3>
            <p className={styles.modalPara}>You need someone's friend code</p>
          </div>
          <fieldset className={styles.friendReqFieldset}>
            <div className={styles.labelAndInputCont}>
              <label htmlFor="friendCode">Friend Code</label>
              <input
              className={styles.friendCodeInput}
                ref={friendCodeInput}
                type="text"
                name="friendCode"
                id="friendCode"
              />
            </div>
          </fieldset>
          <div className={styles.sendReqBtnCont}>
           <button className={styles.sendReqBtn} type="submit">
            <p className={styles.sendReqPara}>Send Request</p>
            <img className={styles.sendReqIcon} src={wavingHandIcon} alt="Send friend request" />
           </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriendModal;
