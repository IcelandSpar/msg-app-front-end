import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import styles from '../../styles/FriendList.module.css';

const FriendList = ({ profile, friendList, setFriendList }) => {

  const navigate = useNavigate();

  const handleNavigateToDirectMessage = (e, friendOneId, friendTwoId) => {
    e.preventDefault();

    const token = sessionStorage.getItem('msgAppToken');

    if(token) {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/friends/get-direct-message-group/${friendOneId}/${friendTwoId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      if(res) {
        console.log(res)
        navigate(`/channel/direct-message/${res.directMessageGroup.id}`);
      }
    }).catch((err) => {
      if(err) {
        console.error(err);
      }
    })
    }





  }

  const handleClickOnUserProfile = (e, profileId) => {
    e.preventDefault();
    navigate(`/profile/${profileId}`);
  }

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
  <h4 className={styles.friendListHeading}>Friends</h4>
  {friendList && friendList.length > 0 ? null : <div className={styles.noFriendsParaCont}><p>( ಥ ʖ̯ ಥ)</p><p>No friends...</p></div>}

  {friendList == null ? null : (
    <ul className={styles.friendListUlCont}>
      {friendList.map((friend, indx) => {
        return (
          <li key={friend.id} className={styles.friendListLiCont}>
            <img onClick={(e) => handleClickOnUserProfile(e, profile.id == friend.friendOne.id ? `${friend.friendTwo.id}` : `${friend.friendOne.id}`)} className={styles.friendProfileImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${profile.id == friend.friendOne.id ? `${friend.friendTwo.profileImgFilePath}` : `${friend.friendOne.profileImgFilePath}`}`} alt={`${profile.id == friend.friendOne.id ? `${friend.friendTwo.profileName}` : `${friend.friendOne.profileName}`}'s profile picture`} width={'25px'} height={'25px'}/>
            <p onClick={(e) => handleNavigateToDirectMessage(e, friend.friendOne.id, friend.friendTwo.id)}>{profile.id == friend.friendOne.id ? `${friend.friendTwo.profileName}` : `${friend.friendOne.profileName}`}</p>
          </li>
        )
      })}
    </ul>
  )}

  </>);
};

export default FriendList;
