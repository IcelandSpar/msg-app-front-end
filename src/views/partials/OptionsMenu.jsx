import { useContext, useState } from "react";
import UserContext from "../../UserContext.jsx";
import he from "he";


import styles from "../../styles/OptionsMenu.module.css";

import leaveGroupIcon from "../../assets/leave_group_icon.svg";
import deleteIcon from "../../assets/delete_icon.svg";

const OptionsMenu = ({ handleOpenConfirmModal, creatorId, handleOpenConfirmDeleteModal }) => {

  const { profile } = useContext(UserContext);


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

      {profile.id ==  creatorId ? (
        <button onClick={handleOpenConfirmDeleteModal} type="button">
          <p>Delete Group</p>
          <img src={deleteIcon} alt="Delete Group" />
        </button>
      ): null }
    </div>
  );
};

export default OptionsMenu;
