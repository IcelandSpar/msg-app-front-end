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
    element: <DefaultHome/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/login',
    element: <Login/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/register',
    element: <Register/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/logout',
    element: <Logout/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/channel/myhome',
    element:<UserHome/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/channel/group/:groupId',
    element: <GroupChatMain/>,
    errorElement: <ErrorPage/>,

  },
  {
    path: '/channel/direct-message/:directMessageGroupId',
    element: <DirectMessagePage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/profile/myprofile',
    element: <MyProfile/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/profile/:profileIdViewing',
    element: <ProfilePage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/*',
    element: <ErrorPage/>,
    errorElement: <ErrorPage/>,
  }

];

export default routes;