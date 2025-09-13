import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Navbar from './partials/Navbar.jsx';
import DirectMessages from './partials/DirectMessages.jsx';
import DirectMessageForm from './partials/DirectMessageForm.jsx';

const DirectMessagePage = () => {
  const [ directMessages, setDirectMessages ] = useState(null);

  const { directMessageGroupId } = useParams();


  useEffect(() => {
    
    const token = sessionStorage.getItem('msgAppToken');

    if(token, directMessageGroupId) {
      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/direct-message/get-direct-messages/${directMessageGroupId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'GET'
      })
      .then((res) => res.json())
      .then((res) => {
        setDirectMessages(res.directMessages);
      })
      .catch((err) => console.error(err));
    }


  }, [directMessageGroupId]);

  return (
    <>
    <Navbar/>
    <main>
      {directMessages != null ? <DirectMessages directMessages={directMessages}/> : null}
      <DirectMessageForm/>
    </main>
    </>
  )
};

export default DirectMessagePage;