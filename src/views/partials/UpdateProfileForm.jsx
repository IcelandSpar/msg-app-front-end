import { useState } from "react";

import styles from "../../styles/UpdateProfileForm.module.css";

const UpdateProfileForm = ({
  userProfile,
  handleFormSubmit,
  profileNameInput,
  bioInput,
  handleProfileNameChange,
  handleChangeBioInfo,
  handleFileChange,
}) => {

  return (
    <form onSubmit={handleFormSubmit}>
      <fieldset className={styles.updateProfileFieldset}>
        <legend>Update Your profile!</legend>
        <div className={styles.labelInputCont}>
          <label htmlFor="profileName">Profile Name (Your visible name)</label>
          <input
            onChange={handleProfileNameChange}
            ref={profileNameInput}
            type="text"
            id="profileName"
            name="profileName"
            value={userProfile.profileName}
          />
        </div>
        <div className={styles.labelInputCont}>
          <label htmlFor="bio">Bio:</label>
          <textarea
            ref={bioInput}
            onChange={handleChangeBioInfo}
            type="text"
            value={userProfile.bio}
            name="bio"
            id="bio"
          ></textarea>
        </div>
        <div className={styles.labelInputCont}>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input onChange={handleFileChange} type="file" id="profilePicture" name="profilePicture" />
        </div>
      </fieldset>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;
