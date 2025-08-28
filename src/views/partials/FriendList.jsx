import { useEffect, useState, useContext } from "react";

const FriendList = ({ profile }) => {
  const [ friendList, setFriendList ] = useState(null);


  useEffect(() => {

    const token = sessionStorage.getItem('msgAppToken');

    if(token) {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/friends/get-profile-friend-list/${profile.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
    }


  }, [profile.id]);
  
  return (<>
    <p>Hello world</p>
  </>);
};

export default FriendList;
