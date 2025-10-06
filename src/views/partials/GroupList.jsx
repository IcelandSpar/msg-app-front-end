import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../styles/GroupList.module.css';

const GroupList = ({groups, handleClickOnGroupLi}) => {

  return (
    <section>
      <h3>Groups</h3>
      {!groups ? null : (
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