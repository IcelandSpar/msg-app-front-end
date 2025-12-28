import styles from "../../styles/OptsAndChatSidebar.module.css";

import optionsIcon from "../../assets/settings_icon.svg";
import addChatIcon from "../../assets/add_chat_icon.svg";
import addMemberIcon from "../../assets/add_friend_icon.svg";

const OptsAndChatSidebar = () => {
  return (
    <div className={styles.chatsAndOptsSidebar}>
      <div className={styles.groupActionBtns}>
        <button
          className={styles.settingsBtn}
          type="button"
          title="Group Settings"
        >
          <img src={optionsIcon} alt="Options" width={"25px"} height={"25px"} />
        </button>
        <button
          className={styles.addMemberBtn}
          type="button"
          title="Add Member to Group"
        >
          <img
            src={addMemberIcon}
            alt="Add Member"
            width={"25px"}
            height={"25px"}
          />
        </button>
        <button
          className={styles.addMemberBtn}
          type="button"
          title="Create Chat"
        >
          <img
            src={addChatIcon}
            alt="Create Chat"
            width={"25px"}
            height={"25px"}
          />
        </button>
      </div>
    </div>
  );
};

export default OptsAndChatSidebar;
