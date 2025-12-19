import styles from "../../styles/OptionsMenu.module.css";

import leaveGroupIcon from "../../assets/leave_group_icon.svg";
import deleteIcon from "../../assets/delete_icon.svg";

const OptionsMenu = ({ handleOpenConfirmModal, userRole }) => {
  return (
    <div className={styles.optsMenuCont}>
      <button onClick={handleOpenConfirmModal} type="button">
        <p>Leave Group</p>
        <img
          src={leaveGroupIcon}
          alt="Leave group"
          width={"25px"}
          height={"25px"}
        />
      </button>
      {userRole == "ADMIN"? (
        <button>
          <p>Delete Group</p>
          <img src={deleteIcon} alt="Delete Group" />
        </button>
      ): null }
    </div>
  );
};

export default OptionsMenu;
