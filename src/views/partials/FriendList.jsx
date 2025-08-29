import { useEffect, useState, useContext } from "react";

import styles from '../../styles/FriendList.module.css';

const FriendList = ({ profile }) => {
  const [ friendList, setFriendList ] = useState(null);


  useEffect(() => {

    const token = sessionStorage.getItem('msgAppToken');

    if(token) {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/friends/get-profile-friend-list/${profile.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      setFriendList(res);
    })
    }


  }, [profile.id]);
  
  return (<>
  <h4 className={styles.friendListHeading}>Friend List</h4>
  {friendList == null ? null : (
    <ul className={styles.friendListUlCont}>
      {friendList.map((friend, indx) => {
        return (
          <li key={friend.id} className={styles.friendListLiCont}>
            <img className={styles.friendProfileImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${profile.id == friend.friendOne.id ? `${friend.friendTwo.profileImgFilePath}` : `${friend.friendOne.profileImgFilePath}`}`} alt={`${profile.id == friend.friendOne.id ? `${friend.friendTwo.profileName}` : `${friend.friendOne.profileName}`}'s profile picture`} width={'25px'} height={'25px'}/>
            <p>{profile.id == friend.friendOne.id ? `${friend.friendTwo.profileName}` : `${friend.friendOne.profileName}`}</p>
          </li>
        )
      })}
    </ul>
  )}

  </>);
};

export default FriendList;
