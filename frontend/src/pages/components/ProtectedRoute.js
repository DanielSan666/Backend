// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:5000/api/profile', {
          withCredentials: true
        });
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Mostrar alerta de acceso denegado
          Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'No tienes permiso para acceder a esta página. Serás redirigido a la página de inicio de sesión.',
            timer: 3000,
            showConfirmButton: false
          }).then(() => {
            navigate('/login');
          });
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <p>Cargando...</p>;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
