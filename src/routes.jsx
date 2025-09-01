import App from '../src/App.jsx';
import Login from './views/Login.jsx';
import Logout from './views/Logout.jsx';
import Register from './views/Register.jsx';
import UserHome from './views/UserHome.jsx';
import ProfilePage from './views/ProfilePage.jsx';
import DefaultHome from './views/DefaultHome.jsx';
import GroupChatMain from './views/GroupChatMain.jsx';


const routes = [
  {
    path: '/',
    element: <DefaultHome/>
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
    path: '/logout',
    element: <Logout/>
  },
  {
    path: '/channel/myhome',
    element:<UserHome/>
  },
  {
    path: '/channel/group/:groupId',
    element: <GroupChatMain/>
  },
  {
    path: '/profile/:profileIdViewing',
    element: <ProfilePage/>
  }

];

export default routes;