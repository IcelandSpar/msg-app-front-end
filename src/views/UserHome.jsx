import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext.jsx';

import Navbar from './partials/Navbar.jsx';
import GroupList from './partials/GroupList.jsx';
import FriendList from './partials/FriendList.jsx';
import AddFriendModal from './partials/AddFriendModal.jsx';
import CreateGroupModal from './partials/CreateGroupModal.jsx';
import SearchGroupModal from './partials/SearchGroupModal.jsx';
import FriendRequestResultModal from './partials/FriendRequestResultModal.jsx';


import styles from '../styles/UserHome.module.css';

const UserHome = () => {
  const [ isCreateGroupModalOpen, setIsCreateGroupModalOpen ] = useState(false);
  const [ isAddFriendModalOpen, setIsAddFriendModalOpen ] = useState(false);
  const [ isReqResModalOpen, setIsReqResModalOpen ] = useState(null);
  const [ isGroupSearchModalOpen, setIsGroupSearchModalOpen ] = useState(false);
  const [ friendList, setFriendList ] = useState(null);

  const { profile, isLoggedIn } = useContext(UserContext);


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
  }

    const handleFriendReqSubmit = (e, friendCodeInput) => {
      e.preventDefault();
  
      const token = sessionStorage.getItem('msgAppToken');
      const formData = new FormData;
  
      formData.append('friendCode', friendCodeInput.current.value);
      formData.append('profileIdRequesting', profile.id);
  
      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/friends/send-friend-req`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'POST',
        body: new URLSearchParams(formData)
      })
      .then((res) => res.json())
      .then((res) => {
        setIsReqResModalOpen(res);
      })
      .catch((err) => console.error(err))
    }

  useEffect(() => {

  }, [])

  return (
    <main>
      <Navbar setFriendList={setFriendList}/> 
      {isReqResModalOpen == null ? null : (
        <FriendRequestResultModal reqObj={isReqResModalOpen} closeBtnHandler={handleCloseFriendReqModal}/>
      )}
      {!isAddFriendModalOpen ? null : <AddFriendModal handleFriendReqSubmit={handleFriendReqSubmit}/>}
      {!isCreateGroupModalOpen ? null : <CreateGroupModal handleCreateGroupModal={handleCreateGroupModal}/>}
      {!isGroupSearchModalOpen ? null : <SearchGroupModal handleSearchGroupModal={handleSearchGroupModal}/>}
      <div className={styles.addFriendSearchGroupBtnsCont}>
        <button type='button' onClick={handleAddFriendBtn}>Add a friend</button>
        <button type='button' onClick={handleSearchGroupModal}>Search Groups</button>
      </div>
      <GroupList/>
      <aside className={styles.friendListCont}>
      {profile ? <FriendList profile={profile} friendList={friendList} setFriendList={setFriendList}/> : null}
      </aside>
      <button onClick={handleCreateGroupModal}>Create Group</button>
    </main>
  )
};

export default UserHome;