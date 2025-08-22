import { useEffect, useState } from "react";
import { useParams } from "react-router";

const GroupChatMessages = ({chatMsgs}) => {


  return (
    <ul>
      {chatMsgs.map((msg, indx) => {
        return (
          <li key={indx}>
            <img src={`${import.meta.env.VITE_FETCH_BASE_URL}/${msg.imgPath || msg.messageAuthor.profileImgFilePath}`} alt={`${msg.profileName || msg.messageAuthor.profileName}'s profile Image`} height={'25px'} width={'25px'}/>
            <h4>{msg.profileName || msg.messageAuthor.profileName}</h4>
            <p>{msg.messageContent}</p>
          </li>
        )
      })}
    </ul>
  )
};


export default GroupChatMessages;