import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../UserContext.jsx";

import { socket } from "../socket.js";

import Navbar from "./partials/Navbar.jsx";
import GroupList from "./partials/GroupList.jsx";
import FriendList from "./partials/FriendList.jsx";
import AddFriendModal from "./partials/AddFriendModal.jsx";
import CreateGroupModal from "./partials/CreateGroupModal.jsx";
import SearchGroupModal from "./partials/SearchGroupModal.jsx";
import FriendRequestResultModal from "./partials/FriendRequestResultModal.jsx";

import styles from "../styles/UserHome.module.css";
import addFriendIcon from "../assets/add_friend_icon.svg";
import groupSearchIcon from "../assets/group_search_icon.svg";
import createGroupIcon from "../assets/create_group_icon.svg";

const UserHome = () => {
  const [memberGroups, setMemberGroups] = useState(null);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isReqResModalOpen, setIsReqResModalOpen] = useState(null);
  const [isGroupSearchModalOpen, setIsGroupSearchModalOpen] = useState(false);
  const [friendList, setFriendList] = useState(null);
  const [ isLoadingGroupList, setIsLoadingGroupList ] = useState(true);

  const { profile, isLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClickOnGroupLi = (e, groupId) => {
    e.preventDefault();
    navigate(`/channel/group/${groupId}`);
  };

  const handleCloseFriendReqModal = (e) => {
    e.preventDefault();
    setIsReqResModalOpen(null);
    setIsAddFriendModalOpen(false);
  };

  const handleCreateGroupModal = (e) => {
    e.preventDefault();
    setIsCreateGroupModalOpen((prev) => !prev);
  };

  const handleAddFriendBtn = (e) => {
    e.preventDefault();
    setIsAddFriendModalOpen((prev) => !prev);
  };

  const handleSearchGroupModal = (e) => {
    e.preventDefault();
    setIsGroupSearchModalOpen((prev) => !prev);
  };

  const handleCloseFriendModal = (e) => {
    e.preventDefault();
    setIsAddFriendModalOpen(false);
  };

  const handleFriendReqSubmit = (e, friendCodeInput) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");
    const formData = new FormData();

    formData.append("friendCode", friendCodeInput.current.value);
    formData.append("profileIdRequesting", profile.id);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/friends/send-friend-req`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsReqResModalOpen(res);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (profile) {
      socket.connect();
      setIsLoadingGroupList(true);

    }
    console.log("the test");
    const token = sessionStorage.getItem("msgAppToken");
    fetch(
      `${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/get-member-groups`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if(res) {
          setIsLoadingGroupList(false);
        }
        setMemberGroups(res);
      })
      .catch((err) => console.error(err));

    return () => {
      socket.disconnect();
    };
  }, [profile]);

  return (
    <div className={styles.userHomePage}>
      <Navbar setFriendList={setFriendList} />
      <main className={styles.userHomeMain}>
        {isReqResModalOpen == null ? null : (
          <FriendRequestResultModal
            reqObj={isReqResModalOpen}
            closeBtnHandler={handleCloseFriendReqModal}
          />
        )}
        {!isAddFriendModalOpen ? null : (
          <AddFriendModal
            handleFriendReqSubmit={handleFriendReqSubmit}
            handleCloseFriendModal={handleCloseFriendModal}
          />
        )}
        {!isCreateGroupModalOpen ? null : (
          <CreateGroupModal handleCreateGroupModal={handleCreateGroupModal} />
        )}
        {!isGroupSearchModalOpen ? null : (
          <SearchGroupModal
            setMemberGroups={setMemberGroups}
            handleSearchGroupModal={handleSearchGroupModal}
          />
        )}
        {!isLoggedIn ? null : (
          <div className={styles.addFriendSearchGroupBtnsCont}>
            <button
              className={styles.addFriendBtn}
              type="button"
              onClick={handleAddFriendBtn}
            >
              <img
                className={styles.addFriendIcon}
                src={addFriendIcon}
                alt="search for a friend"
              />
              <p className={styles.addFriendPara}>Add friend</p>
            </button>
            <button
              className={styles.groupSearchBtn}
              type="button"
              onClick={handleSearchGroupModal}
            >
              <img
                className={styles.groupSearchImg}
                src={groupSearchIcon}
                alt="Search for Groups"
              />
              <p className={styles.groupSearchPara}>Search Groups</p>
            </button>
            <button
              className={styles.createGroupBtn}
              onClick={handleCreateGroupModal}
            >
              <img
                className={styles.createGroupIcon}
                src={createGroupIcon}
                alt="Create a group"
              />
              <p className={styles.createGroupPara}>Create Group</p>
            </button>
          </div>
        )}
        <div className={styles.groupAndFriendCont}>
          <aside className={styles.friendListCont}>
            {profile ? (
              <FriendList
                profile={profile}
                friendList={friendList}
                setFriendList={setFriendList}
              />
            ) : null}
          </aside>
          <div className={styles.groupsAside}>
            <GroupList
              groups={memberGroups}
              isLoadingGroupList={isLoadingGroupList}
              handleClickOnGroupLi={handleClickOnGroupLi}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;
