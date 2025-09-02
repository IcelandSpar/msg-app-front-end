import { useContext, useEffect, useState, useRef } from "react";

import UserContext from "../UserContext";

import Navbar from "./partials/Navbar.jsx";
import UserProfileInfo from "./partials/UserProfileInfo.jsx";
import UpdateProfileForm from "./partials/UpdateProfileForm.jsx";

const MyProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const bioInput = useRef(null);
  const profileNameInput = useRef(null);

  const { profile } = useContext(UserContext);

  const handleProfileNameChange = (e) => {
    e.preventDefault();
    setUserProfile({ ...userProfile, profileName: e.target.value });
  };

  const handleChangeBioInfo = (e) => {
    e.preventDefault();
    setUserProfile({ ...userProfile, bio: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");

    if (token) {

      const formData = new FormData();
      formData.append('profileId', profile.id);
      formData.append('profileName', profileNameInput.current.value);
      formData.append('bio', bioInput.current.value);

      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/profile/update-profile-info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'PUT',
          body: new URLSearchParams(formData),
        }
      )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("msgAppToken");

    if (token) {
      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/profile/get-user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setUserProfile(res.profile);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {userProfile == null ? null : <UserProfileInfo profile={userProfile} />}
        {userProfile == null ? null : (
          <UpdateProfileForm
            userProfile={userProfile}
            handleFormSubmit={handleFormSubmit}
            profileNameInput={profileNameInput}
            bioInput={bioInput}
            handleProfileNameChange={handleProfileNameChange}
            handleChangeBioInfo={handleChangeBioInfo}
          />
        )}
      </main>
    </>
  );
};

export default MyProfile;
