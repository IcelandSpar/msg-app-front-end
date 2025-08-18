import { useRef } from 'react';
import styles from '../../styles/CreateGroupModal.module.css';

const CreateGroupModal = ({handleCreateGroupModal}) => {

  const groupNameInput = useRef(null);

  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('msgAppToken');
    const formData = new FormData();
    formData.append('groupName', groupNameInput.current.value)

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/create`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: formData,
    })
    handleCreateGroupModal(e)
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
      <form onSubmit={handleCreateGroupSubmit} className={styles.createGroupModalForm}>
        <div className={styles.modalLabelInputCont}>
          <label htmlFor="groupName">Group Chat Name</label>
          <input ref={groupNameInput} type="text" id="groupName" name="groupName"/>
        </div>
        <div className={styles.btnsCont}>
          <button onClick={handleCreateGroupModal}>Close</button>
          <button>Create Group Chat</button>
        </div>
      </form>
      </div>
    </div>
  )
};

export default CreateGroupModal;