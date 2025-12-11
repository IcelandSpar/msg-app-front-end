import { useRef, useState } from "react";
import styles from "../../styles/CreateGroupModal.module.css";
import createGroupIcon from "../../assets/create_group_icon.svg";

const CreateGroupModal = ({ handleCreateGroupModal, setValidationErrors }) => {
  const groupNameInput = useRef(null);
  const [ selectedFile, setSelectedFile ] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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
      .then((res) => {
        if(res.errors) {
          setValidationErrors(res.errors);
        } else {
          handleCreateGroupModal(e);
        }
      });
  };

  return (
    <div onClick={handleCreateGroupModal} className={`${styles.modalBackground} createGroupClose`}>
      <div className={styles.createGroupModal}>
        <button className={`${styles.createGroupCloseBtn} createGroupClose`} onClick={handleCreateGroupModal}>X</button>

        <form
          onSubmit={handleCreateGroupSubmit}
          className={styles.createGroupModalForm}
          encType='multipart/form-data'
        >
          <div className={styles.modalLabelInputCont}>
            <label className={styles.formLabels} htmlFor="groupName">Group Chat Name</label>
            <input
            className={styles.groupNameInput}
              ref={groupNameInput}
              type="text"
              id="groupName"
              name="groupName"
            />
          </div>
          <div className={styles.modalLabelInputCont}>
            <label className={styles.formLabels} htmlFor="groupImg">Group Picture</label>
            <input onChange={handleFileChange} type="file" name="groupImg" id="groupImg" />
          </div>
          <div className={styles.btnsCont}>
            <button className={styles.createGroupBtn}>
              <p className={styles.createGroupBtnPara}>Create Group Chat</p>
              <img className={styles.createGroupBtnIcon} src={createGroupIcon} alt="create group" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
