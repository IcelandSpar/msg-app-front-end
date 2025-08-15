import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [ loginErr, setLoginErr ] = useState(null);

  const usernameInput = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    setLoginErr(null);
    const formData = new FormData();
    formData.append('username', usernameInput.current.value);
    formData.append('password', passwordRef.current.value);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/login`, {
      method: 'POST',
      body: new URLSearchParams(formData),
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.token) {
        localStorage.setItem('msgAppToken', res.token);
        navigate('/')
      } else if (res.message) {
        setLoginErr(res.message);
      }
    })
    .catch(err => console.error(err))
  }


  return (
    <form onSubmit={handleSubmit}>
      { !loginErr ?  null : (
        <div>
          <h3>Please Fix:</h3>
          <p>{loginErr}</p>
        </div>
      )}
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" ref={usernameInput} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password" ref={passwordRef} />
      </div>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
