import React, { useEffect, useState } from 'react';
import moviesData from "../../data.json";
import { useNavigate } from 'react-router-dom';

export default function AllMovies() {
    const [movies, setMovies] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
  
    const navigate = useNavigate();

    useEffect(()=>{
        setMovies(moviesData);
    },[])

    const movieToShow = movies.slice(0,visibleCount);

    function handleShowMore(){
      const nextCount = visibleCount+8;
      if(nextCount >= 24){
        navigate('/allmovies');
      }else{
        setVisibleCount(nextCount);
      }
    }
    
    return (
        <div className="container my-5">
          <h2 className="text-left mb-4">Some Movies...</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {movieToShow.map((movie) => (
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
          </div>
          <div className='text-center mt-4'>
            <button className='btn btn-secondary' onClick={handleShowMore}>Show more</button>
          </div>
        </div>
      );
}
