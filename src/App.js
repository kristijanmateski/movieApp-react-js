import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Home from "./components/general/Home";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./components/auth/Login";
import MovieDetails from "./components/movie/MovieDetails";
import Logout from "./components/auth/Logout";
import NavBar from "./components/general/NavBar";
import MyRentedMovies from "./components/movie/MyRentedMovies";
import Movies from "./components/movie/Movies";
import Contact from "./components/general/Contact";
import Aboutus from "./components/general/Aboutus";
import LoadingSpinner from "./components/general/LoadingSpinner";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <NavBar />
      {loading && <LoadingSpinner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/allmovies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/protected" element={<ProtectedRoute><MyRentedMovies /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;