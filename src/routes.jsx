import App from './App.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';

const routes = [
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }

];

export default routes;