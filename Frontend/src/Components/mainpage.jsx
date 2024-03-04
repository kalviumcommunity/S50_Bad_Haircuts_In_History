
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import user_icon from '../assets/user.png';
import home_icon from '../assets/home-icon.png';
import add_icon from '../assets/add-new.png';
import LandingPage from './Landing_page'; 
import './mainpage.css';
import PostArea from './Post_area'; 
import MainpageInfo from './mainpage_info'; 
import AddNewPost from './Add_new'; 
import Cookies from 'js-cookie';  


function Mainpage() {
  const userName = Cookies.get('user_name');

  return (
    <Router>
      <>
        <div className='nav_container'>
          <div>
            <img src={Logo} alt="Logo" className='logo' />
          </div>
          <div className='search-bar'>
            <input type="text" className='search_bar' placeholder='Search' />
          </div>
          <div className='sign_btn'>
            <Link to="/signup" className=' btn'>Sign Up</Link>
          </div>
          <div>
            <Link to="/" className='btn'>Login</Link>
          </div>
        </div>

        <div className='main_container'>
          <div className='side_nav_container'>
            <Link to="/" className='com'>
              <img src={home_icon} alt="Logo" className='icon'/>
              <div>Home</div>
            </Link>
            <div className='com'>
              <img src={user_icon} alt="" className='icon' />
              <div>{userName ? userName : 'Profile'}</div>
            </div>
            <Link to="/add-new" className='com'>
              <img src={add_icon} alt="" className='icon_add'/>
              <div>Add New</div>
            </Link>
            <div className='bottom_nav'>
              <div className='com'>Setting</div>
              <div className='com'>Log Out</div>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/signup" element={<LandingPage />} />
          <Route path="/" element={<PostArea />} />
          <Route path="/post/:postId" element={<MainpageInfo />} />
          <Route path="/add-new" element={<AddNewPost />} />
        </Routes>
      </>
    </Router>
  );
}

export default Mainpage;