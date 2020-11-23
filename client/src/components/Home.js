import React from 'react';

const Home = () => {

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