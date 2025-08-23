import { useEffect, useState } from "react";
import { useParams } from "react-router";

import styles from '../../styles/GroupChatMessages.module.css';

const GroupChatMessages = ({ chatMsgs }) => {
  return (
    <ul className={styles.chatMsgsUl}>
      {chatMsgs.map((msg, indx) => {
        return (
          <li className={styles.chatMsgsLi} key={indx}>
            <div className={styles.profileImgAndNameCont}>
              <img
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
              <h4>{msg.profileName || msg.messageAuthor.profileName}</h4>
            </div>
            <p className={styles.chatMsgContent}>{msg.messageContent}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default GroupChatMessages;
