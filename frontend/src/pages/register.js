// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Registro.css';  // Asegúrate de crear y enlazar este archivo CSS

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData, {
        withCredentials: true // Esto permite el uso de cookies
      });
      Swal.fire({
        icon: 'success',
        title: 'Registrado',
        text: 'El usuario se ha registrado correctamente'
      });
      console.log(response.data);
      navigate('/'); // Navegar al home después de registrar
    } catch (error) {
      let errorMessage = 'Error al registrarse';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
      console.error('Error al registrarse:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="register-form">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required // Asegúrate de que este campo es requerido
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required // Asegúrate de que este campo es requerido
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required // Asegúrate de que este campo es requerido
          />
        </div>
        <button type="submit">Registrarse</button>
        <button type="button" onClick={handleGoHome} className="go-home-button">Regresar</button>
      </form>
    </div>
  );
}

export default Register;
