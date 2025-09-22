import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { socket } from "../socket.js";

import Navbar from "./partials/Navbar.jsx";
import DirectMessages from "./partials/DirectMessages.jsx";
import DirectMessageForm from "./partials/DirectMessageForm.jsx";

import UserContext from "../UserContext.jsx";
import MsgForm from "./partials/MsgForm.jsx";

import styles from "../styles/DirectMessagePage.module.css";

const DirectMessagePage = () => {
  const [directMessages, setDirectMessages] = useState(null);
  const endOfMsg = useRef(null);

  const { directMessageGroupId } = useParams();

  const { profile } = useContext(UserContext);



  useEffect(() => {
    const token = sessionStorage.getItem("msgAppToken");

      if (profile && directMessageGroupId) {
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
          if (res.success) {
            socket.connect();
          }
          setDirectMessages(res.directMessages);
        })
        .catch((err) => console.error(err));
    }

    return () => {
      socket.off("joinRoomMsg");
      socket.off("received message");
      socket.off("connected");
    }
  }, [directMessageGroupId, profile]);

  return (
    <div className={styles.directMessagePage}>
      <Navbar />
      <main className={styles.directMessageMain}>
        {directMessages != null ? (
          <div className={styles.directMessagesCont}>
            <DirectMessages
              directMessages={directMessages}
              endOfMsg={endOfMsg}
            />
          </div>
        ) : null}
        <div className={styles.messageFormCont}>
          <DirectMessageForm
            endOfMsg={endOfMsg}
            setDirectMessages={setDirectMessages}
          />
        </div>
      </main>
    </div>
  );
};

export default DirectMessagePage;
