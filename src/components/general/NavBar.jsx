import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import SearchBar from '../general/SearchBar';

export default function NavBar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-warning fw-bold fs-3">
          🎬 MovieApp
        </Link>
        
        <SearchBar />
        
        
        <div className="d-none d-lg-flex gap-4 ms-4">
  <Link to="/allmovies" className="text-white my-2 fs-5 hover-animation">
    All Movies
  </Link>
  <Link to="/contact" className="text-white my-2 fs-5 hover-animation">
    Contact
  </Link>
  <Link to="/aboutus" className="text-white my-2 fs-5 hover-animation">
    About Us
  </Link>
</div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          {user ? (
            <div className="d-flex align-items-center gap-3">
              <span className="text-white fw-semibold fs-5">👤 {user.email}</span>
              <Link to="/protected" className="btn btn-outline-light btn-sm px-4 py-2 rounded-pill shadow-sm hover-zoom-in">
                My Rented Movies
              </Link>
              <button onClick={logout} className="btn btn-outline-danger btn-sm px-4 py-2 rounded-pill shadow-sm hover-zoom-in">
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <Link to="/login" className="btn btn-outline-light btn-sm px-4 py-2 rounded-pill shadow-sm hover-zoom-in">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-info btn-sm px-4 py-2 rounded-pill shadow-sm hover-zoom-in">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}