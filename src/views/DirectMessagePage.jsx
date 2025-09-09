import Navbar from './partials/Navbar.jsx';
import DirectMessages from './partials/DirectMessages.jsx';
import DirectMessageForm from './partials/DirectMessageForm.jsx';

const DirectMessagePage = () => {
  return (
    <>
    <Navbar/>
    <main>
      <DirectMessages/>
      <DirectMessageForm/>
    </main>
    </>
  )
};

export default DirectMessagePage;