import { useRef, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { socket } from "../../socket";

import UserContext from "../../UserContext";

import styles from "../../styles/MsgForm.module.css";
import sendMsgIcon from "../../assets/send.png";

const MsgForm = ({ setChatMsgs, endOfMsg }) => {
  const [typingUserObj, setTypingUserObj] = useState({
    typingUser: null,
    isUserTyping: false,
    groupId: null,
  });
  const [ characterCount, setCharacterCount ] = useState(0);
  const [ isUserTyping, setIsUserTyping ] = useState(false);
  const messageInput = useRef(null);
  const wordLimitCont = useRef(null);
  const userTypingFadeTimeout = useRef(null);

  const { groupId } = useParams();
  const { profile } = useContext(UserContext);


  const handleKeyUp = (e) => {


    e.preventDefault();
    clearTimeout(userTypingFadeTimeout.current);
    setIsUserTyping(true);

    setCharacterCount(e.target.value.length)
    socket.emit("user typing", {
      profileName: profile.profileName,
      groupId: groupId,
    });
    userTypingFadeTimeout.current = setTimeout(() => {
      setIsUserTyping(false);
      clearTimeout(userTypingFadeTimeout.current);
    }, 2000);


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
            createdAt: new Date(),
          },
        ]);

        socket.emit("send message", {
          groupId: groupId,
          messageContent: messageInput.current.value,
          profileName: profile.profileName,
          imgPath: profile.profileImgFilePath,
          createdAt: new Date(),
        });
      })
      .catch((err) => console.error(err))
      .finally(() => {});

    setTimeout(() => {
      endOfMsg.current?.scrollIntoView({ behavior: "smooth" });
      messageInput.current.value = "";
    }, 1000);
  };

  useEffect(() => {
    let typingTimer;

    socket.on("user typing", ({ profileName, typerGroupId }) => {
      if (typerGroupId == groupId) {
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

    return () => {
      socket.off("user typing");
    };
  }, []);

  return (
    <form onSubmit={handleSubmitMsgForm} className={styles.msgForm}>
      <div className={styles.inputAndBtnCont}>
        <div className={styles.userTypingAndMsgTextareaCont}>
          <label className={styles.msgLabelHidden} htmlFor="message">
            Message:{" "}
          </label>
          {!typingUserObj || typingUserObj.isUserTyping == false ? null : (
            <div className={styles.userTypingCont}>
              <p>{typingUserObj.typingUser} is typing</p>
              <div className={styles.dotOne}></div>
              <div className={styles.dotTwo}></div>
              <div className={styles.dotThree}></div>
            </div>
          )}
          <div className={styles.textAreaMsgBtnCont}>
            <div className={styles.textareaAndCharacterCont}>
              <textarea
                className={styles.msgTextarea}
                onChange={handleKeyUp}
                ref={messageInput}
                name="message"
                id="message"
                placeholder="Type a message!"
                rows={3}
                cols={35}
              ></textarea>
              <div ref={wordLimitCont} className={`${styles.characterCountCont} ${isUserTyping ? `${styles.fadeOut}` : `${styles.fadeIn}`}`}>{characterCount}/2000</div>
            </div>
            <button className={styles.msgFormSendBtn} type="submit">
              <img
                className={styles.sendMsgIcon}
                src={sendMsgIcon}
                alt="send message"
                width={"25px"}
                height={"25px"}
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MsgForm;
