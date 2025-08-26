
import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router';
import UserContext from '../../UserContext';

import NotificationDropdown from './NotificationDropdown.jsx';

import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  const [ isNotifOpen, setIsNotifOpen ] = useState(false);
  const { profile, isLoggedIn, setProfile, setIsLoggedIn } = useContext(UserContext);

  const handleFriendCodeBtn = async (e, text) => {
    e.preventDefault();
    const type = "text/plain";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
  };

  const handleNotificationDropdownBtn = (e) => {
    e.preventDefault();
    setIsNotifOpen((prev) => !prev);
    
  }

    useEffect(() => {
    try {
      const token = sessionStorage.getItem("msgAppToken");
      if (token) {
        fetch(
          `${import.meta.env.VITE_FETCH_BASE_URL}/profile/get-user-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if(res.profile) {
              setProfile(res.profile);
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }

          });
      }
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
    }
  }, []);


  return (
    <header>
      <nav className={styles.navbar}>
      <div className={styles.linksCont}>
        <Link to={'/'}>Home</Link>
        {profile ? null : (
          <>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
          </>
        )}

        {!profile ? null : (
        <>
        <Link to={'/channel/myhome'}>My Home</Link>
        <Link to={'/logout'}>Logout</Link>
        </>
        )}
      
      </div>
      {!profile ? null : (
        <div className={styles.notifAndProfileCont}>
          {!profile ? null : (
            <div className={styles.notificationCont}>
              {isNotifOpen ? <NotificationDropdown/> : null}
              <button onClick={handleNotificationDropdownBtn}>Notifications</button>
            </div>
          ) }
          <div>
            <div className={styles.profileCont}>Welcome {profile.profileName}</div>
            <button onClick={(e) => handleFriendCodeBtn(e, profile.friendCode)}>Friend Code: {profile.friendCode}</button>
          </div>
        </div>
      )}
      </nav>
    </header>
  )
};


export default Navbar;