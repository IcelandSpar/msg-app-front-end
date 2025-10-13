import { useEffect, useState, useContext } from "react";
import UserContext from "../../UserContext";

import styles from "../../styles/NotificationDropdown.module.css";
import { is } from "date-fns/locale";

const NotificationDropdown = ({
  handleNotifDropdownBtnLeave,
  setFriendList,
}) => {
  const [notifications, setNotifications] = useState(null);

  const { profile } = useContext(UserContext);

  const handleDismissBtn = (e, notifId) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");
    if (token) {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/friends/delete-friend-req/${notifId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setNotifications((prev) =>
              prev.filter((item) => item.id != notifId)
            );
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleUserFriendReqOptionBtns = (e, isAccepted, notificationId) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");

    if (token) {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/friends/update-receiver-friend-req/${
          profile.id
        }/${notificationId}?isFriendReqAccepted=${isAccepted}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "PUT",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (isAccepted) {
            setFriendList(res.profileFriendList);
            setNotifications(res.updatedFriendRequests);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("msgAppToken");
    if (token && profile) {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/friends/get-pending-friend-requests/${profile.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setNotifications(res);
        })
        .catch((err) => console.error(err));
    }
  }, [profile]);

  return (
    <div
      onMouseLeave={handleNotifDropdownBtnLeave}
      className={styles.notifDropdownCont}
    >
      {notifications == null ? null : (
        <>
          {notifications.length <= 0 ? (
            <p>No notifications at this moment...</p>
          ) : (
            <>
              <ul className={styles.notifUl}>
                {notifications.map((notif, indx) => {
                  if (
                    notif.status == "ACCEPTED" && profile.id != notif.ReceiverId
                  ) {
                    return (
                      <li key={notif.id}>
                        <p>
                          {notif.Receiver.profileName} accepted your friend
                          request!
                        </p>
                        <button onClick={(e) => handleDismissBtn(e, notif.id)}>
                          Dismiss
                        </button>
                      </li>
                    );
                  } else if (notif.status == "PENDING" && notif.ReceiverId == profile.id) {
                    return (
                      <li key={notif.id}>
                        <p>
                          {notif.Sender.profileName} sent you a friend request!
                        </p>
                        <div className={styles.friendReqBtnCont}>
                          <button
                            className={styles.notifFriendDenyBtn}
                            onClick={(e) =>
                              handleUserFriendReqOptionBtns(e, false, notif.id)
                            }
                            type="button"
                          >
                            Deny
                          </button>
                          <button
                          className={styles.notifFriendAcceptBtn}
                            onClick={(e) =>
                              handleUserFriendReqOptionBtns(e, true, notif.id)
                            }
                            type="button"
                          >
                            Accept
                          </button>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
