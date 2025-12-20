import { useState } from "react";
import he from "he";


import styles from "../../styles/UpdateProfileForm.module.css";
import saveIcon from "../../assets/save_icon.svg";


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
    <form className={styles.updateProfileForm} onSubmit={handleFormSubmit}>
      <fieldset className={styles.updateProfileFieldset}>
        <legend className={styles.updateProfileLegend}>Update Your profile!</legend>
        <div className={styles.labelInputCont}>
          <label htmlFor="profileName">Profile Name (Your visible name)</label>
          <input
            className={styles.profileNameInput}
            onChange={handleProfileNameChange}
            ref={profileNameInput}
            type="text"
            id="profileName"
            name="profileName"
            value={he.decode(userProfile.profileName)}
          />
        </div>
        <div className={styles.labelInputCont}>
          <label htmlFor="bio">Bio:</label>
          <textarea
          rows={5}
            className={styles.bioTextarea}
            ref={bioInput}
            onChange={handleChangeBioInfo}
            type="text"
            value={he.decode(userProfile.bio)}
            name="bio"
            id="bio"
          ></textarea>
        </div>
        <div className={`${styles.labelInputCont} ${styles.filePicLabelInputCont}`}>
          <label className={styles.profilePicFileLabel} htmlFor="profilePicture">Profile Picture:</label>
          <input className={styles.profilePicFileInput} onChange={handleFileChange} type="file" id="profilePicture" name="profilePicture" />
        </div>
      </fieldset>
      <button className={styles.saveProfileBtn} type="submit">
        <p className={styles.saveBtnPara}>Save</p>
        <img className={styles.saveBtnIcon} src={saveIcon} alt="Save profile Info" width="30px"height={"30px"}/>
      </button>
    </form>
  );
};

export default UpdateProfileForm;
