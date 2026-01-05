import GroupImgAndTitle from "./GroupImgAndTitle.jsx";
import OptsAndChatSidebar from "./OptsAndChatSidebar.jsx";
import GroupSettingsSidebarBtn from "./GroupSettingsSidebarBtn.jsx";

import styles from "../../styles/GroupSettingsCollapsableSidebar.module.css";

const GroupSettingsCollapsasbleSidebar = ({
  groupInfo,
  setGroupInfo,
  isGroupSidebarCloseAnimToggle,
  isGroupSettingsSidebarOpen,
  setIsGroupSettingsSidebarOpen,
  setIsGroupSidebarCloseAnimToggle,
}) => {
  const handleGroupOptionsSidebar = (e) => {
    e.preventDefault();
    if (
      isGroupSettingsSidebarOpen &&
      Array.from(e.target.classList)[1] == "closeGroupSettingsSidebar"
    ) {
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
    <div
      onClick={handleGroupOptionsSidebar}
      className={`${styles.groupSettingsSidebarBackground} closeGroupSettingsSidebar`}
    >
      <aside
        className={`${styles.groupSettingsSidebarCont} ${
          isGroupSidebarCloseAnimToggle
            ? `${styles.toggleCloseSidebar}`
            : `${styles.toggleOpenSidebar}`
        }`}
      >
        <div className={styles.collapseSidebarBtnCont}>
          <GroupImgAndTitle groupInfo={groupInfo}/>
          <GroupSettingsSidebarBtn
            isGroupSettingsSidebarOpen={isGroupSettingsSidebarOpen}
            setIsGroupSettingsSidebarOpen={setIsGroupSettingsSidebarOpen}
            setIsGroupSidebarCloseAnimToggle={setIsGroupSidebarCloseAnimToggle}
          />
        </div>
        <div className={styles.optionsBtnsCont}>
          <OptsAndChatSidebar
            groupInfo={groupInfo}
            setGroupInfo={setGroupInfo}
          />
        </div>
      </aside>
    </div>
  );
};

export default GroupSettingsCollapsasbleSidebar;
