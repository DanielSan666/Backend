import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddCourse.css';

function AddCourse({ onCourseAdded }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    amount: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/courses', formData, {
        withCredentials: true
      });
      if (onCourseAdded) {
        onCourseAdded(response.data);
      }
      setFormData({ title: '', description: '', duration: '', amount: '' });

      Swal.fire({
        title: 'Course Added!',
        text: 'The course has been successfully registered.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/home'); // Redirect to home page
      });
    } catch (error) {
      console.error('Error creating course:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue creating the course.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="add-course-container">
      <h2>Agregar Nuevo Curso</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label htmlFor="title">Nombre:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duración (Horas):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Precio del Curso:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Agregar Curso</button>
        <button type="button" className="button go-back-button" onClick={handleGoHome}>
          Regresar a cursos
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
