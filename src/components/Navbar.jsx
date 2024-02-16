import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/imdb-icon.png';

function Navbar() {

  const [isMenuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-dark fixed-top'>
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/">
            <img src={logo} height={40} width={60} alt='...'/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <Link
                  className='nav-link text-light'
                  aria-current="page"
                  to="/"
                  onClick={closeMenu}>
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className='nav-link text-light'
                  aria-current="page"
                  to="/"
                  onClick={closeMenu}>
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar