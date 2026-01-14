import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { formatDistance } from "date-fns";
import he from "he";

import MessageImage from "./MessageImage.jsx";

import styles from '../../styles/GroupChatMessages.module.css';

const GroupChatMessages = ({ chatMsgs, endOfMsg }) => {

  const navigate = useNavigate();

  const handleClickOnUserProfile = (e, profileId) => {
    e.preventDefault();
    navigate(`/profile/${profileId}`);
  };
  
  return (
    <ul className={styles.chatMsgsUl}>
      {chatMsgs.map((msg, indx) => {
        return (
          <li className={styles.chatMsgsLi} key={indx}>
            <div className={styles.profileImgAndNameCont}>
              <img
              onClick={(e) => handleClickOnUserProfile(e, msg.authorId)}
              className={styles.chatProfileImg}
                src={`${import.meta.env.VITE_FETCH_BASE_URL}/${
                  msg.imgPath || msg.messageAuthor.profileImgFilePath
                }`}
                alt={`${
                  msg.profileName || msg.messageAuthor.profileName
                }'s profile Image`}
                height={"25px"}
                width={"25px"}
              />
              <h4>{he.decode(msg.profileName || msg.messageAuthor.profileName)}</h4>
              <p>{formatDistance((msg.createdAt), new Date(), { addSuffix: true })}</p>
            </div>
            <p className={styles.chatMsgContent}>{he.decode(msg.messageContent)}</p>
            {!msg.attatchedImagePath ? null : (
              <MessageImage msg={msg}/>
            )}
          </li>
        );
      })}
      <li ref={endOfMsg}></li>
    </ul>
  );
};

export default GroupChatMessages;
