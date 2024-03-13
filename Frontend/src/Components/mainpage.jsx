import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
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
  const [searchInput, setSearchInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('User_Name'));
  const User_Name = Cookies.get('User_Name');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleLogout = () => {
    Cookies.remove('User_Name');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <>
        <div className='nav_container'>
          <div>
            <img src={Logo} alt="Logo" className='logo' />
          </div>
          <div className='search-bar'>
            <input
              type="text"
              className='search_bar'
              placeholder='Search'
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className='sign_btn'>
            <Link to="/signup" className='btn'>Sign Up</Link>
          </div>
          <div>
            {isLoggedIn ? (
              <button className='btn' onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/" className='btn'>Login</Link>
            )}
          </div>
        </div>

        <div className='main_container'>
          <div className='side_nav_container'>
            <Link to="/PostArea" className='com'>
              <img src={home_icon} alt="Logo" className='icon'/>
              <div>Home</div>
            </Link>
            <div className='com'>
              <img src={user_icon} alt="" className='icon' />
              <div>{isLoggedIn ? User_Name : 'Profile'}</div>
            </div>
            <Link to="/add-new" className='com'>
              <img src={add_icon} alt="" className='icon_add'/>
              <div>Add New</div>
            </Link>
            <div className='bottom_nav'>
              <div className='com'>Setting</div>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/signup" element={<LandingPage />} />
          <Route path="/PostArea" element={<PostArea User_Name={User_Name} searchInput={searchInput} />} />
          <Route path="/post/:postId" element={<MainpageInfo />} />
          <Route path="/add-new" element={<AddNewPost User_Name={User_Name} />} />
        </Routes>
      </>
    </Router>
  );
}

export default Mainpage;
