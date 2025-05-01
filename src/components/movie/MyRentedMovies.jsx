import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function MyRentedMovies() {
  const { user } = useAuth();
  const [rentedMovies, setRentedMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const rented = JSON.parse(localStorage.getItem(`rented-${user.email}`)) || [];
    
    rented.sort((a,b)=> new Date(b.rentedAt) - new Date(a.rentedAt))
    
    setRentedMovies(rented);


  }, [user]);

  function handleUnrent(id) {

    const isConfirmed = window.confirm("Are you sure you want to unrent this movie?");
    if (!isConfirmed) return;

    const updateRentedMovies = rentedMovies.filter(movie => movie.id !== id);

    setRentedMovies(updateRentedMovies);
    localStorage.setItem(`rented-${user.email}`, JSON.stringify(updateRentedMovies));
  }

  return (
    <div className="container mt-5">
      <h2>My Rented Movies</h2>
      {rentedMovies.length === 0 ? (
        <div className="text-center mt-4">
        <h5>You haven't rented any movies yet!</h5>
        <p>Start browsing our collection and rent your favorite movies.</p>
        <button className="btn btn-primary" onClick={() => navigate("/allmovies")}>
          Browse Movies
        </button>
      </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentedMovies.map((movie) => (
              <tr key={movie.id}>
                <td><Link to={`/movie/${movie.id}`}><img src={movie.poster} alt={movie.title} width="50" /></Link></td>
                <td><Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{movie.title}</Link></td>
                <td>{movie.genre}</td>
                <td>{movie.rentedAt && <span>{movie.rentedAt}</span>}</td>
      
                <td>
                  <button className='btn btn-danger btn-sm' onClick={() => handleUnrent(movie.id)}>
                    Unrent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}