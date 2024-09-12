import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import './mainpage.css';

function getRandomSize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PostArea({ searchInput }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Adding relations between entities
  
  const filteredPosts = posts.filter((post) =>
    post.User_Name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className='main_content_container'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='masonry-grid'
        columnClassName='masonry-column'
      >
        {filteredPosts.map((post) => (
          <Link
            key={post._id || post.post_id}
            to={`/post/${post._id || post.post_id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className='masonry-item'>
              <img
                className='user_img'
                src={post.media_url}
                alt={`User ${post._id || post.post_id}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </Link>
        ))}
      </Masonry>
    </div>
  );
}

export default PostArea;
