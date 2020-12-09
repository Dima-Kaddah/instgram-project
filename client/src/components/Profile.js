import React, { useState, useEffect, useContext } from 'react';
import useHttpClient from './../hooks/http-hook';
import AuthContext from '../shared/Auth-context.js';

const Profile = () => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/profile`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token,
          }
        );
        setPosts(responseData.profile);
        console.log(responseData.profile);
      } catch (err) { }
    };
    fetchPost();
  }, [sendRequest]);

  return (
    <div className='pro'>
      { isLoading && <div>Loading...</div>}
      <div className='flexIt'>
        <div>
          <img className='profileImg' src='https://images.unsplash.com/photo-1592446660312-150a57429e79?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTU2fHxwZXJzb258ZW58MHwyfDB8&auto=format&fit=crop&w=800&q=60' /></div>
        <div>
          <h4>{auth.name}</h4>
          <div className='flexContent'>
            <h6>20 posts</h6>
            <h6>162 followers</h6>
            <h6>168 following</h6>
          </div>
        </div>
      </div>

      <div className='gallery'>
        {
          posts.map(post => {
            return (
              <img key={post._id} className='item' src={post.image} alt={post.title} />);
          })
        }

      </div>

    </div>
  );
};
export default Profile;