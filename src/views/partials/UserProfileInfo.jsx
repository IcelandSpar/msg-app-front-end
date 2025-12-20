import { format } from 'date-fns';
import he from "he";


import styles from '../../styles/UserProfileInfo.module.css';



const UserProfileInfo = ({profile}) => {

  return (
    <section className={styles.userProfileInfoCont}>
      <div className={styles.imgAndProfileName}>
        <img className={styles.profileImg} src={`${import.meta.env.VITE_FETCH_BASE_URL}/${profile.profileImgFilePath}`} alt={`${profile.profileName}'s Profile Picture`} width={'100px'} height={'100px'}/>
        <h1>{he.decode(profile.profileName)}</h1>
      </div>
      <div className={styles.bioAndJoinCont}>
        <p className={styles.profileBio}>{he.decode(profile.bio)}</p>
        <p className={styles.joinDatePara}>Joined: {format(profile.joined, 'MMM-d-yyyy')}</p>
      </div>
    </section>
  )
};

export default UserProfileInfo;