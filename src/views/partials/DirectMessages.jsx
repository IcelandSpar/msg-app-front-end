import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { formatDistance } from 'date-fns';
import he from "he";

import styles from '../../styles/DirectMessages.module.css'; 

const DirectMessages = ({directMessages, endOfMsg}) => {

  const navigate = useNavigate();

  const handleClickOnProfileImg = (e, profileId) => {
    e.preventDefault();
    navigate(`/profile/${profileId}`);
  };

  useEffect(() => {
    let scrollDownTimeout;

      scrollDownTimeout = setTimeout(() => {
        endOfMsg.current?.scrollIntoView({ behavior: 'smooth' });
        clearTimeout(scrollDownTimeout);
      }, 1000)
  }, [endOfMsg]);

  return (
    <div className={styles.messagesCont}>
        {directMessages && directMessages.length == 0 ? (
          <div className={styles.noMsgsCont}>
            <p>No Messages yet...</p>
            <p>(⌒ω⌒)</p>
            <p>Send a message!</p>
          </div>
        ) : null}
        <ul className={styles.directMessageUl}>
          {directMessages.map((msg, indx) => {
            return (<li key={indx} className={styles.msgLi}>
              <div className={styles.msgProfileCont}>
                <img onClick={(e) => handleClickOnProfileImg(e, msg.author.id)} className={styles.msgProfilePicture} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${msg.author.profileImgFilePath}`} alt={`${msg.author.profileName}'s Profile Picture`} width={'25px'} height={'25px'}/>
                <p className={styles.profileName}>{he.decode(msg.author.profileName)}</p>
                <p>{formatDistance((msg.createdAt), new Date(), { addSuffix: true })}</p>
              </div>
              <p className={styles.chatMsgContent}>{he.decode(msg.messageContent)}</p>
            </li>)
          })}
        <li ref={endOfMsg}></li>

        </ul>
    </div>
  )
};

export default DirectMessages;