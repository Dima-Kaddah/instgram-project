import React, { useState, useEffect, useContext } from 'react';
import useHttpClient from './../hooks/http-hook';
import AuthContext from '../shared/Auth-context.js';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();


  const [posts, setPosts] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/allposts`,
        );
        setPosts(responseData.posts);
        console.log(responseData);
      } catch (err) { }
    };
    fetchPost();
  }, []);

  //like post
  const likePost = async (id) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/like`;

    const body = {
      postId: id,
    };

    const request = {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth.token },
    };

    let likeThisPost;
    try {
      likeThisPost = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );
      console.log(likeThisPost);
      const newData = posts.map(post => {
        if (post._id === likeThisPost.id) {
          return likeThisPost;
        } else {
          return post;
        }
      });
      setPosts(newData);
      history.push('/post');
    } catch (err) { }

  };

  //unlike post
  const unLikePost = async (id) => {

    const url = `${process.env.REACT_APP_BACKEND_URL}/unlike`;

    const body = {
      postId: id,
    };

    const request = {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth.token },
    };

    let unLikeThisPost;
    try {
      unLikeThisPost = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );
      const newData = posts.map(post => {
        if (post._id === unLikeThisPost.id) {
          return unLikeThisPost;
        } else { return post; }
      });
      setPosts(newData);
      history.push('/post');
    } catch (err) { }

  };
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
              {post.likes.includes(auth.userId)
                ? <i className='material-icons like' onClick={() => { unLikePost(post._id); }} style={{ color: '#e53935' }}>favorite</i>
                : <i class='material-icons like' onClick={() => { likePost(post._id); }}>favorite_border</i>
              }

              <h6>{post.likes.length === 1 ? `${post.likes.length} Like` : `${post.likes.length} Likes`}</h6>
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