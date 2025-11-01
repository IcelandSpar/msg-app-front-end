

import styles from "../../styles/OptionsMenu.module.css";

import leaveGroupIcon from "../../assets/leave_group_icon.svg";

const OptionsMenu = ({ handleOpenConfirmModal }) => {



  return (
    <div className={styles.optsMenuCont}>
      <button onClick={handleOpenConfirmModal} type="button">
        <p>Leave Group</p>
        <img src={leaveGroupIcon} alt="Leave group" />
      </button>
    </div>
  );
};

export default OptionsMenu;
