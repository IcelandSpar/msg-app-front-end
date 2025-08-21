import { useEffect, useState } from "react";
import { useParams } from "react-router";

const GroupChatMessages = ({chatMsgs}) => {


  return (
    <ul>
      {chatMsgs.map((msg, indx) => {
        return (
          <li key={indx}>
            {console.log(msg)}
            <h4>{msg.profileName}</h4>
            <p>{msg.messageContent}</p>
          </li>
        )
      })}
    </ul>
  )
};


export default GroupChatMessages;