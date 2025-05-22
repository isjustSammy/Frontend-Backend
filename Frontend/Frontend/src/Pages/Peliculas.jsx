import React, { useState } from 'react';
import axios from 'axios';

const Peliculas = () => {
  const [movie, setMovie] = useState({
    titulo: '',
    descripcion: '',
    director: '',
    genero: '',
    anio: '',
    duracion: '',
    image: null,  // Para manejar la imagen
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', movie.titulo);
    formData.append('descripcion', movie.descripcion);
    formData.append('director', movie.director);
    formData.append('genero', movie.genero);
    formData.append('anio', movie.anio);
    formData.append('duracion', movie.duracion);
    if (movie.image) {
      formData.append('img', movie.image);  
    }

    try {
      await axios.post('http://localhost:4000/api/PeliRoutes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
      });
      console.log('Película agregada correctamente');
    } catch (error) {
      console.error('Error al agregar la película:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  const handleFileChange = (e) => {
    setMovie({
      ...movie,
      image: e.target.files[0],  
    });
  };

  return (
    <div>
      <h2>Agregar Película</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={movie.titulo}
          onChange={(e) => setMovie({ ...movie, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={movie.descripcion}
          onChange={(e) => setMovie({ ...movie, descripcion: e.target.value })}
        />
        <input
          type="text"
          placeholder="Director"
          value={movie.director}
          onChange={(e) => setMovie({ ...movie, director: e.target.value })}
        />
        <input
          type="text"
          placeholder="Género"
          value={movie.genero}
          onChange={(e) => setMovie({ ...movie, genero: e.target.value })}
        />
        <input
          type="number"
          placeholder="Año"
          value={movie.anio}
          onChange={(e) => setMovie({ ...movie, anio: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duración"
          value={movie.duracion}
          onChange={(e) => setMovie({ ...movie, duracion: e.target.value })}
        />
        <input
          type="file"
          onChange={handleFileChange}  
        />
        <button type="submit">Agregar Película</button>
      </form>
    </div>
  );
};

export default Peliculas;
