import { useContext, useState } from "react";
import UserContext from "../../UserContext.jsx";
import he from "he";

import { handleOpenConfirmModal, handleOpenConfirmDeleteModal } from "../../utils/groupSettings.js";


import styles from "../../styles/OptionsMenu.module.css";

import leaveGroupIcon from "../../assets/leave_group_icon.svg";
import deleteIcon from "../../assets/delete_icon.svg";

const OptionsMenu = ({ creatorId, setIsOptsOpen, setIsConfirmLeaveOpen, setIsConfirmDeleteGroupModalOpen }) => {

  const { profile } = useContext(UserContext);


  return (
    <div className={styles.optsMenuCont}>
      <button onClick={(e) => handleOpenConfirmModal(e, setIsOptsOpen, setIsConfirmLeaveOpen)} type="button">
        <p>Leave Group</p>
        <img
          src={leaveGroupIcon}
          alt="Leave group"
          width={"25px"}
          height={"25px"}
        />
      </button>

      {profile.id ==  creatorId ? (
        <button onClick={(e) => handleOpenConfirmDeleteModal(e, setIsConfirmDeleteGroupModalOpen)} type="button">
          <p>Delete Group</p>
          <img src={deleteIcon} alt="Delete Group" />
        </button>
      ): null }
    </div>
  );
};

export default OptionsMenu;
