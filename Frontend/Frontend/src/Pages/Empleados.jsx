import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Phone, BadgePlus } from 'lucide-react';

const Empleados = () => {
  const [empleado, setEmpleados] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    DUI: '',
    dirreccion: '',
    puesto: '',
    fehcaContra:'',
    salario:''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:4000/api/empleadoRoutes', empleado, {
        headers: { 'Content-Type': 'application/json' },
      });
      setEmpleados({
        nombre: '',
        correo: '',
        contrasena: '',
        telefono: '',
        DUI: '',
        dirreccion: '',
        puesto: '',
        fehcaContra:'',
        salario:''
      });
      alert('Empleado agregado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al agregar el empleado');
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
      <h1 className="clientes-title">Agregar Empleado</h1>
      <form className="clientes-form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label><User size={16} />Nombre</label>
            <input className="form-input" value={empleado.nombre} onChange={e => setEmpleados({ ...empleado, nombre: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Mail size={16} />Correo</label>
            <input className="form-input" type="email" value={empleado.correo} onChange={e => setEmpleados({ ...empleado, correo: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Lock size={16} />Contraseña</label>
            <input className="form-input" type="password" value={empleado.contrasena} onChange={e => setEmpleados({ ...empleado, contrasena: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Phone size={16} />Teléfono</label>
            <input className="form-input" value={empleado.telefono} onChange={e => setEmpleados({ ...empleado, telefono: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><BadgePlus size={16} />DUI</label>
            <input className="form-input" value={empleado.DUI} onChange={e => setEmpleados({ ...empleado, DUI: e.target.value })} required />
          </div>
           <div className="form-group">
            <label><BadgePlus size={16} />Dirrecion</label>
            <input className="form-input" value={empleado.dirreccion} onChange={e => setEmpleados({ ...empleado, dirreccion: e.target.value })} required />
          </div>
           <div className="form-group">
            <label><BadgePlus size={16} />Puesto</label>
            <input className="form-input" value={empleado.puesto} onChange={e => setEmpleados({ ...empleado, puesto: e.target.value })} required />
          </div>
           <div className="form-group">
            <label><BadgePlus size={16} />Fecha de contratacion</label>
            <input className="form-input" value={empleado.fehcaContra} onChange={e => setEmpleados({ ...empleado, fehcaContra: e.target.value })} required />
          </div>
           <div className="form-group">
            <label><BadgePlus size={16} />Salario</label>
            <input className="form-input" type='number' value={empleado.salario} onChange={e => setEmpleados({ ...empleado, salario: e.target.value })} required />
          </div>
        </div>
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Agregando...' : 'Agregar Empleado'}
        </button>
      </form>
    </div>
  );
};

export default Empleados;
