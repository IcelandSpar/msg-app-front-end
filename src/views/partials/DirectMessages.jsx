import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { formatDistance } from 'date-fns';
import styles from '../../styles/DirectMessages.module.css'; 

const DirectMessages = ({directMessages}) => {

  const navigate = useNavigate();

  const handleClickOnProfileImg = (e, profileId) => {
    e.preventDefault();
    navigate(`/profile/${profileId}`);
  }

  return (
    <div>
        <ul className={styles.directMessageUl}>
          {directMessages.map((msg, indx) => {
            return (<li key={msg.id} >
              <div className={styles.msgProfileCont}>
                <img onClick={(e) => handleClickOnProfileImg(e, msg.author.id)} className={styles.msgProfilePicture} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${msg.author.profileImgFilePath}`} alt={`${msg.author.profileName}'s Profile Picture`} width={'25px'} height={'25px'}/>
                <p className={styles.profileName}>{msg.author.profileName}</p>
                <p>{formatDistance((msg.createdAt), new Date(), { addSuffix: true })}</p>
              </div>
              <p>{msg.messageContent}</p>
            </li>)
          })}
        </ul>
    </div>
  )
};

export default DirectMessages;