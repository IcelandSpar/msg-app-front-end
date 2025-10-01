import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import UserContext from "../../UserContext";

import NotificationDropdown from "./NotificationDropdown.jsx";

import styles from "../../styles/Navbar.module.css";
import homeIcon from "../../assets/home_icon.svg";
import loginIcon from "../../assets/login_icon.svg";
import signUpIcon from "../../assets/sign_up_icon.svg";
import logoutIcon from "../../assets/logout_icon.svg";
import meetMeIcon from "../../assets/meetme.png";
import contentCopyIcon from "../../assets/content_copy_icon.svg";
import notificationIcon from "../../assets/notification_icon.svg";

const Navbar = ({ setFriendList }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { profile, isLoggedIn, setProfile, setIsLoggedIn } =
    useContext(UserContext);

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
    navigate("/profile/myprofile");
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
            if (res.profile) {
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
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.linksCont}>
          <Link to={"/"}>
            <img src={meetMeIcon} alt="Home" width={"30px"} height={"30px"} />
          </Link>
          {profile ? null : (
            <div className={styles.loginRegisterCont}>
              <Link  className={styles.linkIconCont} to={"/login"}>
              <img src={loginIcon} alt="login" width={"25px"} height={"25px"} />
              <p>Login</p>
              </Link>
              <Link className={styles.linkIconCont} to={"/register"}>
              <img src={signUpIcon} alt="regiter" width={'25px'} height={'25px'}/>
              <p>Register</p>
              </Link>
            </div>
          )}

          {!profile ? null : (
            <div className={styles.myHomeLogoutCont}>
              <Link className={styles.linkIconCont} to={"/channel/myhome"}>
                <img src={homeIcon} alt="home" width={"25px"} height={"25px"} />
                <p>My Home</p>
              </Link>
              <Link className={styles.linkIconCont} to={"/logout"}>
              <img src={logoutIcon} alt="logout" width={'25px'} height={'25px'}/>
              <p>Log out</p>
              </Link>
            </div>
          )}
        </div>
        {!profile ? null : (
          <div className={styles.notifAndProfileCont}>
            {!profile ? null : (
              <div className={styles.notificationCont}>
                {isNotifOpen ? (
                  <NotificationDropdown
                    handleNotifDropdownBtnLeave={handleNotifDropdownBtnLeave}
                    setFriendList={setFriendList}
                  />
                ) : null}
                <button
                  className={styles.notifBtn}
                  onMouseEnter={handleNotificationDropdownBtn}
                >
                  <img src={notificationIcon} alt="Notifications" />
                </button>
              </div>
            )}
            <div>
              <div className={styles.profileCont}>
                <img
                tabIndex={0}
                  onClick={handleClickOnProfile}
                  className={styles.profileImg}
                  src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
                    profile.profileImgFilePath
                  }`}
                  alt={`Your profile picture`}
                  width={`30px`}
                  height={`30px`}
                />
                <p>{profile.profileName}</p>
              </div>
              <button
                className={styles.copyFriendCodeBtn}
                onClick={(e) => handleFriendCodeBtn(e, profile.friendCode)}
              >
                Friend Code: {profile.friendCode}{" "}
                <img src={contentCopyIcon} alt="copy" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
