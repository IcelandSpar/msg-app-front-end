import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { socket } from "../socket.js";

import MsgForm from "./partials/MsgForm.jsx";
import GroupChatMessages from "./partials/GroupChatMessages";

const GroupChatMain = () => {
  const [chatMsgs, setChatMsgs] = useState([]);

  const { groupId } = useParams();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("msgAppToken");
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
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

      socket.connect();

      socket.on("connected", (msg) => {
        console.log(msg);
      });

      socket.emit("joinRoom", {
        profileName: "john doe",
        groupId: groupId,
      });
      socket.on("joinRoomMsg", (msg) => console.log(msg));

      socket.on("received message", (msgInfo) => {
        console.log('testing')
        if(msgInfo.groupId == groupId) {
          setChatMsgs((chatMsgs) => [...chatMsgs, { messageContent: msgInfo.message }])

        }
      });
    } catch (err) {
      console.error(err)
    }
  }, [groupId]);

  return (
    <main>
      {!chatMsgs ? null : <GroupChatMessages chatMsgs={chatMsgs}/>}
      
      
      <MsgForm setChatMsgs={setChatMsgs} />
    </main>
  );
};

export default GroupChatMain;
