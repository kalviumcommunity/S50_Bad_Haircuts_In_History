import React, { useState } from 'react';
import "./AddNewPost.css";

function AddNewPost({ User_Name }) {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [extraInput, setExtraInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      title: title,
      content: caption,
      media_url: imageUrl,
      extraInput: extraInput,
      User_Name: User_Name 
    };

    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log('Post added successfully to the database.');
        resetForm();
        window.location.href = '/PostArea';
      } else {
        console.error('Error adding post to the database.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCaption('');
    setImageUrl('');
    setExtraInput('');
  };

  return (
    <div className='sin'>
      <div className='container'>  
        <h1>Add New Post</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />

          <label htmlFor="caption">Caption:</label>
          <textarea
            id="caption"
            name="caption"
            rows="4"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          ></textarea>
          <br />

          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <br />
          <label htmlFor="extraInput">Extra Input:</label>
          <input
            type="text"
            id="extraInput"
            name="extraInput"
            value={extraInput}
            onChange={(e) => setExtraInput(e.target.value)}
          />
          <br />
        
          <button type="submit">Submit Post</button>
        </form>
      </div>
    </div>
  );
}

export default AddNewPost;
