import { useEffect, useState } from "react";
import { useParams } from "react-router";

const GroupChatMessages = () => {

  const [ chatMsgs, setChatMsgs ] = useState(null);

  const { groupId } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem('msgAppToken');
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/get-group-chat-msgs/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  }, [])

  return (
    <ul>
      <li>A message</li>
    </ul>
  )
};


export default GroupChatMessages;