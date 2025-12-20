import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import he from "he";


import styles from "../../styles/FriendList.module.css";
import LoadingIcon from "./LoadingIcon.jsx";

const FriendList = ({ profile, friendList, setFriendList }) => {
  const [isLoadingList, setIsLoadingList] = useState(true);

  const navigate = useNavigate();

  const handleNavigateToDirectMessage = (e, friendOneId, friendTwoId) => {
    e.preventDefault();

    if (
      !!Array.from(e.target.classList).find(
        (element) => element == "redirectToDm"
      ) == true
    ) {
      const token = sessionStorage.getItem("msgAppToken");

      if (token) {
        fetch(
          `${
            import.meta.env.VITE_FETCH_BASE_URL
          }/friends/get-direct-message-group/${friendOneId}/${friendTwoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res) {
              console.log(res);
              navigate(`/channel/direct-message/${res.directMessageGroup.id}`);
            }
          })
          .catch((err) => {
            if (err) {
              console.error(err);
            }
          });
      }
    }
  };

  const handleClickOnUserProfile = (e, profileId) => {
    e.preventDefault();
    navigate(`/profile/${profileId}`);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("msgAppToken");

    if (token) {
      setIsLoadingList(true);
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/friends/get-profile-friend-list/${profile.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setIsLoadingList(false);
          }
          setFriendList(res);
        });
    }
  }, [profile.id]);

  return (
    <>
      <h4 className={styles.friendListHeading}>Friends</h4>
      {(friendList && friendList.length > 0) || isLoadingList ? null : (
        <div className={styles.noFriendsParaCont}>
          <p>( ಥ ʖ̯ ಥ)</p>
          <p>No friends...</p>
        </div>
      )}
      {!isLoadingList ? null : <LoadingIcon />}
      {friendList == null ? null : (
        <ul className={styles.friendListUlCont}>
          {friendList.map((friend, indx) => {
            return (
              <li
                onClick={(e) =>
                  handleNavigateToDirectMessage(
                    e,
                    friend.friendOne.id,
                    friend.friendTwo.id
                  )
                }
                key={friend.id}
                className={`${styles.friendListLiCont} redirectToDm`}
              >
                <img
                  onClick={(e) =>
                    handleClickOnUserProfile(
                      e,
                      profile.id == friend.friendOne.id
                        ? `${friend.friendTwo.id}`
                        : `${friend.friendOne.id}`
                    )
                  }
                  className={`${styles.friendProfileImg} friendImg`}
                  src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
                    profile.id == friend.friendOne.id
                      ? `${friend.friendTwo.profileImgFilePath}`
                      : `${friend.friendOne.profileImgFilePath}`
                  }`}
                  alt={`${
                    profile.id == friend.friendOne.id
                      ? `${friend.friendTwo.profileName}`
                      : `${friend.friendOne.profileName}`
                  }'s profile picture`}
                  width={"25px"}
                  height={"25px"}
                />
                <p className={`redirectToDm`}>
                  {profile.id == friend.friendOne.id
                    ? `${he.decode(friend.friendTwo.profileName)}`
                    : `${he.decode(friend.friendOne.profileName)}`}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default FriendList;
