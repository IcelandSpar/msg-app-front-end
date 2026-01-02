import { useRef, useState } from "react";
import styles from "../../styles/EditGroupNameInput.module.css";

const EditGroupNameInput = ({ groupName, handleToggleInput }) => {
  const groupNameInput = useRef(null);
  const [ groupNameInputVal, setGroupNameInputVal ] = useState(groupName);
  

  const handleSubmitGroupName = (e) => {
    e.preventDefault();
  };

  const handleOnChangeInput = (e) => {
    e.preventDefault();
    setGroupNameInputVal(groupNameInput.current.value);
  }



  return (
    <div className={styles.editInputForm}>
      <div className={styles.labelAndInputCont}>
        <label htmlFor="groupName">Group Name:</label>
        <input onChange={handleOnChangeInput} className={styles.groupNameInput} type="text" ref={groupNameInput} value={groupNameInputVal}/>
      </div>
      <button className={styles.updateBtn} onClick={handleSubmitGroupName} type="button">Update</button>
    </div>
  );
};

export default EditGroupNameInput;
