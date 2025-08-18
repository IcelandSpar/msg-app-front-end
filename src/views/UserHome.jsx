import { useEffect, useState } from 'react';

import CreateGroupModal from './partials/CreateGroupModal';

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
      <button onClick={handleCreateGroupModal}>Create Group</button>
    </main>
  )
};

export default UserHome;