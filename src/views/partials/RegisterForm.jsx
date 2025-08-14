import { useRef } from 'react';

const RegisterForm = () => {
  const usernameInput = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', usernameInput.current.value);
    formData.append('password', passwordRef.current.value);

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/register`, {
      method: 'POST',
      body: new URLSearchParams(formData),
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch(err => console.error(err))
  }


  return (
    <form onSubmit={handleSubmit} action={`${import.meta.env.VITE_FETCH_BASE_URL}/register`} method="POST">
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" ref={usernameInput}/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password" ref={passwordRef}/>
      </div>
      <button onClick={handleSubmit} type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
