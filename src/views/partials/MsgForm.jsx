import { useParams } from "react-router";
import { socket } from "../../socket";

import { useRef } from 'react';

const MsgForm = ({setChatMsgs}) => {

  const messageInput = useRef(null);

  const { groupId } = useParams();

  const handleSubmitMsgForm = (e) => {
    e.preventDefault();
    setChatMsgs((chatMsgs) => [...chatMsgs, { messageContent: messageInput.current.value }])

    socket.emit('send message', { 
      groupId: groupId,
      message: messageInput.current.value
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