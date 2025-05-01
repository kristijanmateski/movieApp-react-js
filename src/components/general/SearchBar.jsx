import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moviesData from '../../data.json';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const navigate = useNavigate();

    function handleSearch(e){
        const query= e.target.value;
        setSearch(query);

        if(query.length>0){
            const suggestions = moviesData.filter((movie)=>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMovies(suggestions);
        }else{
            setFilteredMovies([]);
        }
    }

    function handleSelectedMovie(movieId){
        navigate(`/movie/${movieId}`);
        setSearch('');
        setFilteredMovies([]);
    }

    return (
        <div className="navbar-nav ms-auto">
            <div className="d-flex flex-column w-100 position-relative">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search}
                    onChange={handleSearch}
                    className="form-control"
                />
                {filteredMovies.length > 0 && (
                    <ul className="list-group mt-2 position-absolute w-100 z-index-2" style={{ top: '100%' }}>
                        {filteredMovies.map((movie) => (
                            <li
                                key={movie.id}
                                className="list-group-item"
                                onClick={() => handleSelectedMovie(movie.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {movie.title}
                            </li>
                        ))}
                    </ul>
                )}
                {search && filteredMovies.length === 0 && (
                    <div className="list-group mt-2 position-absolute w-100 z-index-2" style={{ top: '100%' }}>
                        <li className="list-group-item">
                            <p className="mb-0">Movie not found...</p>
                        </li>
                    </div>
                )}
            </div>
        </div>
    );
}
