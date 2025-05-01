import React from 'react';

export default function SideBar({ selectedGenre, setSelectedGenre, minRating, setMinRating }) {
  const genres = ["All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romantic","Adventure","Crime","Fantasy","Mystery","Thriller"];

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Filter by Genre</h5>
      </div>
      <div className='card-body'>
        <h6>By genre</h6>
      <ul className="list-group mb-3">
        {genres.map((genre) => (
          <li
            key={genre}
            className={`list-group-item ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
            style={{ cursor: 'pointer' }}
          >
            {genre}
          </li>
        ))}
      </ul>
      
      <h6>By Minimum Rating</h6>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="form-range"
        />
        <p className="text-center">⭐ {minRating}+</p>
      </div>
    </div>
  );
}