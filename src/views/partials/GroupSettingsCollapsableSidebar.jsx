import GroupSettingsSidebarBtn from "./GroupSettingsSidebarBtn.jsx";

import styles from "../../styles/GroupSettingsCollapsableSidebar.module.css";

const GroupSettingsCollapsasbleSidebar = ({
  isGroupSidebarCloseAnimToggle,
  isGroupSettingsSidebarOpen,
  setIsGroupSettingsSidebarOpen,
  setIsGroupSidebarCloseAnimToggle,
}) => {
  return (
    <div className={styles.groupSettingsSidebarBackground}>
      <aside
        className={`${styles.groupSettingsSidebarCont} ${
          isGroupSidebarCloseAnimToggle
            ? `${styles.toggleCloseSidebar}`
            : `${styles.toggleOpenSidebar}`
        }`}
      >
        <GroupSettingsSidebarBtn
          isGroupSettingsSidebarOpen={isGroupSettingsSidebarOpen}
          setIsGroupSettingsSidebarOpen={setIsGroupSettingsSidebarOpen}
          setIsGroupSidebarCloseAnimToggle={setIsGroupSidebarCloseAnimToggle}
        />
      </aside>
    </div>
  );
};

export default GroupSettingsCollapsasbleSidebar;
