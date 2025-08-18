import { useEffect, useState } from 'react';
import styles from '../../styles/GroupList.module.css';

const GroupList = () => {
  const [ groups, setGroups ] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('msgAppToken');
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/get-member-groups`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setGroups(res);
    })
    .catch((err) => console.error(err))
  }, []);

  return (
    <section>
      {!groups ? null : (
        <ul>
          {groups.Group.map((groupInfo, indx) => {
            return (
              <li key={groupInfo.id} className={styles.groupLiCont}>
                <img className={styles.groupImg} width={'25px'} height={'25px'} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${groupInfo.groupImgPath}`} alt={`${groupInfo.groupName} Group Chat Image`} />
                <h3>{groupInfo.groupName}</h3>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
};

export default GroupList;