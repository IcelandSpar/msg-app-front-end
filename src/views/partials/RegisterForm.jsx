import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router';

import styles from '../../styles/RegisterForm.module.css';

const RegisterForm = () => {
  const [ registerErr, setRegisterErr ] = useState(null);
  const [ selectedFile, setSelectedFile ] = useState(null);

  const profileNameInput = useRef(null);
  const bioInput = useRef(null);
  const profilePictureInput = useRef(null);

  const usernameInput = useRef(null);
  const passwordRef = useRef(null);
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    setRegisterErr(null);
    e.preventDefault();
    const formData = new FormData();

    formData.append('profileName', profileNameInput.current.value);
    formData.append('bio', bioInput.current.value);
    formData.append('profilePicture', selectedFile);


    formData.append('username', usernameInput.current.value);
    formData.append('password', passwordRef.current.value);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/register`, {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if(res.message) {
        setRegisterErr(res.message);
        scrollTo({top: 0, behavior: 'smooth'});

        return res
      } else if(res.success) {
        navigate('/login')
      }
    })
    .catch(err => {
      console.error(err);
    })
  }


  return (
    <form className={styles.registerFormCont} onSubmit={handleSubmit} encType='multipart/form-data' action={`${import.meta.env.VITE_FETCH_BASE_URL}/register`}>
      {!registerErr ? null : (
        <div className={styles.errorCont}>
          <h3 className={styles.errorHeading}>Please fix:</h3>
          <p className={styles.errorMsg}>{registerErr}</p>
        </div>
      )}
      <fieldset className={styles.registerFieldset}>
        <legend className={styles.registerLegends}>Profile Info</legend>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="profileName">Profile Name:</label>
          <input ref={profileNameInput} type="text" id='profileName' name='profileName'/>
        </div>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="bio">Bio:</label>
          <textarea ref={bioInput} type="text" id='bio' name='bio' rows={4}></textarea>
        </div>
        <div className={styles.labelAndInputCont}>
          <label className={styles.registerFileLabel} htmlFor="profileImg">Profile Picture:</label>
          <input className={styles.registerFileInput} onChange={handleFileChange} ref={profilePictureInput} type="file" name="profileImg" id="profileImg" />
        </div>
      </fieldset>
      <fieldset className={styles.registerFieldset}>
        <legend className={styles.registerLegends}>Credentials</legend>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" ref={usernameInput}/>
        </div>
        <div className={styles.labelAndInputCont}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" ref={passwordRef}/>
        </div>
      </fieldset>
      <div className={styles.createProfileBtnCont}>
        <Link to={'/login'}>Already have an account?</Link>
      <button className={styles.createProfileBtn} type="submit">Create Profile</button>
      </div>
    </form>
  );
};

export default RegisterForm;
