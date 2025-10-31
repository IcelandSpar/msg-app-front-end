import { useEffect } from "react";
import { useNavigate } from "react-router";

import OptionsMenu from "./OptionsMenu.jsx";
import GroupListItem from "./GroupListItem.jsx";


import LoadingIcon from "./LoadingIcon.jsx";

import styles from "../../styles/GroupList.module.css";

const GroupList = ({
  groups,
  handleClickOnGroupLi,
  isLoadingGroupList,
  isUserHomeList = false,
  setMemberGroups,
}) => {


  return (
    <section className={styles.groupListSect}>
      <div className={styles.groupHeadingAndNoGroupParaCont}>
        <h3 className={styles.groupsHeading}>Groups</h3>
        {!isLoadingGroupList ? null : <LoadingIcon />}
        {groups && groups.length <= 0 ? (
          <div className={styles.noGroupsParaCont}>
            <p>(╥﹏╥)</p>
            <p className={styles.groupsPara}>No groups found...</p>
          </div>
        ) : null}
      </div>
      {!groups ? null : (
        <ul className={styles.groupUlCont}>
          {groups.map((groupInfo, indx) => {
            return (
              <GroupListItem key={groupInfo.id} setMemberGroups={setMemberGroups} styles={styles} groupInfo={groupInfo} isUserHomeList={isUserHomeList} handleClickOnGroupLi={handleClickOnGroupLi}/>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default GroupList;
