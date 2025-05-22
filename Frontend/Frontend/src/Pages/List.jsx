import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/PeliRoutes');
      setMovies(response.data);  // Aquí se establece la respuesta que es un array de películas
    } catch (error) {
      console.error('Error al obtener las películas:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);  // Se ejecuta solo una vez cuando el componente se monta

  return (
    <div>
      <h2>Lista de Películas</h2>
      {movies.length === 0 ? (
        <p>No hay películas disponibles</p>
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie._id}>
              <h3>{movie.titulo}</h3>
              <p>{movie.descripcion}</p>
              {movie.imgUrl && <img src={movie.imgUrl} alt={movie.titulo} width="100" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
