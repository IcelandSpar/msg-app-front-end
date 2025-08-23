import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../styles/GroupList.module.css';

const GroupList = () => {
  const [ groups, setGroups ] = useState(null);

  const navigate = useNavigate();

  const handleClickOnGroupLi = (e, groupId) => {
    e.preventDefault();
    navigate(`/channel/group/${groupId}`);
  };

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
      setGroups(res);
    })
    .catch((err) => console.error(err))
  }, []);

  return (
    <section>
      {!groups ? null : (
        <ul>
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