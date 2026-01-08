import { useState } from "react";

import FriendList from "./FriendList.jsx";

import sidebarBtnIcon from "../../assets/sidebar_menu_icon.svg";
import styles from "../../styles/HomeSidebar.module.css";

const HomeSidebar = ({profile, friendList, setFriendList, isCloseAnimToggle,handleCloseSidebarBtn}) => {



  return (
    <aside className={`${styles.homeSidebarCont} ${isCloseAnimToggle ? styles.toggleHideHomeMenu : ''}`}>
      <button onClick={handleCloseSidebarBtn} type="button" className={`${styles.closeSidebarBtn} closeHomeSidebar`}><img className={`${styles.homeSidebarBtnImg} closeHomeSidebar`} src={sidebarBtnIcon} alt="close sidebar" width={'25px'} height={'25px'}/></button>
      <FriendList profile={profile} friendList={friendList} setFriendList={setFriendList}/>
    </aside>
  )
};

export default HomeSidebar;