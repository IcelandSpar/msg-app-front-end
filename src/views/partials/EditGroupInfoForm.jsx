
import EditGroupNameInput from "./EditGroupNameInput";

import editIcon from "../../assets/edit_icon.svg";

const EditGroupInfoForm = ({ styles, groupInfo, setGroupInfo, toggleEditNameInput, isEditNameInputOpen }) => {
  return (
    <li className={styles.groupOptsLi}>
      <p>Edit group name?</p>
      <button
        title="Edit Group"
        onClick={toggleEditNameInput}
        className={styles.groupOptsBtn}
      >
        <img src={editIcon} alt="Edit" width={"24px"} height={"24px"} />
        <p>{!isEditNameInputOpen ? "Edit" : "Close"}</p>
      </button>
      {!isEditNameInputOpen ? null : (
        <EditGroupNameInput
          groupInfo={groupInfo}
          handleToggleInput={toggleEditNameInput}
          setGroupInfo={setGroupInfo}
        />
      )}
    </li>
  );
};

export default EditGroupInfoForm;
