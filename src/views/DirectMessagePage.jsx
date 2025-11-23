import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { socket } from "../socket.js";

import Navbar from "./partials/Navbar.jsx";
import DirectMessages from "./partials/DirectMessages.jsx";
import GroupMembersList from "./partials/GroupMembersList.jsx";
import DirectMessageForm from "./partials/DirectMessageForm.jsx";
import ValidationErrModal from "./partials/ValidationErrModal.jsx";

import UserContext from "../UserContext.jsx";
import MsgForm from "./partials/MsgForm.jsx";

import styles from "../styles/DirectMessagePage.module.css";
import sidebarMenu from "../assets/sidebar_menu_icon.svg";

const DirectMessagePage = () => {
  const [directMessages, setDirectMessages] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [groupMembers, setGroupMembers] = useState({
    success: true,

    userRoleMembers: [
      {
        groupId: "1",
        id: "1",
        joined: new Date(),
        member: {
          id: "2",
          profileName: "Hello world",
          bio: "hehe",
          profileImgFilePath: null,
          friendCode: "3",
          userId: "4",
        },
        role: "USER",
        updatedAt: new Date(),
      },
    ],
    adminRoleMembers: [],
  });

  const endOfMsg = useRef(null);

  const { directMessageGroupId } = useParams();

  const { profile } = useContext(UserContext);

  const handleGroupMemberSidebarBtn = (e) => {
    e.preventDefault();
  };

  const handleCloseValidationMsg = (e) => {
    e.preventDefault();
    setValidationErrors(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("msgAppToken");

    if (profile && directMessageGroupId) {
      socket.connect();
      socket.emit("joinRoom", {
        profileName: profile.profileName,
        groupId: directMessageGroupId,
      });
      socket.on("joinRoomMsg", (msg) => {
        console.log(msg);
      });

      socket.on("received message", (msgInfo) => {
        if (msgInfo.groupId == directMessageGroupId) {
          setDirectMessages((prev) => [
            ...prev,
            {
              messageContent: msgInfo.messageContent,
              createdAt: new Date(),
              author: {
                profileImgFilePath: msgInfo.imgPath,
                profileName: msgInfo.profileName,
              },
            },
          ]);
        }
      });
      socket.on("connected", (msg) => {
        console.log(msg);
      });
    }

    if ((token, directMessageGroupId)) {
      fetch(
        `${
          import.meta.env.VITE_FETCH_BASE_URL
        }/direct-message/get-direct-messages/${directMessageGroupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("testing socket");
          // if (res.success) {
          //   socket.connect();
          // }
          setDirectMessages(res.directMessages);
        })
        .catch((err) => console.error(err));
    }

    return () => {
      socket.off("joinRoomMsg");
      socket.off("received message");
      socket.off("connected");
      socket.disconnect();
    };
  }, [directMessageGroupId, profile]);

  return (
    <div className={styles.directMessagePage}>
      <div className={styles.navbarCont}>
        <Navbar />
      </div>
      <button
        onClick={handleGroupMemberSidebarBtn}
        className={styles.sidebarBtn}
        type="button"
      >
        <img src={sidebarMenu} alt="Sidebar" width={"25px"} height={"25px"} />
      </button>
      {!validationErrors ? null : (
        <ValidationErrModal
          msgFormErrors={validationErrors}
          closeMsgHandler={handleCloseValidationMsg}
        />
      )}
      <aside className={styles.groupMembersCont}>
        {!isLoadingMembers ? null : <LoadingIcon />}
        {!groupMembers ? null : (
          <GroupMembersList groupMembers={groupMembers} isDirectMessage={true}/>
        )}
      </aside>
      <main className={styles.directMessageMain}>
        {directMessages != null ? (
          <div className={styles.directMessagesCont}>
            <DirectMessages
              directMessages={directMessages}
              endOfMsg={endOfMsg}
            />
          </div>
        ) : null}
      </main>
      <div className={styles.messageFormCont}>
        <DirectMessageForm
          endOfMsg={endOfMsg}
          setDirectMessages={setDirectMessages}
          setValidationErrors={setValidationErrors}
        />
      </div>
    </div>
  );
};

export default DirectMessagePage;
