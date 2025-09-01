import { useEffect } from 'react';
import { useParams } from 'react-router';

import Navbar from './partials/Navbar.jsx';

const ProfilePage = () => {

  const { profileIdViewing } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem('msgAppToken');
    if(token) {
      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/profile/get-profile/${profileIdViewing}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
    <Navbar/>
    
    </>
  )
};

export default ProfilePage;