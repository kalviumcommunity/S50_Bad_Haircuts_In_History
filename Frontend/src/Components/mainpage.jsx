import React from 'react';
import Logo from '../assets/Logo.png';
// import Post_area from './Post_area';
import Mainpage_info from './mainpage_info';
import './mainpage.css';

function Mainpage() {


  return (
    <>
      <div className='nav_container'>
        <div>
          <img src={Logo} alt="Logo" className='logo'/>
        </div>
        <div className='search-bar'>
          <input type="text" className='search_bar' placeholder='Search'/>
        </div>
        <div>
          <button className='btn'>Sign Up</button>
        </div>
      </div>

      <div className='main_container'>
        <div className='side_nav_container'>
          <div className='com'>Home</div>
          <div className='com'>You</div>
          <div className='com'>Add New</div>
          <div className='bottom_nav'>
            <div className='com'>Setting</div>
            <div className='com'>Log Out</div>
          </div>
        </div>
     {/* <Post_area/> */}
     <Mainpage_info/>
      </div>
    </>
  );
}

export default Mainpage;

