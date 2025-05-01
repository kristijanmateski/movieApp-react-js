import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moviesData from "../../data.json";
import '../../index.css';
import { useAuth } from "../../context/AuthContext";

export default function MovieDetails() {
  const { id } = useParams(); // go zemame idto od urloto
  const [movie, setMovie] = useState(null);
  const [message, setMessage] = useState(false);
  const [isRented, setIsRented] = useState(false); 
  const { user } = useAuth();
  const navigate = useNavigate();
   
  useEffect(() => {
    const foundMovie = moviesData.find((movie) => movie.id === parseInt(id));
    setMovie(foundMovie);

    if (user && foundMovie) { 
      const rented = JSON.parse(localStorage.getItem(`rented-${user.email}`)) || [];
      if (rented.find((m) => m.id === foundMovie.id)) {
        setIsRented(true);
      }
    }
  }, [id, user]);

  function handleRent() {
    if (!user) {
      window.alert("You must to login to rent a movie!");
      navigate("/login");
    } else {
      confirmRent();
    }
  }

  function confirmRent() {
    if (!movie) return;

    const rented = JSON.parse(localStorage.getItem(`rented-${user.email}`)) || [];
    
    if (!rented.find((m) => m.id === movie.id)) {
      const rentedMovie = {
        ...movie,
        rentedAt: new Date().toLocaleDateString()
      }
      rented.push(rentedMovie);
      localStorage.setItem(`rented-${user.email}`, JSON.stringify(rented));
      setIsRented(true); 
    }

    setMessage(true);

    setTimeout(() => {
      setMessage(false);
    }, 3000);

  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={movie.poster}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center gap-2 mb-3">
            <h2 className="mb-0">{movie.title}</h2>
            <span
              className="badge bg-warning text-dark px-2 py-1"
              style={{ fontSize: "0.75rem" }}
            >
              ⭐ {movie.rating}
            </span>
          </div>
          <p>{movie.description}</p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Cast:</strong> {movie.cast.join(", ")}
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={handleRent}
            disabled={isRented}
          >
            {isRented ? "Rented" : "Rent this movie"} {/* Change button text if rented */}
          </button>
        </div>
      </div>
      {message && (
        <div className="success-message">
          <h3>Rented Successfully!</h3>
          </div>
        
      )}
    </div>
  );
}