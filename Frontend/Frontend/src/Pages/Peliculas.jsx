import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film, Upload, Plus, Sparkles, Camera, Star, Clock, Calendar, User } from 'lucide-react';

const Peliculas = ({ refreshMovies }) => {
  const [movie, setMovie] = useState({
    titulo: '',
    descripcion: '',
    director: '',
    genero: '',
    anio: '',
    duracion: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMovie({
        titulo: '',
        descripcion: '',
        director: '',
        genero: '',
        anio: '',
        duracion: '',
        image: null,
      });
      alert('¡Película agregada correctamente!');
      if (refreshMovies) refreshMovies();
    } catch (error) {
      alert('Error al agregar la película');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMovie({ ...movie, image: file });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setMovie({ ...movie, image: e.dataTransfer.files[0] });
    }
  };

  useEffect(() => {
    const styles = `
      .movies-container {
        background: linear-gradient(135deg, rgba(13,13,13,0.95), rgba(25,25,25,0.95), rgba(13,13,13,0.95));
        min-height: 100vh;
        overflow: hidden;
      }
      .movies-content { padding: 2rem; position: relative; z-index: 2; }
      .movies-header { text-align: center; margin-bottom: 3rem; }
      .movies-title {
        font-size: 3.5rem; font-weight: 900; letter-spacing: 3px;
        background: linear-gradient(45deg, #fff, #f5f5f5, #fff);
        background-clip: text; -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; text-transform: uppercase;
        animation: shimmer 4s infinite ease-in-out;
      }
      @keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      .movies-form-card {
        background: rgba(15,15,15,0.9); padding: 3rem; border-radius: 20px;
        max-width: 1200px; margin: 0 auto; backdrop-filter: blur(20px);
        border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      }
      .form-grid {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;
      }
      .form-group label {
        color: #fff; font-weight: bold; text-transform: uppercase; font-size: 0.9rem;
        margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;
      }
      .form-input, .form-textarea {
        width: 100%; padding: 1rem; background: rgba(0,0,0,0.6); border-radius: 12px;
        border: 2px solid rgba(255,255,255,0.2); color: #fff; font-size: 1rem;
        backdrop-filter: blur(10px); transition: all 0.3s ease;
      }
      .form-input:focus, .form-textarea:focus {
        border-color: #fff; box-shadow: 0 0 20px rgba(255,255,255,0.2);
        background: rgba(0,0,0,0.8);
      }
      .upload-area {
        border: 2px dashed rgba(255,255,255,0.3); border-radius: 15px;
        padding: 3rem; text-align: center; cursor: pointer;
        background: rgba(0,0,0,0.3); transition: all 0.3s ease;
      }
      .submit-button {
        margin-top: 2rem; padding: 1.2rem 2rem;
        background: linear-gradient(45deg, #fff, #f0f0f0); color: #000;
        border-radius: 15px; font-weight: bold; text-transform: uppercase;
        cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  return (
    <div className="movies-container" onDragEnter={handleDrag}>
      <div className="movies-content">
        <div className="movies-header">
          <Film size={48} color="#fff" />
          <h1 className="movies-title">Cinema Studio</h1>
          <Sparkles size={32} color="#fff" />
        </div>
        <form className="movies-form-card" onSubmit={handleSubmit} onDragOver={handleDrag} onDrop={handleDrop}>
          <div className="form-grid">
            <div className="form-group">
              <label><Star size={16} />Título</label>
              <input className="form-input" value={movie.titulo} onChange={e => setMovie({ ...movie, titulo: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><User size={16} />Director</label>
              <input className="form-input" value={movie.director} onChange={e => setMovie({ ...movie, director: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><Film size={16} />Género</label>
              <input className="form-input" value={movie.genero} onChange={e => setMovie({ ...movie, genero: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><Calendar size={16} />Año</label>
              <input type="number" className="form-input" value={movie.anio} onChange={e => setMovie({ ...movie, anio: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><Clock size={16} />Duración</label>
              <input type="number" className="form-input" value={movie.duracion} onChange={e => setMovie({ ...movie, duracion: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><Camera size={16} />Descripción</label>
              <textarea className="form-textarea" value={movie.descripcion} onChange={e => setMovie({ ...movie, descripcion: e.target.value })} required />
            </div>
            <div className="form-group full-width">
              <div className={`upload-area ${dragActive ? 'drag-active' : ''}`}>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="upload-input" />
                <label htmlFor="upload-input" style={{ display: 'block', cursor: 'pointer' }}>
                  <Upload size={40} />
                  <div>{movie.image ? movie.image.name : 'Arrastra o selecciona una imagen'}</div>
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Agregando...' : 'Agregar Película'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Peliculas;
