import React from 'react'
import Logo from '../assets/Logo.png';
import Dummy from '../assets/asapimg.jpeg';
import Masonry from 'react-masonry-css';
import './Explore.css';

const imageUrls = [Logo, Dummy, Logo, Dummy, Logo, Dummy, Logo];

function getRandomSize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
function Explore() {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
      };
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
  )
}

export default Explore