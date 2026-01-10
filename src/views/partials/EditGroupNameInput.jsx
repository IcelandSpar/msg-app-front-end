import { useContext, useRef, useState } from "react";

import UserContext from "../../UserContext.jsx";
import ValidationErrModal from "./ValidationErrModal.jsx";


import styles from "../../styles/EditGroupNameInput.module.css";

const EditGroupNameInput = ({ groupInfo, handleToggleInput, setGroupInfo }) => {
  const groupNameInput = useRef(null);
  const [groupNameInputVal, setGroupNameInputVal] = useState(groupInfo.groupName);
  const [ validationErrs, setValidationErrs ] = useState(null);

  const { profile } = useContext(UserContext);

  const handleOnChangeInput = (e) => {
    e.preventDefault();
    setGroupNameInputVal(groupNameInput.current.value);
  };

  const handleCloseValidationErrModal = (e) => {
    e.preventDefault();
    setValidationErrs(null);
  };

  const handleSubmitGroupName = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");

    if (token) {

      const formData = new FormData();
      formData.append('groupName', groupNameInput.current.value);

      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/update-group-name/${groupInfo.id}/${profile.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: new URLSearchParams(formData),
      })
      .then((res) => res.json())
      .then((res) => {
        if(res.errors) {
          setValidationErrs(res.errors);
        } else if(res.success) {
          handleToggleInput(e);
          setGroupInfo({
            ...groupInfo,
            groupName: groupNameInput.current.value,
          })
        }

      })
      .catch((err) => console.error(err));
    }
  };

  return (
    <form className={styles.editInputForm}>
      {!validationErrs ? null :  <ValidationErrModal msgFormErrors={validationErrs} closeMsgHandler={handleCloseValidationErrModal}/>}
      <div className={styles.labelAndInputCont}>
        <label htmlFor="groupName">Group Name:</label>
        <input
          onChange={handleOnChangeInput}
          className={styles.groupNameInput}
          type="text"
          id="groupName"
          name="groupName"
          ref={groupNameInput}
          value={groupNameInputVal}
        />
      </div>
      <button
        className={styles.updateBtn}
        onClick={handleSubmitGroupName}
        type="submit"
      >
        Update
      </button>
    </form>
  );
};

export default EditGroupNameInput;
