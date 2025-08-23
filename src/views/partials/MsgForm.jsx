import { useRef, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { socket } from "../../socket";

import UserContext from "../../UserContext";

import styles from "../../styles/MsgForm.module.css";

const MsgForm = ({ setChatMsgs }) => {
  const [typingUserObj, setTypingUserObj] = useState({
    typingUser: null,
    isUserTyping: false,
    groupId: null,
  });
  const messageInput = useRef(null);

  const { groupId } = useParams();
  const { profile } = useContext(UserContext);

  const handleKeyUp = (e) => {
    e.preventDefault();
    socket.emit("user typing", {
      profileName: profile.profileName,
      groupId: groupId,
    });
  };

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
      .catch((err) => console.error(err))
      .finally(() => (messageInput.current.value = ""));
  };


  useEffect(() => {
    let typingTimer;

    socket.on("user typing", ({ profileName, typerGroupId }) => {
      if(typerGroupId == groupId) {
      clearTimeout(typingTimer);
      setTypingUserObj({
        isUserTyping: true,
        typingUser: profileName,
        groupId: typerGroupId,
      });

    typingTimer = setTimeout(() => {
      setTypingUserObj(null);
    }, 1000);
      }

    });



  }, []);

  return (
    <form onSubmit={handleSubmitMsgForm} className={styles.msgForm}>
      {!typingUserObj || typingUserObj.isUserTyping == false ? null : (
        <div className={styles.userTypingCont}>
          <p>{typingUserObj.typingUser} is typing...</p>
        </div>
      )}
      <div className={styles.inputAndBtnCont}>
        <div>
          <label htmlFor="message">Message: </label>
          <textarea
            onChange={handleKeyUp}
            ref={messageInput}
            name="message"
            id="message"
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default MsgForm;
