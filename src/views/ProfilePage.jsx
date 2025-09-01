import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Navbar from './partials/Navbar.jsx';
import UserProfileInfo from './partials/UserProfileInfo.jsx';

const ProfilePage = () => {
  const [ profile, setProfile ] = useState(null);

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
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
    <Navbar/>
    {profile == null ? null : <UserProfileInfo profile={profile}/>}
    </>
  )
};

export default ProfilePage;