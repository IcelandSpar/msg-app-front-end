import { useState, useRef, useContext } from "react";
import UserContext from '../../UserContext.jsx';

import GroupList from "./GroupList.jsx";

import styles from "../../styles/SearchGroupModal.module.css";

const SearchGroupModal = ({ handleSearchGroupModal, setMemberGroups }) => {
  const [groups, setGroups] = useState(null);
  const [ groupToJoin, setGroupToJoin ] = useState(null);

  const groupNameInput = useRef(null);

  const { profile } = useContext(UserContext);

  const handleSearchBtn = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("msgAppToken");

    if (token && groupNameInput.current.value != "" && profile.id) {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/group-actions/get-searched-groups/${groupNameInput.current.value}/${profile.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setGroups(res);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleClickOnGroupLi = (e, groupId) => {
    e.preventDefault();
    const token = sessionStorage.getItem("msgAppToken");
    if (token) {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/group-actions/get-group-info/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json(res))
        .then((res) => setGroupToJoin(res))
        .catch((err) => console.error(err));
    }
  };

  const handleCloseModals = (e) => {
    e.preventDefault();
    setGroupToJoin(null);
    handleSearchGroupModal(e)
  }

  const handleJoinBtn = (e, groupToJoin) => {
    e.preventDefault();
    const token = sessionStorage.getItem('msgAppToken');
    if(token && groupToJoin && profile) {
      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/join-group/${groupToJoin.id}/${profile.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
      })
      .then((res) => res.json())
      .then((res) => {
        setMemberGroups(res.updatedMemberGroups);
        handleCloseModals(e);
      })
      .catch((err) => console.error(err))


    }


  }

  return (
    <div className={styles.modalBackground}>
      {!groupToJoin ? null : (
        <div className={styles.joinGroupModalBackground}>
          <div className={styles.joinGroupModalCont}>
            <p>Would you like to join {groupToJoin.groupName}?</p>
            <div className={styles.joinOrNotBtnCont}>
              <button onClick={handleCloseModals} type="button">Nevermind</button>
              <button onClick={(e) => handleJoinBtn(e, groupToJoin)} type="button">Join</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.searchGroupModalCont}>
        <form onSubmit={handleSearchBtn}>
          <div className={styles.searchInputButtonCont}>
            <div>
              <label htmlFor="groupNameSearch">Search groups by name:</label>
              <input
                ref={groupNameInput}
                type="text"
                id="groupNameSearch"
                name="groupNameSearch"
              />
            </div>
            <button onClick={handleSearchBtn} type="button">
              Search
            </button>
          </div>
          <button onClick={handleSearchGroupModal} type="button">
            Exit
          </button>
        </form>
        {!groups ? null : (
          <GroupList
            groups={groups}
            handleClickOnGroupLi={handleClickOnGroupLi}
          />
        )}
      </div>
    </div>
  );
};

export default SearchGroupModal;
