import { socket } from "../../socket";
import { useRef, useContext } from "react";
import { useParams } from "react-router";

import UserContext from "../../UserContext";

const MsgForm = ({ setChatMsgs }) => {
  const messageInput = useRef(null);

  const { groupId } = useParams();
  const { profile } = useContext(UserContext);

  const handleSubmitMsgForm = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("msgAppToken");

      const formData = new FormData();
      formData.append("messageContent", messageInput.current.value);
      formData.append("groupId", groupId);
      formData.append("authorId", profile.id);

      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/chat/post-chat-msg`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          setChatMsgs((chatMsgs) => [
            ...chatMsgs,
            {
              profileName: profile.profileName,
              messageContent: messageInput.current.value,
              imgPath: profile.profileImgFilePath,
            },
          ]);

          socket.emit("send message", {
            groupId: groupId,
            message: messageInput.current.value,
            profileName: profile.profileName,
            imgPath: profile.profileImgFilePath,
          });
        })
        .catch((err) => console.error(err));

  };

  return (
    <form onSubmit={handleSubmitMsgForm}>
      <div>
        <label htmlFor="message">Message: </label>
        <textarea ref={messageInput} name="message" id="message"></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default MsgForm;
