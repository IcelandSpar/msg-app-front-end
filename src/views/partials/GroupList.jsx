import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LoadingIcon from "./LoadingIcon.jsx";
import styles from '../../styles/GroupList.module.css';

const GroupList = ({groups, handleClickOnGroupLi, isLoadingGroupList}) => {

  return (
    <section className={styles.groupListSect}>
      <div className={styles.groupHeadingAndNoGroupParaCont}>
        <h3 className={styles.groupsHeading}>Groups</h3>
        {!isLoadingGroupList ? null : <LoadingIcon/>}
        {groups && groups.length > 0 || isLoadingGroupList ? null : <div className={styles.noGroupsParaCont}>
          <p>(╥﹏╥)	</p><p className={styles.groupsPara}>No groups found...</p>
        </div>}
      </div>
      {!groups && isLoadingGroupList ? null : (
        <ul className={styles.groupUlCont}>
          {groups.map((groupInfo, indx) => {
            return (
              <li key={groupInfo.group.id} onClick={(e) => handleClickOnGroupLi(e, groupInfo.group.id)} className={styles.groupLiCont}>
                <img className={styles.groupImg} width={'25px'} height={'25px'} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupInfo.group.groupImgPath}`} alt={`${groupInfo.groupName} Group Chat Image`} />
                <h3>{groupInfo.group.groupName}</h3>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
};

export default GroupList;