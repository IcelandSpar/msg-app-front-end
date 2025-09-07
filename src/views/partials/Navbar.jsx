
import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import UserContext from '../../UserContext';

import NotificationDropdown from './NotificationDropdown.jsx';

import styles from '../../styles/Navbar.module.css';

const Navbar = ({setFriendList}) => {
  const [ isNotifOpen, setIsNotifOpen ] = useState(false);
  const { profile, isLoggedIn, setProfile, setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const handleFriendCodeBtn = async (e, text) => {
    e.preventDefault();
    const type = "text/plain";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
  };

  const handleClickOnProfile = (e) => {
    navigate('/profile/myprofile');
  };

  const handleNotificationDropdownBtn = (e) => {
    e.preventDefault();
    setIsNotifOpen(true);
    
  };

  const handleNotifDropdownBtnLeave = (e) => {
    e.preventDefault();
    setIsNotifOpen(false);
  };

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
              {isNotifOpen ? <NotificationDropdown handleNotifDropdownBtnLeave={handleNotifDropdownBtnLeave} setFriendList={setFriendList}/> : null}
              <button onMouseEnter={handleNotificationDropdownBtn}>Notifications</button>
            </div>
          ) }
          <div>
            <div className={styles.profileCont}>
              <img onClick={handleClickOnProfile} className={styles.profileImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${profile.profileImgFilePath}`} alt={`Your profile picture`} width={`30px`} height={`30px`}/>
              <p>{profile.profileName}</p>
            </div>
            <button onClick={(e) => handleFriendCodeBtn(e, profile.friendCode)}>Friend Code: {profile.friendCode}</button>
          </div>
        </div>
      )}
      </nav>
    </header>
  )
};


export default Navbar;