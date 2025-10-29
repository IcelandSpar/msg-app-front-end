import App from '../src/App.jsx';
import Login from './views/Login.jsx';
import Logout from './views/Logout.jsx';
import Register from './views/Register.jsx';
import UserHome from './views/UserHome.jsx';
import MyProfile from './views/MyProfile.jsx';
import ErrorPage from './views/ErrorPage.jsx';
import ProfilePage from './views/ProfilePage.jsx';
import DefaultHome from './views/DefaultHome.jsx';
import GroupChatMain from './views/GroupChatMain.jsx';
import DirectMessagePage from './views/DirectMessagePage.jsx';


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
    path: '/channel/direct-message/:directMessageGroupId',
    element: <DirectMessagePage/>
  },
  {
    path: '/profile/myprofile',
    element: <MyProfile/>,
  },
  {
    path: '/profile/:profileIdViewing',
    element: <ProfilePage/>
  },
  {
    path: '/*',
    element: <ErrorPage/>,
  }

];

export default routes;