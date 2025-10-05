import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import Navbar from "./partials/Navbar.jsx";
import UserProfileInfo from "./partials/UserProfileInfo.jsx";
import FriendRequestResultModal from "./partials/FriendRequestResultModal.jsx";

import UserContext from "../UserContext.jsx";

import styles from "../styles/ProfilePage.module.css";
import addFriendIcon from "../assets/add_friend_icon.svg";
import unfriendIcon from "../assets/unfriend_icon.svg";

const ProfilePage = () => {
  const [profileBeingViewed, setProfileBeingViewed] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [isReqModalOpen, setIsReqModalOpen] = useState(null);

  const { profileIdViewing } = useParams();
  const { profile } = useContext(UserContext);

  const navigate = useNavigate();

  const handleCloseReqModalBtn = (e) => {
    e.preventDefault();
    setIsReqModalOpen(null);
  };

  const handleSendFriendReqBtn = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");
    const formData = new FormData();

    formData.append("friendCode", profileBeingViewed.friendCode);
    formData.append("profileIdRequesting", profile.id);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/friends/send-friend-req`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success == true && res.message) {
          setIsReqModalOpen(res);
        }
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const handleUnfriendBtn = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");
    if (profile.id && profileIdViewing && token) {

      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/friends/delete-friend-and-friend-requests/${profile.id}/${profileIdViewing}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.success == true) {
            navigate("/channel/myhome");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("msgAppToken");
    if (token) {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/profile/get-profile/${profileIdViewing}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setProfileBeingViewed(res);
        })
        .catch((err) => console.error(err));

      if (profile) {
        fetch(
          `${import.meta.env.VITE_FETCH_BASE_URL}/friends/check-if-friend/${
            profile.id
          }/${profileIdViewing}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        )
          .then((res) => res.json())
          .then((res) => setIsFriend(res))
          .catch((err) => console.error(err));
      }
    }
  }, [profile, profileIdViewing]);

  return (
    <div>
      <Navbar />
      <main>
      {isReqModalOpen == null ? null : (
        <FriendRequestResultModal
          reqObj={isReqModalOpen}
          closeBtnHandler={handleCloseReqModalBtn}
        />
      )}
      {profileBeingViewed == null ? null : (
        <UserProfileInfo profile={profileBeingViewed} />
      )}
      {!profile ? null : (
        <>
          {profile.id == profileIdViewing ? null : (
            <div className={styles.friendOrUnfriendBtnCon}>
              {!isFriend ? (
                <button
                className={styles.sendFriendReqBtn}
                  onClick={(e) => handleSendFriendReqBtn(e, profileBeingViewed)}
                  type="button"
                >
                  <p>Add friend</p>
                  <img className={styles.addFriendIcon} src={addFriendIcon} alt="Send Friend Request" width={'25px'} height={'25px'}/>
                </button>
              ) : (
                <button  className={styles.unfriendBtn} onClick={handleUnfriendBtn} type="button">
                  <p>Unfriend</p>
                  <img className={styles.unfriendIcon} src={unfriendIcon} alt="Unfriend" width={'25px'} height={'25px'} />
                </button>
              )}
            </div>
          )}
        </>
      )}
      </main>

    </div>
  );
};

export default ProfilePage;
