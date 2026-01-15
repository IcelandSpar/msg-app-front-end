import { useParams } from "react-router";
import { socket } from "../../socket.js";
import { useRef, useContext, useEffect, useState } from "react";
import he from "he";

import CharacterCount from "./CharacterCount.jsx";
import UserContext from "../../UserContext.jsx";

import styles from "../../styles/DirectMessageForm.module.css";
import sendIcon from "../../assets/send.png";
import addImgIcon from "../../assets/add_photo.svg";

const DirectMessageForm = ({
  endOfMsg,
  setDirectMessages,
  setValidationErrors,
}) => {
  const imgFile = useRef(null);
  const messageInput = useRef(null);
  const [typingUserObj, setTypingUserObj] = useState(null);

  const [characterCount, setCharacterCount] = useState(0);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [ fileInfo, setFileInfo ] = useState(null);
  const wordLimitCont = useRef(null);
  const userTypingFadeTimeout = useRef(null);

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
      formData.append("msgImg", fileInfo);

      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/direct-message/post-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            setValidationErrors(res.errors);
          } else if (res.success) {
            setDirectMessages((chatMsgs) => [
              ...chatMsgs,
              {
                messageContent: messageInput.current.value,
                createdAt: new Date(),
                attatchedImagePath: res.message.attatchedImagePath,
                author: {
                  profileName: profile.profileName,
                  profileImgFilePath: profile.profileImgFilePath,
                },
              },
            ]);

            socket.emit("send message", {
              groupId: directMessageGroupId,
              messageContent: messageInput.current.value,
              profileName: profile.profileName,
              imgPath: profile.profileImgFilePath,
              attatchedImagePath: res.message ? res.message.attatchedImagePath : null,
              createdAt: new Date(),
            });
            setFileInfo(null);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setTimeout(() => {
            messageInput.current.value = "";
          }, 1000);
        });
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFileInfo(e.target.files[0]);
  };

  const handleUserTypingTextarea = (e) => {
    e.preventDefault();
    clearTimeout(userTypingFadeTimeout.current);
    setIsUserTyping(true);

    setCharacterCount(e.target.value.length);

    socket.emit("user typing", {
      profileName: profile.profileName,
      groupId: directMessageGroupId,
    });

    userTypingFadeTimeout.current = setTimeout(() => {
      setIsUserTyping(false);
      clearTimeout(userTypingFadeTimeout.current);
    }, 2000);
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

    console.log("DM render test");

    return () => {
      socket.off("send message");
      socket.off("user typing");
    };
  }, [directMessageGroupId]);

  return (
    <form
      onSubmit={handleDirectMessageSubmit}
      className={styles.messageFormCont}
    >
      <div className={styles.userTypingAndTextareaCont}>
        {!fileInfo ? null :  <span className={styles.fileNamePreview} title={fileInfo.name}>Image Selected: {fileInfo.name}</span>}
        {!typingUserObj || typingUserObj.isUserTyping == false ? null : (
          <div className={styles.userTypingCont}>
            <p>{he.decode(typingUserObj.typingUser)} is typing</p>
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
            <div className={styles.textareaAndCharacterCont}>
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
              <CharacterCount
                characterCount={characterCount}
                isUserTyping={isUserTyping}
                wordLimitCont={wordLimitCont}
              />
            </div>
          </div>
          <div className={styles.formBtnsCont}>
            <label className={styles.ImglabelTurnedBtn} htmlFor="msgImg">
              <img
                className={styles.addImgIcon}
                src={addImgIcon}
                alt="add image"
              />
            </label>
            <input
              ref={imgFile}
              onChange={handleFileChange}
              className={styles.hideInput}
              type="file"
              id="msgImg"
              hidden
            />
            <button className={styles.msgFormSendBtn} type="submit">
              <img
                className={styles.sendMsgIcon}
                src={sendIcon}
                alt="send message"
                width={"30px"}
                height={"30px"}
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DirectMessageForm;
