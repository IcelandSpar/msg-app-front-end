import { useRef, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../UserContext.jsx";
import styles from "../../styles/DirectMessageForm.module.css";
import { socket } from "../../socket.js";

const DirectMessageForm = ({ endOfMsg, setDirectMessages }) => {
  const messageInput = useRef(null);
  const [typingUserObj, setTypingUserObj] = useState(null);

  const { profile } = useContext(UserContext);
  const { directMessageGroupId } = useParams();

  const handleDirectMessageSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("msgAppToken");
    if (token && profile) {
      const formData = new FormData();
      formData.append("message", messageInput.current.value);
      formData.append("authorId", profile.id);
      formData.append("directMessageGroupId", directMessageGroupId);

      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/direct-message/post-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: new URLSearchParams(formData),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setDirectMessages((chatMsgs) => [
              ...chatMsgs,
              {
                messageContent: messageInput.current.value,
                createdAt: new Date(),
                author: {
                  profileImgFilePath: profile.profileImgFilePath,
                  profileName: profile.profileName,
                },
              },
            ]);

            socket.emit("send message", {
              groupId: directMessageGroupId,
              messageContent: messageInput.current.value,
              profileName: profile.profileName,
              imgPath: profile.profileImgFilePath,
              createdAt: new Date(),
            });
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleUserTypingTextarea = (e) => {
    e.preventDefault();
    socket.emit("user typing", {
      profileName: profile.profileName,
      groupId: directMessageGroupId,
    });
  };

  useEffect(() => {
    let typingTimer;

    socket.on("user typing", ({ profileName, typerGroupId }) => {
      if (typerGroupId == directMessageGroupId) {
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
    <form
      onSubmit={handleDirectMessageSubmit}
      className={styles.messageFormCont}
    >
      <div className={styles.userTypingAndTextareaCont}>

      
      {!typingUserObj || typingUserObj.isUserTyping == false ? null : (
        <div className={styles.userTypingCont}>
          <p>{typingUserObj.typingUser} is typing...</p>
        </div>
      )}
      <div className={styles.textareaAndBtnCont}>
        <div className={styles.labelAndInputCont}>
          <label className={styles.messageLabel} htmlFor="message">
            Message:
          </label>
          <textarea
            onKeyUp={handleUserTypingTextarea}
            placeholder="Type a message!"
            ref={messageInput}
            name="message"
            id="message"
          ></textarea>
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </div>
            </div>

    </form>
  );
};

export default DirectMessageForm;
