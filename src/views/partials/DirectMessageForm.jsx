import { useRef, useContext } from "react";
import { useParams } from "react-router";
import UserContext from '../../UserContext.jsx';
import styles from "../../styles/DirectMessageForm.module.css";

const DirectMessageForm = () => {
  const messageInput = useRef(null);

  const { profile } = useContext(UserContext);
  const { directMessageGroupId } = useParams();

  const handleDirectMessageSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('msgAppToken');
    if(token && profile) {
      const formData = new FormData();
      formData.append('message', messageInput.current.value);
      formData.append('authorId', profile.id);
      formData.append('directMessageGroupId', directMessageGroupId);

      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/direct-message/post-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: new URLSearchParams(formData),
      }).then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    }
  }

  return (
    <form onSubmit={handleDirectMessageSubmit} className={styles.messageFormCont}>
      <div className={styles.labelAndInputCont}>
        <label className={styles.messageLabel} htmlFor="message">
          Message:
        </label>
        <textarea ref={messageInput} name="message" id="message"></textarea>
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default DirectMessageForm;
