import { useContext, useRef } from 'react';

import UserContext from '../../UserContext';

import styles from '../../styles/AddFriendModal.module.css';

const AddFriendModal = () => {
  const friendCodeInput = useRef(null);

  const { profile } = useContext(UserContext);

  const handleFriendReqSubmit = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('msgAppToken');
    const formData = new FormData;

    formData.append('friendCode', friendCodeInput.current.value);
    formData.append('profileIdRequesting', profile.id);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/friends/send-friend-req`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: new URLSearchParams(formData)
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
  }


  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalCont}>
        <h3>Add a friend</h3>
        <form onSubmit={handleFriendReqSubmit}>
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