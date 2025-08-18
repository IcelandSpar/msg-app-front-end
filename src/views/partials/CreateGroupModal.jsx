import { useRef, useState } from "react";
import styles from "../../styles/CreateGroupModal.module.css";

const CreateGroupModal = ({ handleCreateGroupModal }) => {
  const groupNameInput = useRef(null);
  const [ selectedFile, setSelectedFile ] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("msgAppToken");
    const formData = new FormData();
    formData.append("groupName", groupNameInput.current.value);
    formData.append("groupImg", selectedFile);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/create`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    handleCreateGroupModal(e);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <form
          onSubmit={handleCreateGroupSubmit}
          className={styles.createGroupModalForm}
          encType='multipart/form-data'
        >
          <div className={styles.modalLabelInputCont}>
            <label htmlFor="groupName">Group Chat Name</label>
            <input
              ref={groupNameInput}
              type="text"
              id="groupName"
              name="groupName"
            />
          </div>
          <div className={styles.modalLabelInputCont}>
            <label htmlFor="groupImg">Group Picture</label>
            <input onChange={handleFileChange} type="file" name="groupImg" id="groupImg" />
          </div>
          <div className={styles.btnsCont}>
            <button onClick={handleCreateGroupModal}>Close</button>
            <button>Create Group Chat</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
