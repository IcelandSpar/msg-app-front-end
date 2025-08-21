import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext.jsx';
import Navbar from './partials/Navbar.jsx';
import GroupList from './partials/GroupList.jsx';
import CreateGroupModal from './partials/CreateGroupModal.jsx';

import styles from '../styles/UserHome.module.css';

const UserHome = () => {
  const [ isCreateGroupModalOpen, setIsCreateGroupModalOpen ] = useState(false);
  const { profile, isLoggedIn } = useContext(UserContext);

  const handleCreateGroupModal = (e) => {
    e.preventDefault();
    setIsCreateGroupModalOpen((prev) => !prev);
  }

  useEffect(() => {

  }, [])

  return (
    <main>
      {profile ? <Navbar/> : null}
      {!isCreateGroupModalOpen ? null : <CreateGroupModal handleCreateGroupModal={handleCreateGroupModal}/>}
      <GroupList/>
      <button onClick={handleCreateGroupModal}>Create Group</button>
    </main>
  )
};

export default UserHome;