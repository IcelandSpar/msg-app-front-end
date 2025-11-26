import { useContext, useEffect, useState, useRef } from "react";

import UserContext from "../UserContext";

import Navbar from "./partials/Navbar.jsx";
import UserProfileInfo from "./partials/UserProfileInfo.jsx";
import UpdateProfileForm from "./partials/UpdateProfileForm.jsx";

import styles from '../styles/MyProfile.module.css';

const MyProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ isProfileUpdateModalOpen, setIsProfileUpdateModalOpen ] = useState(false);
  const [ validationErrors, setValidationErrors ] = useState(null);

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

  
  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  }

  const closeUpdatedModal = (e) => {
    e.preventDefault();
    setIsProfileUpdateModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("msgAppToken");

    if (token) {

      const formData = new FormData();
      formData.append('profileId', profile.id);
      formData.append('profileName', profileNameInput.current.value);
      formData.append('bio', bioInput.current.value);
      formData.append('profilePicture', selectedFile);

      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/profile/update-profile-info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'PUT',
          body: formData,
        }
      )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if(res.success) {
          setIsProfileUpdateModalOpen(true);
        }
        if(res.errors) {
          setValidationErrors(res.errors);
        }
      })
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
    <div className={styles.myProfilePage}>
      <div>
        <Navbar />
      </div>
        {userProfile == null ? null : <div>
          <UserProfileInfo profile={userProfile} />
        </div>}
      <main className={styles.myProfileMain}>
          {!isProfileUpdateModalOpen ? false : (
            <div onClick={closeUpdatedModal} className={styles.updateProfileModalBackground}>
              <div className={styles.updateProfileModalCont}>
                <button className={styles.exitUpdateModal} onClick={closeUpdatedModal} type="button">X</button>
                <p>Your profile was updated!</p>
              </div>
            </div>
          )}
        {userProfile == null ? null : (
          <div>
            {!validationErrors ? null : (
              <div className={styles.errorCont}>
                <h1>Please Fix:</h1>
                <ul className={styles.validationErrorsUl}>
                  {validationErrors.map((err, errIndx) => {
                    return (
                      <li key={`err${errIndx}`}>{err.msg}</li>
                    )
                  })}
                </ul>
              </div>
            )}
            <UpdateProfileForm
              userProfile={userProfile}
              handleFormSubmit={handleFormSubmit}
              profileNameInput={profileNameInput}
              bioInput={bioInput}
              handleProfileNameChange={handleProfileNameChange}
              handleChangeBioInfo={handleChangeBioInfo}
              handleFileChange={handleFileChange}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default MyProfile;
