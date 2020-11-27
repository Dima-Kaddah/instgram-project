import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useForm from './../hooks/form-hook';
import useHttpClient from './../hooks/http-hook';
import validatePost from '../shared/validatePost';
import { AuthContext } from '../shared/Auth-context.js';

const AddPost = () => {
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const auth = useContext(AuthContext);

  const [values, handleChange, handlerSubmit, errors] = useForm(postSubmitHandler, validatePost);

  const { isLoading, sendRequest } = useHttpClient();

  const history = useHistory();

  async function postSubmitHandler() {

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'instgram-project');
      formData.append('cloud_name', 'cloudinarydb');
      const resdata = await sendRequest('https://api.cloudinary.com/v1_1/cloudinarydb/image/upload', 'POST', formData);
      setImageUrl(resdata.secure_url);
      console.log(resdata.secure_url);

    } catch (err) {
      console.log('cant upload image to cloudinary');
    }

    const url = `${process.env.REACT_APP_BACKEND_URL}/newpost`;

    const body = {
      title: values.title,
      description: values.description,
      image: imageUrl,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth.token },
    };

    let newPost;
    try {
      newPost = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );
      history.push('/');
      console.log(newPost);
    } catch (err) {
      console.log('cant create post');
    }
  }

  return (
    <div className='my-card'>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className='card input-filed post-card'>
          <form onSubmit={handlerSubmit}>
            <input type="text" name='title' placeholder='title' value={values.title || ''} onChange={handleChange} className={`${errors.title ? 'inputErr inputForm' : 'inputForm'}`} />
            <input type="text" name='description' placeholder='description' value={values.description || ''} onChange={handleChange} className={`${errors.description ? 'inputErr inputForm' : 'inputForm'}`} />
            <div className='file-field input-field'>
              <div className='btn #64b5f6 blue darken-1'>
                <span>Upload Image</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} className={`${errors.image ? 'inputErr inputForm' : 'inputForm'}`} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>Add</button>
          </form>
        </div>)}
    </div>
  );
};

export default AddPost;