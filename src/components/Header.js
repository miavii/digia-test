import React from 'react';
import logo from '../assets/img/nordIcon.jpg';

const Header = () => (
  <div className="header">
    <img src={logo}/>
    <span className="title">Nord Software</span>
  </div>
);

export default Header;