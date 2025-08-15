import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const RegisterForm = () => {
  const [ registerErr, setRegisterErr ] = useState(null);

  const usernameInput = useRef(null);
  const passwordRef = useRef(null);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setRegisterErr(null);
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', usernameInput.current.value);
    formData.append('password', passwordRef.current.value);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/register`, {
      method: 'POST',
      body: new URLSearchParams(formData),
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.message) {
        setRegisterErr(res.message);
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
    <form onSubmit={handleSubmit} action={`${import.meta.env.VITE_FETCH_BASE_URL}/register`}>
      {!registerErr ? null : (
        <div>
          <h3>Please fix:</h3>
          <p>{registerErr}</p>
        </div>
      )}
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" ref={usernameInput}/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password" ref={passwordRef}/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
