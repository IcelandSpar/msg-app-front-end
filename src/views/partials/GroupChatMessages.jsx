import { useEffect, useState } from "react";
import { useParams } from "react-router";

const GroupChatMessages = ({chatMsgs}) => {


  return (
    <ul>
      {chatMsgs.map((item, indx) => {
        return (
          <li key={indx}>
            <p>{item.messageContent}</p>
          </li>
        )
      })}
    </ul>
  )
};


export default GroupChatMessages;