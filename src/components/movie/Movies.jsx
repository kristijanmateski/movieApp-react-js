import React, { useEffect, useState } from 'react';
import moviesData from "../../data.json";
import { useNavigate } from 'react-router-dom';
import SideBar from '../general/SideBar';

export default function AllMovies() {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [minRating, setMinRating] = useState(0);
  
    const navigate = useNavigate();

    useEffect(()=>{
        setMovies(moviesData);
    },[])

    const filteredMovies = movies.filter((movie)=>{
        const genre = selectedGenre === "All" || movie.genre === selectedGenre;
        const rating = movie.rating >= minRating;
        return genre && rating;
    })

    
    return (
        <div className="container my-5">
          <h2 className="text-center mb-4">All Movies</h2>
          <div className="row">
            <div className="col-md-3 mb-4">
              <SideBar
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                minRating={minRating}
                setMinRating={setMinRating}
              />
            </div>
    
            <div className="col-md-9">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="col">
                    <div className="card h-100">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="card-img-top"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h5 className="card-title mb-0">{movie.title}</h5>
                          <span className="badge bg-warning text-dark">
                            ⭐ {movie.rating}
                          </span>
                        </div>
                        <p className="text-muted">{movie.genre}</p>
                        <button
                          onClick={() => navigate(`/movie/${movie.id}`)}
                          className="btn btn-primary w-100 mt-auto"
                        >
                          See more details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredMovies.length === 0 && (
                  <p className="text-center text-muted">No movies match your filters.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
}
