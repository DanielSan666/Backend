// src/pages/InfCurso.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Menu from './components/menu';
import './InfCourse.css';

const InfCurso = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Error fetching course');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          withCredentials: true
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchCourse();
    fetchUserProfile();
  }, [courseId]);

  const handleGoHome = () => {
    navigate('/home'); // Navigate to the home page
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment-stripe', {
        course: course.title,
        amount: course.amount,
        courseId
      });
      window.location.href = response.data.url; // Redirect to Stripe for payment
    } catch (error) {
      console.error('Error initiating Stripe payment:', error);
      setError('Failed to initiate payment');
    }
  };

  const handleEditCourse = () => {
    navigate(`/editcourse/${courseId}`); // Navigate to the edit course page
  };

  const handleDeleteCourse = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      Swal.fire({
        title: 'Curso Eliminado!',
        text: 'El curso ha sido eliminado exitosamente.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500 // Optional: Auto-close the alert after 1.5 seconds
      }).then(() => {
        navigate('/home'); // Navigate to the home page after deleting the course
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      setError('Failed to delete course');
    }
  };

  useEffect(() => {
    // Handle the payment confirmation
    const queryParams = new URLSearchParams(window.location.search);
    const paymentStatus = queryParams.get('status');

    if (paymentStatus === 'success') {
      Swal.fire({
        title: 'Pago Exitoso!',
        text: 'Tu pago se ha realizado con éxito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500 // Optional: Auto-close the alert after 1.5 seconds
      }).then(() => {
        navigate('/home'); // Navigate to the home page after payment success
      });
    } else if (paymentStatus === 'failed') {
      Swal.fire({
        title: 'Pago Fallido',
        text: 'Hubo un problema con tu pago. Por favor, intenta de nuevo.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500 // Optional: Auto-close the alert after 1.5 seconds
      }).then(() => {
        navigate('/home'); // Navigate to the home page after payment failure
      });
    }
  }, [navigate]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>Curso no encontrado</p>;

  return (
    <div>
      <Menu />
      <div className="inf-curso-container">
        <h2>Información del Curso</h2>
        <p>Nombre del Curso: {course.title}</p>
        <p className="amount">Costo del Curso: ${course.amount}</p>

        {userRole === 'admin' ? (
          <div className="button-group">
            <button className="button" onClick={handleEditCourse}>Editar</button>
            <button className="button delete-button" onClick={handleDeleteCourse}>Eliminar</button>
          </div>
        ) : (
          <button className="button payment-button" onClick={handlePayment}>
            Pago mediante Stripe
          </button>
        )}
        
        <button className="button go-back-button" onClick={handleGoHome}>
          Regresar a cursos
        </button>
      </div>
    </div>
  );
};

export default InfCurso;
