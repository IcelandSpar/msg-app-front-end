import App from './App.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import UserHome from './views/UserHome.jsx';
import GroupChatMain from './views/GroupChatMain.jsx';


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
  },
  {
    path: '/channel/myhome',
    element:<UserHome/>
  },
  {
    path: '/channel/group/:groupId',
    element: <GroupChatMain/>
  }

];

export default routes;