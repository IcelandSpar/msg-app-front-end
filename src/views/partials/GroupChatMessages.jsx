import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { formatDistance } from "date-fns";

import styles from '../../styles/GroupChatMessages.module.css';

const GroupChatMessages = ({ chatMsgs, endOfMsg }) => {


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
              <p>{formatDistance((msg.createdAt), new Date(), { addSuffix: true })}</p>
            </div>
            <p className={styles.chatMsgContent}>{msg.messageContent}</p>
          </li>
        );
      })}
      <li ref={endOfMsg}></li>
    </ul>
  );
};

export default GroupChatMessages;
