import { useContext } from "react";
import UserContext from "../../UserContext.jsx";

import styles from "../../styles/OptionsMenu.module.css";

import leaveGroupIcon from "../../assets/leave_group_icon.svg";

const OptionsMenu = ({ setIsOptsOpen, groupId, setMemberGroups }) => {
  const { profile } = useContext(UserContext);

  const handleLeaveGroupBtn = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");
    if (token && profile) {
      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/leave-group/${profile.id}/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
        }
      )
      .then((res) => res.json())
      .then((res) => {

        if(res.success) {
        setIsOptsOpen(false);
        
        setMemberGroups((prev) => prev.filter((item) => item.groupId != res.removedMember.groupId));
        }
      });
    }
  };

  return (
    <div className={styles.optsMenuCont}>
      <button onClick={handleLeaveGroupBtn} type="button">
        <p>Leave Group</p>
        <img src={leaveGroupIcon} alt="Leave group" />
      </button>
    </div>
  );
};

export default OptionsMenu;
