import React from 'react';

const AddPost = () => {

  return (
    <div className='my-card'>
      <div className='card input-filed post-card'>
        <input type='text' placeholder='title'></input>
        <input type='text' placeholder='description'></input>
        <div className='file-field input-field'>
          <div className='btn #64b5f6 blue darken-1'>
            <span>Upload Image</span>
            <input type='file' />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>Add</button>
      </div>
    </div>
  );
};
export default AddPost;