import React, { useState, useEffect } from 'react';
import useHttpClient from './../hooks/http-hook';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/allposts`,
        );
        setPosts(responseData.posts);
        console.log(responseData.posts);
      } catch (err) { }
    };
    fetchPost();
  }, [sendRequest]);

  return (
    <div className='home'>
      { isLoading && <div>Loading...</div>}
      {!isLoading && posts && posts.map(post => {
        return (
          <div className='card home-card'>
            <h5>{post.postedBy.name}</h5>
            <div className='card-image'>
              <img src={post.image} />
            </div>
            <div className='card-content'>
              <i className='material-icons' style={{ color: 'red' }}>favorite</i>
              <h6>{post.title}</h6>
              <p>{post.description}</p>
              <input type='text' placeholder='add a comment' />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;