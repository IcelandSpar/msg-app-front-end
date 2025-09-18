import { useState, useRef } from "react";

import GroupList from "./GroupList.jsx";

import styles from "../../styles/SearchGroupModal.module.css";

const SearchGroupModal = ({ handleSearchGroupModal }) => {
  const [groups, setGroups] = useState(null);
  const groupNameInput = useRef(null);

  const handleSearchBtn = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("msgAppToken");

    if (token && groupNameInput.current.value != "") {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/group-actions/get-searched-groups/${groupNameInput.current.value}`,
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

  const handleClickOnGroupLi = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.modalBackground}>
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
          <button type="button">
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
