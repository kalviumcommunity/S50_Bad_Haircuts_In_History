import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import './Explore.css';

function getRandomSize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Explore() {
  const [imageUrls, setImageUrls] = useState([]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/allImages');
        const data = await response.json();
        const urls = data.map(item => item.imageUrl);
        setImageUrls(urls);
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
        className='main_content_'
        columnClassName='masonry'
      >
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className='template' style={{ marginBottom: '10px', width: '100%' }}>
            <div>
              <img
                className='user_'
                src={imageUrl}
                alt={`User ${index + 1}`}
                style={{ width: '100%', height: `${getRandomSize(20, 50)}vh` }}
              />
            </div>
          </div>
        ))}
      </Masonry>
    </>
  );
}

export default Explore;
