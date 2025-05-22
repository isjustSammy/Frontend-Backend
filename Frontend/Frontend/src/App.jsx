import { useState } from 'react'
import MovieForm  from '../src/Pages/Peliculas.jsx';
import MovieList from '../src/Pages/List.jsx';
import './App.css'


  const App = () => {
    const [moviesUpdated, setMoviesUpdated] = useState(false);
  
    const refreshMovies = () => {
      setMoviesUpdated(!moviesUpdated);
    };
  
    return (
      <div>
        <h1>Movie Database</h1>
        <MovieForm refreshMovies={refreshMovies} />
        <MovieList />
      </div>
    );
  };


export default App
