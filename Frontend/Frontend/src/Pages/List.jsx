import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Grid, Card, CardMedia, CardContent, Typography,
  IconButton, Box
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '@sweetalert2/theme-dark/dark.css';
import { Pencil, Trash2 } from 'lucide-react';

const MySwal = withReactContent(Swal);

const List = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/PeliRoutes');
      setMovies(response.data);
    } catch (error) {
      console.error('Error al obtener las películas:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const styles = `
      .movies-list-container {
        background: linear-gradient(135deg, rgba(13,13,13,0.95), rgba(25,25,25,0.95));
        min-height: 100vh;
        padding: 2rem;
      }
      .movie-card {
        background: rgba(15, 15, 15, 0.9);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        backdrop-filter: blur(15px);
        height: 100%;
      }
      .movie-title {
        background: linear-gradient(45deg, #fff, #f5f5f5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 800;
        text-transform: uppercase;
        font-size: 2.5rem;
        margin-bottom: 2rem;
        text-align: center;
        animation: shimmer 4s infinite ease-in-out;
      }
      @keyframes shimmer {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const handleEdit = async (movie) => {
    let formValues = {
      titulo: movie.titulo,
      descripcion: movie.descripcion,
      director: movie.director,
      genero: movie.genero,
      anio: movie.anio,
      duracion: movie.duracion,
    };

    let imageFile = null;

    const { value: formData } = await MySwal.fire({
      title: 'Editar Película',
      html: `
        <input id="titulo" class="swal2-input" placeholder="Título" value="${formValues.titulo}">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción">${formValues.descripcion}</textarea>
        <input id="director" class="swal2-input" placeholder="Director" value="${formValues.director}">
        <input id="genero" class="swal2-input" placeholder="Género" value="${formValues.genero}">
        <input id="anio" type="number" class="swal2-input" placeholder="Año" value="${formValues.anio}">
        <input id="duracion" type="number" class="swal2-input" placeholder="Duración (min)" value="${formValues.duracion}">
        <input type="file" id="img" class="swal2-file">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const titulo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;
        const director = document.getElementById('director').value;
        const genero = document.getElementById('genero').value;
        const anio = document.getElementById('anio').value;
        const duracion = document.getElementById('duracion').value;
        imageFile = document.getElementById('img').files[0];

        if (!titulo || !descripcion) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return null;
        }

        return { titulo, descripcion, director, genero, anio, duracion };
      },
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal2-dark',
      },
    });

    if (formData) {
      try {
        const data = new FormData();
        data.append('titulo', formData.titulo);
        data.append('descripcion', formData.descripcion);
        data.append('director', formData.director);
        data.append('genero', formData.genero);
        data.append('anio', formData.anio);
        data.append('duracion', formData.duracion);
        if (imageFile) {
          data.append('img', imageFile);
        }

        await axios.put(`http://localhost:4000/api/PeliRoutes/${movie._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        Swal.fire('Actualizado', 'Película actualizada con éxito', 'success');
        fetchMovies();
      } catch (error) {
        console.error('Error al actualizar la película:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar', 'error');
      }
    }
  };

  const handleDelete = async (movieId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      try {
        await axios.delete(`http://localhost:4000/api/PeliRoutes/${movieId}`);
        setMovies(movies.filter((movie) => movie._id !== movieId));
      } catch (error) {
        console.error('Error al eliminar la película:', error);
      }
    }
  };

  return (
    <Container maxWidth={false} className="movies-list-container">
      <Typography className="movie-title">Lista de Películas</Typography>
      {movies.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No hay películas disponibles
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="movie-card" sx={{ color: '#fff', position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        display: 'flex',
                        gap: 1,
                        backgroundColor: 'rgba(35, 35, 35, 0.7)',
                        borderRadius: 2,
                        padding: '4px 6px'
                      }}
                    >
                      <IconButton onClick={() => handleEdit(movie)} size="small" sx={{ color: '#4FC3F7' }}>
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(movie._id)} size="small" sx={{ color: '#E57373' }}>
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>

                    {movie.imgUrl && (
                      <CardMedia
                        component="img"
                        height="180"
                        image={movie.imgUrl}
                        alt={movie.titulo}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {movie.titulo}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#ccc' }}>
                        {movie.descripcion}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 1 }}>
                        Director: {movie.director} | Género: {movie.genero} <br />
                        Año: {movie.anio} | Duración: {movie.duracion} min
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}
    </Container>
  );
};

export default List;
