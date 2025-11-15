import { useState } from "react";

import FriendList from "./FriendList.jsx";

import styles from "../../styles/HomeSidebar.module.css";

const HomeSidebar = ({profile, friendList, setFriendList, setIsSidebarOpen}) => {
  const [ isCloseAnimToggle, setIsCloseAnimToggle ] = useState(false);

  const handleCloseSidebarBtn = (e) => {
    e.preventDefault();
    setIsCloseAnimToggle(true);

    setTimeout(() => {setIsSidebarOpen(false);}, 500);
    
  };

  return (
    <aside className={`${styles.homeSidebarCont} ${isCloseAnimToggle ? styles.toggleHideHomeMenu : ''}`}>
      <button onClick={handleCloseSidebarBtn} type="button" className={styles.closeSidebarBtn}>Close</button>
      <FriendList profile={profile} friendList={friendList} setFriendList={setFriendList}/>
    </aside>
  )
};

export default HomeSidebar;