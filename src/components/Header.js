import React from 'react';
import logo from '../assets/img/nordIcon.png';

const Header = () => (
  <div className="header">
    <img src={logo} alt='Nord Software logo'/>
    <span className="title">Nord Software</span>
  </div>
);

export default Header;
