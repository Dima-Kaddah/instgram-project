import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useHttpClient from './../hooks/http-hook';
import AuthContext from '../shared/Auth-context.js';

const Home = () => {
  const [post, setPosts] = useState();
  const { postId } = useParams();

  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPost = async () => {
      const request = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth.token },
      };

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/allposts`
          , request.headers
        );
        setPosts(responseData);
      } catch (err) { }
    };
    fetchPost();
  }, [sendRequest]);

  return (
    <div className='home'>
      <div className='card home-card'>
        <h5>Danila</h5>
        <div className='card-image'>
          <img src='https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyfGVufDB8MHwwfA%3D%3D&auto=format&fit=crop&w=800&q=60' />
        </div>
        <div className='card-content'>
          <i className='material-icons' style={{ color: 'red' }}>favorite</i>
          <h6>title</h6>
          <p>this the post </p>
          <input type='text' placeholder='add a comment' />
        </div>
      </div>
    </div>
  );
};
export default Home;