// Mainpage_info.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './mainpage_info.css';

function Mainpage_info() {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const user = Cookies.get('User_Name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        const data = await response.json();
        setPostData(data);
        setEditedTitle(data.title);
        setEditedContent(data.content);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [postId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
        }),
      });

      console.log('Update Response:', response.status, response.statusText);

      if (response.status === 200 || response.status === 204) {
        fetch(`http://localhost:3000/posts/${postId}`)
          .then((updatedResponse) => updatedResponse.json())
          .then((updatedData) => {
            console.log('Updated Data:', updatedData);
            setPostData(updatedData);
            setEditedTitle(updatedData.title);
            setEditedContent(updatedData.content);
          })
          .catch((error) => {
            console.error('Error fetching updated data:', error);
          });
      } else {
        console.error('Failed to update data. Server response:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
      });
      
      setDeleteSuccess(true);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  if (deleteSuccess) {
    return <h1 style={{ textAlign: 'center', marginTop: '100px' }}>Post deleted successfully</h1>;
  }

  if (!postData) {
    return <div>Loading...</div>;
  }

  const { media_url, User_Name } = postData;

  return (
    <>
      <div className='sin'>
        <div className='full_container'>
          <div className='container flex'>
            <div>
              <img src={media_url} alt="" className='main_img' />
            </div>
            <div className='container_2'>
              <div className='flex'>
                <input
                  type='text'
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className='title'
                />
              </div>
              <div className='flex'>
                <input
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className='caption'
                />
              </div>
              <div>
                <div className='user_name'>{User_Name}</div>
                {User_Name === user && ( // Only render buttons if the current user created the post
                  <div className='btns_container flex'>
                    <button className='btns btn_1' onClick={handleUpdate}>Update</button>
                    <button className='btns btn_2' onClick={handleDelete}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainpage_info;
