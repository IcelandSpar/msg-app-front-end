import { useRef, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../UserContext.jsx";
import styles from "../../styles/DirectMessageForm.module.css";
import sendIcon from "../../assets/send.png";
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
        .catch((err) => console.error(err))
        .finally(() => {
          setTimeout(() => {
            messageInput.current.value = '';

          }, 1000)
        });
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

    console.log('DM render test')

    return () => {
      socket.off("send message");
      socket.off("user typing");
    }
  }, [directMessageGroupId]);

  return (
    <form
      onSubmit={handleDirectMessageSubmit}
      className={styles.messageFormCont}
    >
      <div className={styles.userTypingAndTextareaCont}>

      
          {!typingUserObj || typingUserObj.isUserTyping == false ? null : (
            <div className={styles.userTypingCont}>
              <p>{typingUserObj.typingUser} is typing</p>
              <div className={styles.dotOne}></div>
              <div className={styles.dotTwo}></div>
              <div className={styles.dotThree}></div>
            </div>
          )}
      <div className={styles.textareaAndBtnCont}>
        <div className={styles.labelAndInputCont}>
          <label className={styles.messageLabel} htmlFor="message">
            Message:
          </label>
          <textarea
          rows={3}
          cols={50}
          className={styles.msgTextarea}
            onKeyUp={handleUserTypingTextarea}
            placeholder="Type a message!"
            ref={messageInput}
            name="message"
            id="message"
          ></textarea>
        </div>
        <div>
          <button className={styles.msgFormSendBtn} type="submit"><img className={styles.sendMsgIcon} src={sendIcon} alt="send message" width={'30px'} height={'30px'}/></button>
        </div>
      </div>
            </div>

    </form>
  );
};

export default DirectMessageForm;
