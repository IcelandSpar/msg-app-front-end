import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { socket } from "../socket.js";

import MsgForm from "./partials/MsgForm.jsx";
import Navbar from './partials/Navbar.jsx';
import GroupChatMessages from "./partials/GroupChatMessages";
import GroupMembersList from "./partials/GroupMembersList.jsx";
import UserContext from "../UserContext.jsx";

import styles from '../styles/GroupChatMain.module.css';

const GroupChatMain = () => {
  const endOfMsg = useRef(null);

  const [chatMsgs, setChatMsgs] = useState([]);
  const [ groupMembers, setGroupMembers ] = useState(null);

  const { groupId } = useParams();

  const { profile } = useContext(UserContext);

  const fetchChatMsgs = (token) => {
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
      .then((res) => setChatMsgs(res))
      .catch((err) => console.error(err));
  };

  const fetchGroupMembers = (token) => {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/get-group-members/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res.json())
    .then((res) => setGroupMembers(res))
    .catch((err) => console.error(err));
  };

  useEffect(() => {
    let scrollDownTimeout;
    let pollChatInterval;
    let intDuration = 60000;

    try {
      scrollDownTimeout = setTimeout(() => {
        endOfMsg.current?.scrollIntoView({ behavior: 'smooth' });
        clearTimeout(scrollDownTimeout);
      }, 1000)
      const token = sessionStorage.getItem("msgAppToken");
      fetchChatMsgs(token);
      fetchGroupMembers(token);

      pollChatInterval = setInterval(() => {
        fetchChatMsgs(token);
        fetchGroupMembers(token);
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
        console.log(msg)
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

    console.log('group chat render test')

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
        <Navbar/>

      </div>
      {!chatMsgs ? null : (
        <section className={styles.groupChatMsgsCont}>
          <GroupChatMessages endOfMsg={endOfMsg} chatMsgs={chatMsgs} />
        </section>
        )}
        {!groupMembers ? null : (
          <aside className={styles.groupMembersCont}>
            <GroupMembersList groupMembers={groupMembers}/>
          </aside>
        )}
        <div className={styles.msgFormCont}>
      <MsgForm endOfMsg={endOfMsg} setChatMsgs={setChatMsgs} />
      </div>
    </main>
  </>
  );
};

export default GroupChatMain;
