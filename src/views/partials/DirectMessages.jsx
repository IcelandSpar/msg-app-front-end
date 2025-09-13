import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from '../../styles/DirectMessages.module.css'; 

const DirectMessages = ({directMessages}) => {
  return (
    <div>
        <ul className={styles.directMessageUl}>
          {directMessages.map((msg, indx) => {
            return (<li key={msg.id} >
              <p className={styles.profileName}>{msg.author.profileName}</p>
              <p>{msg.messageContent}</p>
            </li>)
          })}
        </ul>
    </div>
  )
};

export default DirectMessages;