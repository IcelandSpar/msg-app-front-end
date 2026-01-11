import { useRef, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { socket } from "../../socket";
import he from "he";

import CharacterCount from "./CharacterCount.jsx";
import UserContext from "../../UserContext";
import addImgIcon from "../../assets/add_photo.svg";

import styles from "../../styles/MsgForm.module.css";
import sendMsgIcon from "../../assets/send.png";
const MsgForm = ({ setChatMsgs, endOfMsg, setMsgFormErrors }) => {
  const [typingUserObj, setTypingUserObj] = useState({
    typingUser: null,
    isUserTyping: false,
    groupId: null,
  });
  const [fileInfo, setFileInfo] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [characterLimitErr, setCharacterLimitErr] = useState(false);
  const messageInput = useRef(null);
  const wordLimitCont = useRef(null);
  const userTypingFadeTimeout = useRef(null);
  const imgFile = useRef(null);

  const { groupId } = useParams();
  const { profile } = useContext(UserContext);

  const handleFileChange = (e) => {
    e.preventDefault();
    setFileInfo(e.target.files[0]);
  };

  const handleKeyUp = (e) => {
    e.preventDefault();

    if (messageInput.current.value.length > 2000) {
      setCharacterLimitErr(true);
    } else {
      setCharacterLimitErr(false);
    }

    clearTimeout(userTypingFadeTimeout.current);
    setIsUserTyping(true);

    setCharacterCount(e.target.value.length);
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

    if (messageInput.current.value.length > 2000) {
      setCharacterLimitErr(true);
    } else {
      const token = sessionStorage.getItem("msgAppToken");

      const formData = new FormData();
      formData.append("messageContent", messageInput.current.value);
      formData.append("groupId", groupId);
      formData.append("authorId", profile.id);
      formData.append("msgImg", fileInfo);

      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/chat/post-chat-msg`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            setMsgFormErrors(res.errors);
          } else {
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
            setFileInfo(null);
          }
        })
        .catch((err) => console.error(err));
      setTimeout(() => {
        endOfMsg.current?.scrollIntoView({ behavior: "smooth" });
        messageInput.current.value = "";
      }, 1000);
    }
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
            Message:
          </label>
          {!fileInfo ? null :  <span className={styles.fileNamePreview} title={fileInfo.name}>Image Selected: {fileInfo.name}</span>}
          {!typingUserObj || typingUserObj.isUserTyping == false ? null : (
            <div className={styles.userTypingCont}>
              <p>{he.decode(typingUserObj.typingUser)} is typing</p>
              <div className={styles.dotOne}></div>
              <div className={styles.dotTwo}></div>
              <div className={styles.dotThree}></div>
            </div>
          )}
          {!characterLimitErr ? null : (
            <p className={styles.characterLimitPara}>
              Character limit surpassed, please correct
            </p>
          )}
          <div className={styles.textAreaMsgBtnCont}>
            <div className={styles.textareaAndCharacterCont}>
              <textarea
                style={{
                  border: `${!characterLimitErr ? "none" : "3px solid red"}`,
                }}
                className={styles.msgTextarea}
                onChange={handleKeyUp}
                ref={messageInput}
                name="message"
                id="message"
                placeholder="Type a message!"
                rows={3}
                cols={35}
                maxLength={2000}
              ></textarea>
              <CharacterCount
                wordLimitCont={wordLimitCont}
                characterCount={characterCount}
                isUserTyping={isUserTyping}
              />
            </div>
            <div className={styles.formBtnsCont}>
              <label className={styles.ImglabelTurnedBtn} htmlFor="msgImg">
                <img className={styles.addImgIcon} src={addImgIcon} alt="add image" />
              </label>
              <input ref={imgFile} onChange={handleFileChange} className={styles.hideInput} type="file" id="msgImg" hidden/>
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
      </div>
    </form>
  );
};

export default MsgForm;
