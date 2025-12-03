import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { socket } from "../socket.js";

import Navbar from "./partials/Navbar.jsx";
import MsgForm from "./partials/MsgForm.jsx";
import UserContext from "../UserContext.jsx";
import LoadingIcon from "./partials/LoadingIcon.jsx";
import GroupChatMessages from "./partials/GroupChatMessages";
import GroupMembersList from "./partials/GroupMembersList.jsx";
import ValidationErrModal from "./partials/ValidationErrModal.jsx";

import styles from "../styles/GroupChatMain.module.css";

import unfriendIcon from "../assets/unfriend_icon.svg";
import sidebarMenu from "../assets/sidebar_menu_icon.svg";
import crownIcon from "../assets/crown_icon.svg";

const GroupChatMain = () => {
  const endOfMsg = useRef(null);

  const [chatMsgs, setChatMsgs] = useState([]);
  const [groupMembers, setGroupMembers] = useState(null);
  const [isLoadingMsgs, setIsLoadingMsgs] = useState(true);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [msgFormErrors, setMsgFormErrors] = useState(null);
  const [isMemberSidebarOpen, setIsMemberSidebarOpen] = useState(false);
  const [isCloseAnimToggle, setIsCloseAnimToggle] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMemberOptsOpen, setIsMemberOptsOpen] = useState(null);

  const { groupId } = useParams();

  const { profile } = useContext(UserContext);

  const handleGroupMemberSidebarBtn = (e) => {
    e.preventDefault();
    if (isMemberSidebarOpen) {
      setIsCloseAnimToggle(true);
      setTimeout(() => {
        setIsMemberSidebarOpen(false);
      }, 500);
    } else {
      setIsCloseAnimToggle(false);
      setIsMemberSidebarOpen(true);
    }
  };

  const handleMemberOptsModal = (e, profileInfo = null) => {
    e.preventDefault();
    if (isMemberOptsOpen) {
      setIsMemberOptsOpen(null);
    } else {
      setIsMemberOptsOpen(profileInfo);
    }
  };

  const handleRemoveMember = (e, profileInfo, adminId) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");

    if (token) {
      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/remove-member/${
          profileInfo.groupId
        }/${profileInfo.profileId}/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'DELETE'
        }
      ).then((res) => res.json())
      .then((res) => {
        setGroupMembers({
          ...groupMembers,
          adminRoleMembers: groupMembers.adminRoleMembers.filter((item) => item.profileId != res.removedMember.profileId),
          userRoleMembers: groupMembers.userRoleMembers.filter((item) => item.profileId != res.removedMember.profileId),
        });
        setIsMemberOptsOpen(null);

      })
      .catch((err) => console.error(err));
    }
  };

  const handlePromoteMember = (e, profileInfo, adminId) => {
    e.preventDefault();
    const token = sessionStorage.getItem("msgAppToken");

    if(token) {
      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/promote-to-admin/${profileInfo.groupId}/${profileInfo.profileId}/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if(res.promotedMember) {
          setGroupMembers({
            ...groupMembers,
            adminRoleMembers: res.adminRoleMembers,
            userRoleMembers: groupMembers.userRoleMembers.filter((item) => item.profileId != res.promotedMember.profileId),
          })
          setIsMemberOptsOpen(null);
        }
      })
      .catch((err) => console.error(err))
    }
  }

  const fetchChatMsgs = (token) => {
    setIsLoadingMsgs(true);
    fetch(
      `${
        import.meta.env.VITE_FETCH_BASE_URL
      }/group-actions/get-group-chat-msgs/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setChatMsgs(res);
        if (res) {
          setIsLoadingMsgs(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const fetchGroupMembers = (token) => {
    setIsLoadingMembers(true);

    fetch(
      `${
        import.meta.env.VITE_FETCH_BASE_URL
      }/group-actions/get-group-members/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setGroupMembers(res);
        if (res) {
          setIsLoadingMembers(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const checkIfAdmin = (token) => {
    fetch(
      `${
        import.meta.env.VITE_FETCH_BASE_URL
      }/group-actions/check-if-admin/${groupId}/${profile.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => setIsAdmin(res.isAdmin))
      .catch((err) => console.error(err));
  };

  const handleCloseErrMsg = (e) => {
    e.preventDefault();
    setMsgFormErrors(null);
  };

  useEffect(() => {
    let scrollDownTimeout;
    let pollChatInterval;
    let intDuration = 60000;

    try {
      scrollDownTimeout = setTimeout(() => {
        endOfMsg.current?.scrollIntoView({ behavior: "smooth" });
        clearTimeout(scrollDownTimeout);
      }, 1000);
      const token = sessionStorage.getItem("msgAppToken");
      fetchChatMsgs(token);
      fetchGroupMembers(token);
      checkIfAdmin(token);
      pollChatInterval = setInterval(() => {
        fetchChatMsgs(token);
        // fetchGroupMembers(token);
      }, intDuration);

      socket.connect();

      socket.on("connected", (msg) => {
        console.log(msg);
      });

      socket.emit("joinRoom", {
        profileName: profile.profileName,
        groupId: groupId,
      });
      socket.on("joinRoomMsg", (msg) => {
        console.log(msg);
      });

      socket.on("received message", (msgInfo) => {
        setChatMsgs((chatMsgs) => [
          ...chatMsgs,
          {
            profileName: msgInfo.profileName,
            messageContent: msgInfo.messageContent,
            imgPath: msgInfo.imgPath,
            createdAt: new Date(),
          },
        ]);
      });
    } catch (err) {
      console.error(err);
    }

    console.log("group chat render test");

    return () => {
      clearInterval(pollChatInterval);
      socket.off("received message");
      socket.off("joinRoomMsg");
      socket.off("connected");
      socket.disconnect();
    };
  }, [groupId, profile]);

  return (
    <>
      <main className={styles.groupChatMainCont}>
        <div className={styles.navbarCont}>
          <Navbar />
        </div>
        {!isMemberOptsOpen ? null : (
          <div className={styles.memberOptsModalBackground}>
            <div className={styles.memberOptsModal}>
              <button
                onClick={(e) => handleMemberOptsModal(e)}
                type="button"
                className={styles.exitOptsBtn}
              >
                X
              </button>
              <ul className={styles.optionsModalUl}>
                <li className={styles.optionsModalLi}>
                      <p className={styles.questionAndProfileImg}>Remove <img className={styles.memberOptsProfileImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${isMemberOptsOpen.member.profileImgFilePath}`} alt="User profile image" width={'20'} height={'20px'}/>{`${isMemberOptsOpen.member.profileName}`} from the group?</p>
                    

                  <button
                    className={styles.removeMemberBtn}
                    onClick={(e) =>
                      handleRemoveMember(e, isMemberOptsOpen, profile.id)
                    }
                    type="button"
                  >
                    <p>Remove</p>
                    <img src={unfriendIcon} alt="remove" />
                  </button>
                </li>
                {isMemberOptsOpen.role == "USER" ? (
                <li className={styles.optionsModalLi}>
                  
                    <p className={styles.questionAndProfileImg}>Promote <img className={styles.memberOptsProfileImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${isMemberOptsOpen.member.profileImgFilePath}`} alt="User profile image" width={'20px'} height={'20px'}/>{`${isMemberOptsOpen.member.profileName}`} to admin?</p>
                  
                  <button type="button" onClick={(e) => handlePromoteMember(e, isMemberOptsOpen, profile.id)} className={styles.memberOptsBtn}><p>Promote</p><img src={crownIcon} alt="admin crown" /></button>
                  </li>
                ) : null}

              </ul>
            </div>
          </div>
        )}
        <button
          onClick={handleGroupMemberSidebarBtn}
          className={styles.sidebarBtn}
          type="button"
        >
          <img src={sidebarMenu} alt="Sidebar" width={"25px"} height={"25px"} />
        </button>
        {!isMemberSidebarOpen ? null : (
          <div className={styles.groupMemberSidebarBackground}>
            <aside
              className={`${styles.groupMemberListSidebar} ${
                isCloseAnimToggle
                  ? `${styles.toggleCloseSidebar}`
                  : `${styles.toggleOpenSidebar}`
              }`}
            >
              <button
                onClick={handleGroupMemberSidebarBtn}
                className={styles.innerSidebarBtn}
                type="button"
              >
                <img
                  src={sidebarMenu}
                  alt="Sidebar"
                  width={"25px"}
                  height={"25px"}
                />
              </button>

              {groupMembers ? (
                <GroupMembersList
                  groupMembers={groupMembers}
                  isAdmin={isAdmin}
                  handleMemberOptsModal={handleMemberOptsModal}
                />
              ) : null}
            </aside>
          </div>
        )}
        {!msgFormErrors ? null : (
          <ValidationErrModal
            closeMsgHandler={handleCloseErrMsg}
            msgFormErrors={msgFormErrors}
          />
        )}
        <section className={styles.groupChatMsgsCont}>
          {!isLoadingMsgs ? null : <LoadingIcon />}
          {!chatMsgs ? null : (
            <GroupChatMessages endOfMsg={endOfMsg} chatMsgs={chatMsgs} />
          )}
        </section>
        <aside className={styles.groupMembersCont}>
          {!isLoadingMembers ? null : <LoadingIcon />}
          {!groupMembers ? null : (
            <GroupMembersList
              groupMembers={groupMembers}
              isAdmin={isAdmin}
              handleMemberOptsModal={handleMemberOptsModal}
            />
          )}
        </aside>
        <div className={styles.msgFormCont}>
          <MsgForm
            endOfMsg={endOfMsg}
            setChatMsgs={setChatMsgs}
            setMsgFormErrors={setMsgFormErrors}
          />
        </div>
      </main>
    </>
  );
};

export default GroupChatMain;
