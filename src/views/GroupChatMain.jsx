import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { socket } from "../socket.js";

import MsgForm from "./partials/MsgForm.jsx";
import GroupChatMessages from "./partials/GroupChatMessages";
import UserContext from "../UserContext.jsx";

const GroupChatMain = () => {
  const [chatMsgs, setChatMsgs] = useState([]);

  const { groupId } = useParams();

  const { profile } = useContext(UserContext);


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
        .then((res) => setChatMsgs(res))
        .catch((err) => console.error(err));

      socket.connect();

      socket.on("connected", (msg) => {
        console.log(msg);
      });

      socket.emit("joinRoom", {
        profileName: profile.profileName,
        groupId: groupId,
      });
      socket.on("joinRoomMsg", (msg) => console.log(msg));

      socket.on("received message", (msgInfo) => {
        if(msgInfo.groupId == groupId) {
          console.log('msg info',msgInfo)
          setChatMsgs((chatMsgs) => [...chatMsgs, { profileName: msgInfo.profileName, messageContent: msgInfo.message, imgPath: msgInfo.imgPath }])

        }
      });

    } catch (err) {
      console.error(err)
    }
  }, [groupId]);

  return (
    <main>
      {!chatMsgs ? null : <GroupChatMessages chatMsgs={chatMsgs}/>}
      <MsgForm setChatMsgs={setChatMsgs}/>
    </main>
  );
};

export default GroupChatMain;
