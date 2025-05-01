import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moviesData from "../../data.json";

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex]= useState(0);

  useEffect(() => {
    const trendingMovies = moviesData.filter((movie) => movie.isTrending);
    setMovies(trendingMovies);
  }, []);

  const moviesPerSlider = 4;

  
function nextSlider() {
  setCurrentIndex((prev) => {
    const next = prev + moviesPerSlider;
    return next >= movies.length ? 0 : next;
  });
}

function prevSlider() {
  setCurrentIndex((prev) => {
    const next = prev - moviesPerSlider;
    return next < 0 ? movies.length - moviesPerSlider : next;
  });
}

  const currentMovies = movies.slice(currentIndex, currentIndex + moviesPerSlider);

if (currentMovies.length < moviesPerSlider) {
  const remaining = moviesPerSlider - currentMovies.length;
  currentMovies.push(...movies.slice(0, remaining));
}

  return (
    <div className="container my-5">
  <h2 className="text-left mb-4">Trending Movies</h2>

  <div className="position-relative">
  <button
  onClick={prevSlider}
  className="btn position-absolute top-50 start-0 translate-middle-y z-3"
  style={{
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    border: "none",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    marginLeft: "-10px",
  }}
>
  &lt;
</button>

    <div className="overflow-hidden px-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="col">
            <div className="card h-100 shadow-sm">
              <img
                src={movie.poster}
                alt={movie.title}
                className="card-img-top"
                style={{ height: "500px", objectFit: "cover" }}
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
    </div>

    <button
  onClick={nextSlider}
  className="btn position-absolute top-50 end-0 translate-middle-y z-3"
  style={{
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    border: "none",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    marginRight: "-10px"
  }}
>
  &gt;
</button>
  </div>
</div>
  );
}
