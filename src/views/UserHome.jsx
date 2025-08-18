import { useEffect, useState } from 'react';

import GroupList from './partials/GroupList.jsx';
import CreateGroupModal from './partials/CreateGroupModal.jsx';

import styles from '../styles/UserHome.module.css';

const UserHome = () => {
  const [ isCreateGroupModalOpen, setIsCreateGroupModalOpen ] = useState(false);

  const handleCreateGroupModal = (e) => {
    e.preventDefault();
    setIsCreateGroupModalOpen((prev) => !prev);
  }

  useEffect(() => {

  }, [])

  return (
    <main>
      {!isCreateGroupModalOpen ? null : <CreateGroupModal handleCreateGroupModal={handleCreateGroupModal}/>}
      <GroupList/>
      <button onClick={handleCreateGroupModal}>Create Group</button>
    </main>
  )
};

export default UserHome;