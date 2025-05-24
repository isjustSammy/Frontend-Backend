import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Phone, BadgePlus } from 'lucide-react';

const Clientes = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    DUI: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:4000/api/ClienteRoutes', cliente, {
        headers: { 'Content-Type': 'application/json' },
      });
      setCliente({
        nombre: '',
        correo: '',
        contrasena: '',
        telefono: '',
        DUI: ''
      });
      alert('Cliente agregado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al agregar el cliente');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const styles = `
      .clientes-container {
        background: linear-gradient(135deg, rgba(20,20,20,0.95), rgba(35,35,35,0.95));
        min-height: 100vh;
        padding: 3rem 1rem;
      }
      .clientes-form-card {
        background: rgba(15,15,15,0.9);
        padding: 3rem;
        border-radius: 20px;
        max-width: 1000px;
        margin: 0 auto;
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255,255,255,0.1);
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      }
      .clientes-title {
        text-align: center;
        font-size: 3rem;
        font-weight: 800;
        letter-spacing: 2px;
        color: white;
        margin-bottom: 2rem;
      }
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }
      .form-group label {
        color: #fff;
        font-weight: bold;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }
      .form-input {
        width: 100%;
        padding: 1rem;
        background: rgba(0,0,0,0.6);
        border-radius: 12px;
        border: 2px solid rgba(255,255,255,0.2);
        color: #fff;
        font-size: 1rem;
        backdrop-filter: blur(10px);
      }
      .form-input:focus {
        border-color: #fff;
        background: rgba(0,0,0,0.8);
      }
      .submit-button {
        margin-top: 2rem;
        padding: 1rem 2rem;
        background: linear-gradient(45deg, #fff, #f0f0f0);
        color: #000;
        border-radius: 12px;
        font-weight: bold;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
      }
    `;
    const style = document.createElement('style');
    style.innerText = styles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="clientes-container">
      <h1 className="clientes-title">Agregar Cliente</h1>
      <form className="clientes-form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label><User size={16} />Nombre</label>
            <input className="form-input" value={cliente.nombre} onChange={e => setCliente({ ...cliente, nombre: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Mail size={16} />Correo</label>
            <input className="form-input" type="email" value={cliente.correo} onChange={e => setCliente({ ...cliente, correo: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Lock size={16} />Contraseña</label>
            <input className="form-input" type="password" value={cliente.contrasena} onChange={e => setCliente({ ...cliente, contrasena: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Phone size={16} />Teléfono</label>
            <input className="form-input" value={cliente.telefono} onChange={e => setCliente({ ...cliente, telefono: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><BadgePlus size={16} />DUI</label>
            <input className="form-input" value={cliente.DUI} onChange={e => setCliente({ ...cliente, DUI: e.target.value })} required />
          </div>
        </div>
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Agregando...' : 'Agregar Cliente'}
        </button>
      </form>
    </div>
  );
};

export default Clientes;
