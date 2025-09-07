import { useContext, useRef } from 'react';

import UserContext from '../../UserContext';

import styles from '../../styles/AddFriendModal.module.css';

const AddFriendModal = ({handleFriendReqSubmit}) => {
  const friendCodeInput = useRef(null);

  const { profile } = useContext(UserContext);




  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalCont}>
        <h3>Add a friend</h3>
        <form onSubmit={(e) => handleFriendReqSubmit(e, friendCodeInput)}>
          <fieldset>
            <legend>Send a Friend Request</legend>
            <div className={styles.labelAndInputCont}>
              <label htmlFor="friendCode">Friend Code</label>
              <input ref={friendCodeInput} type="text" name="friendCode" id="friendCode" />
            </div>
          </fieldset>
          <button type='submit'>Send Request</button>
        </form>
      </div>
    </div>
  )
};

export default AddFriendModal;