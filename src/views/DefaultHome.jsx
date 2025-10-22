import Navbar from './partials/Navbar.jsx';

import styles from '../styles/DefaultHome.module.css';
import groupTableImg from "../assets/group_chat_home_art.svg";
import msgInBottleIcon from "../assets/msg_in_bottle.svg";


const DefaultHome = () => {
  return (
    <div className={styles.defaultHomePage}>
    <Navbar/>
    <main className={styles.defaultHomeMainCont}>
      <div className={styles.imgAndParaCont}>
        <p className={styles.imgDescriptionPara}>Send Messages instantly, say goodbye to waiting!</p>
        <a className={styles.anchorTagCont} href="https://pixabay.com/users/skorec-16694100/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7048053"><img className={styles.msgInBottleIcon} src={msgInBottleIcon} alt="Bottles in water with messages" width={'300px'} height={'300px'}/></a>
      </div>
      <div className={`${styles.imgAndParaCont}`}>
        <a className={styles.anchorTagCont}  href={"https://pixabay.com/users/poli_-4882926/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8320174"}><img src={groupTableImg} alt="Group talking" width={'300px'} height={'300px'}/></a>
        <p className={styles.imgDescriptionPara}>Create group chats for groups of friends!</p>
      </div>

    </main>
    </div>
  )
};

export default DefaultHome;