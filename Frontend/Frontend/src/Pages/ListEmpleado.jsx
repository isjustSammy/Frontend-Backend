import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Grid, Card, CardContent, Typography,
  IconButton, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '@sweetalert2/theme-dark/dark.css';
import Empleados from './Empleados';

const MySwal = withReactContent(Swal);

const ListEmpleado = () => {
  const [empleados, setEmpleado] = useState([]);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/empleadoRoutes');
      setEmpleado(response.data);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleEdit = async (empleados) => {
    const formValues = {
      nombre: empleados.nombre,
      correo: empleados.correo,
      contrasena: empleados.contrasena,
      telefono: empleados.telefono,
      DUI: empleados.DUI,
      dirreccion:empleados.dirreccion ,
      puesto: empleados.puesto,
      fehcaContra:empleados.fechaContra,
      salario: empleados.salario
    };

    const { value: formData } = await MySwal.fire({
      title: 'Editar Empleado',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${formValues.nombre}">
        <textarea id="correo" class="swal2-textarea" placeholder="Correo">${formValues.correo}</textarea>
        <input id="contrasena" class="swal2-input" placeholder="Contraseña" value="${formValues.contrasena}">
        <input id="telefono" class="swal2-input" placeholder="Teléfono" value="${formValues.telefono}">
        <input id="DUI" type="number" class="swal2-input" placeholder="DUI" value="${formValues.DUI}">
        <input id="dirreccion" " class="swal2-input" placeholder="dirreccion" value="${formValues.dirreccion}">
        <input id="puesto"  class="swal2-input" placeholder="puesto" value="${formValues.puesto}">
        <input id="fechaContra"  class="swal2-input" placeholder="fecha de contratacion" value="${formValues.fehcaContra}">
        <input id="salario" type="number" class="swal2-input" placeholder="salario" value="${formValues.salario}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;
        const telefono = document.getElementById('telefono').value;
        const DUI = document.getElementById('DUI').value;
        const dirreccion = document.getElementById('dirreccion').value;
        const puesto = document.getElementById('puesto').value;
        const fechaContra = document.getElementById('fechaContra').value;
        const salario = document.getElementById('salario').value;



        if (!nombre || !correo) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return null;
        }

        return { nombre, correo, contrasena, telefono, DUI,dirreccion,puesto,fechaContra,salario };
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
        await axios.put(`http://localhost:4000/api/empleadoRoutes/${Empleados._id}`, formData);
        Swal.fire('Actualizado', 'Empleado actualizado con éxito', 'success');
        fetchClientes();
      } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        Swal.fire('Error', 'Hubo un problema al actualizar', 'error');
      }
    }
  };

  const handleDelete = async (empleadoId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar el cliente?')) {
      try {
        await axios.delete(`http://localhost:4000/api/empleadoRoutes/${empleadoId}`);
        setClientes(empleados.filter((c) => c._id !== empleadoId));
      } catch (error) {
        console.error('Error al eliminar el empleado:', error);
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh', py: 4 }}>
      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom sx={{ mb: 3, color: '#fff' }}>
        Listado de empleados
      </Typography>
      {empleados.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No hay empleados disponibles
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {empleados.map((empleados) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={empleados._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      position: 'relative',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 4,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden',
                      paddingTop: '40px',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 2,
                        display: 'flex',
                        gap: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: 2,
                        padding: '4px 6px',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <IconButton
                        onClick={() => handleEdit(cliente)}
                        size="small"
                        sx={{
                          color: '#4FC3F7',
                          '&:hover': { color: '#81D4FA', backgroundColor: 'transparent' },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(cliente._id)}
                        size="small"
                        sx={{
                          color: '#E57373',
                          '&:hover': { color: '#EF9A9A', backgroundColor: 'transparent' },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {empleados.nombre}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#ccc' }}>
                        {empleados.correo}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#aaa', display: 'block', mt: 1 }}>
                        Contraseña: {empleados.contrasena}<br />
                        Teléfono: {empleados.telefono}<br />
                        DUI: {empleados.DUI}
                        Dirrecion: {empleados.dirreccion}
                        Puesto: {empleados.puesto}
                        Fecha de contratacion: {empleados.fechaContra}
                        Salario: {empleados.salario}
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

export default ListEmpleado;
