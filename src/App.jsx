import { socket } from './socket';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const btnHandler = (e) => {
    e.preventDefault();
    socket.emit('button press');
  
  }

  useEffect(() => {

    socket.on('connection', (msg) => {
      console.log(msg)
    })

    socket.on('button press', (msg) => {
      console.log(msg)
    });

    socket.on('user left', (msg) => {
      console.log(msg)
    })

    const token = localStorage.getItem('msgAppToken');

    if(token) {
    fetch(`http://localhost:3000`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
    }


  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={btnHandler}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
