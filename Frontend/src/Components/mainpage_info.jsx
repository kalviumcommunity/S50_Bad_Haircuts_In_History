import React from 'react'
import "./mainpage_info.css"
import dummy from '../assets/asapimg.jpeg'
// import Post_area from './Post_area';
import Explore from './Explore';
function Mainpage_info() {
  return (
    <>
     <div className='sin'>
        <div className='container flex'>
          <div>
            <img src={dummy} alt="" className='main_img' />
          </div>
          <div className='container_2'>
            <h1 className='tittle'>Cap Hair Cut </h1>
            <h3 className='caption'>One of the worst hair cut in the history</h3>
            <div className='flex'>
              <div className='user_name'>Vivan Raj Mittakodi</div>
              <div className='like'>likes 500</div>
              </div>
          </div>
        </div>
        <div className='explore'><h1>Explore More</h1></div>
      <Explore/>
     </div>
    </>
  )
}

export default Mainpage_info

