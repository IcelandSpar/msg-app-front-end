import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext.jsx';
import Navbar from './partials/Navbar.jsx';
import GroupList from './partials/GroupList.jsx';
import CreateGroupModal from './partials/CreateGroupModal.jsx';
import AddFriendModal from './partials/AddFriendModal.jsx';

import styles from '../styles/UserHome.module.css';

const UserHome = () => {
  const [ isCreateGroupModalOpen, setIsCreateGroupModalOpen ] = useState(false);
  const [ isAddFriendModalOpen, setIsAddFriendModalOpen ] = useState(false);
  const { profile, isLoggedIn } = useContext(UserContext);

  const handleCreateGroupModal = (e) => {
    e.preventDefault();
    setIsCreateGroupModalOpen((prev) => !prev);
  };

  const handleAddFriendBtn = (e) => {
    e.preventDefault();
    setIsAddFriendModalOpen((prev) => !prev);
  }

  useEffect(() => {

  }, [])

  return (
    <main>
      <Navbar/> 
      {!isAddFriendModalOpen ? null : <AddFriendModal/>}
      {!isCreateGroupModalOpen ? null : <CreateGroupModal handleCreateGroupModal={handleCreateGroupModal}/>}
      <button onClick={handleAddFriendBtn}>Add a friend</button>
      <GroupList/>
      <button onClick={handleCreateGroupModal}>Create Group</button>
    </main>
  )
};

export default UserHome;