import { useEffect, useState, useContext } from "react";
import UserContext from "../../UserContext";

import styles from "../../styles/NotificationDropdown.module.css";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState(null);

  const { profile } = useContext(UserContext);

  const handleUserFriendReqOptionBtns = (e, isAccepted, notificationId) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");

    if (token) {



      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/friends/update-receiver-friend-req/${profile.id}/${notificationId}?isFriendReqAccepted=${isAccepted}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'PUT',
        }
      )
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
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
          console.log(res);
          setNotifications(res);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className={styles.notifDropdownCont}>
      {notifications == null ? null : (
        <>
          {notifications.length <= 0 ? (
            <p>No notifications at this moment...</p>
          ) : (
            <>
              <ul>
                {notifications.map((notif, indx) => {
                  return (
                    <li key={notif.id}>
                      <p>
                        {notif.Sender.profileName} sent you a friend request
                      </p>
                      <div className={styles.acceptDenyBtnsCont}>
                        <button
                          onClick={(e) =>
                            handleUserFriendReqOptionBtns(e, true, notif.id)
                          }
                          type="button"
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) =>
                            handleUserFriendReqOptionBtns(e, false, notif.id)
                          }
                          type="button"
                        >
                          Deny
                        </button>
                      </div>
                    </li>
                  );
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
