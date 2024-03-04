import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import './mainpage.css';

function getRandomSize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Post_area() {
  const [posts, setPosts] = useState([]);

  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='main_content_container'
        columnClassName='masonry_column'
      >
        {posts.map((post) => (
          <Link
            key={post._id || post.post_id}
            to={`/post/${post._id || post.post_id}`}
            style={{ textDecoration: 'none' }}
          >
              <div>
                <img
                  className='user_img'
                  src={post.media_url}
                  alt={`User ${post._id || post.post_id}`}
                  style={{ width: '100%', height: `${getRandomSize(20, 50)}vh` }}
                />
              </div>
          </Link>
        ))}
      </Masonry>
    </>
  );
}

export default Post_area;



