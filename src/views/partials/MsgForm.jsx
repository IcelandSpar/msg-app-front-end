import { socket } from "../../socket";
import { useRef, useContext } from 'react';
import { useParams } from "react-router";

import UserContext from "../../UserContext";

const MsgForm = ({setChatMsgs}) => {

  const messageInput = useRef(null);

  const { groupId } = useParams();
  const { profile } = useContext(UserContext);

  const handleSubmitMsgForm = (e) => {
    e.preventDefault();
    setChatMsgs((chatMsgs) => [...chatMsgs, {  profileName: profile.profileName, messageContent: messageInput.current.value }])

    socket.emit('send message', { 
      groupId: groupId,
      message: messageInput.current.value,
      profileName: profile.profileName,
    })
  }

  return (
    <form onSubmit={handleSubmitMsgForm}>
      <div>
        <label htmlFor="message">Message: </label>
        <textarea ref={messageInput} name="message" id="message"></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  )
};

export default MsgForm;