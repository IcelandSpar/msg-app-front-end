import { useState, useRef, useContext } from "react";
import UserContext from '../../UserContext.jsx';
import he from "he";

import GroupList from "./GroupList.jsx";

import styles from "../../styles/SearchGroupModal.module.css";
import groupSearchIcon from "../../assets/group_search_icon.svg";

const SearchGroupModal = ({ handleSearchGroupModal, setMemberGroups, setIsGroupSearchModalOpen }) => {
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
    
    if((Array.from(e.target.classList))[1] == "searchModalBackground") {
      setGroupToJoin(null);
      handleSearchGroupModal(e);
      setIsGroupSearchModalOpen(false);
    }


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
    <div onClick={handleCloseModals} className={`${styles.modalBackground} searchModalBackground`}>
      {!groupToJoin ? null : (
        <div className={`${styles.joinGroupModalBackground} searchModalBackground`}>
          <div className={styles.joinGroupModalCont}>
            <div className={styles.groupImgAndParaCont}>
              <img className={styles.groupImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupToJoin.groupImgPath}`} alt="group image" width={'50px'} height={'50px'}/>
              <p className={styles.joinPara}>Would you like to join</p>
              <p className={styles.joinPara}>{he.decode(groupToJoin.groupName)}?</p>
            </div>
            <div className={styles.joinOrNotBtnCont}>
              <button className={`${styles.noJoinBtn} searchModalBackground`} onClick={handleCloseModals} type="button">Nevermind</button>
              <button className={`${styles.joinBtn} searchModalBackground`} onClick={(e) => handleJoinBtn(e, groupToJoin)} type="button">Join</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.searchGroupModalCont}>
          <button className={styles.searchGroupModalExitBtn} onClick={handleSearchGroupModal} type="button">
            X
          </button>
        <form onSubmit={handleSearchBtn}>
          <div className={styles.searchInputButtonCont}>
            <div className={styles.groupSearchLabelAndInputCont}>
              <label htmlFor="groupNameSearch">Search groups by name</label>
              <input
                ref={groupNameInput}
                type="text"
                id="groupNameSearch"
                name="groupNameSearch"
              />
            </div>
          </div>
            <button className={styles.groupSearchBtn} onClick={handleSearchBtn} type="button">
              <p>Search</p>
              <img src={groupSearchIcon} alt="search groups" />
            </button>
        </form>

        {!groups ? null : (
          <div className={styles.groupListSearchResCont}>
            <GroupList
              groups={groups}
              handleClickOnGroupLi={handleClickOnGroupLi}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchGroupModal;
