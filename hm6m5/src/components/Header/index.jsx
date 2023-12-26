import React from 'react'
import '../Header/header.scss'
import user from '../../assets/user.png';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

const Header = () => {
  return (
    <div className='header'>
      <Link to="/" className='custom-link'>
        <div>Movie App</div>
      </Link>
      <div className="serach-img">
        <SearchBar/>
        <img src={user} />
      </div>
    </div>
  )
}

export default Header;