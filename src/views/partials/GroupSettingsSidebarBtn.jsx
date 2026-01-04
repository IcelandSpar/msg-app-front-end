import { useState } from "react";

import styles from "../../styles/GroupSettingsSidebarBtn.module.css";
import viewSidebar from "../../assets/view_sidebar.svg";


const GroupSettingsSidebarBtn = ({ isGroupSettingsSidebarOpen, setIsGroupSettingsSidebarOpen, setIsGroupSidebarCloseAnimToggle }) => {

    const handleGroupOptionsSidebar = (e) => {
        e.preventDefault();
    if (isGroupSettingsSidebarOpen) {
      setIsGroupSidebarCloseAnimToggle(true);
      setTimeout(() => {
        setIsGroupSettingsSidebarOpen(false);
      }, 500);
    } else {
      setIsGroupSidebarCloseAnimToggle(false);
      setIsGroupSettingsSidebarOpen(true);
    }
  };

  return (
    <button onClick={handleGroupOptionsSidebar} className={styles.sidebarBtn} type="button">
      <img
        className={styles.settingsAndChatSideImg}
        src={viewSidebar}
        alt="Open Settings and Chat Sidebar"
        width={"25px"}
        height={"25px"}
      />
    </button>
  );
};

export default GroupSettingsSidebarBtn;
