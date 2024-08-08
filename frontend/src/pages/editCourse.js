import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from './components/menu';
import './EditCourse.css';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ title: '', amount: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchCourse();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/courses/${courseId}`, course);
      navigate(`/courses/${courseId}`); // Navigate to the course page after editing
    } catch (error) {
      console.error('Error updating course:', error);
      setError('Failed to update course');
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Menu />
      <div className="edit-course-container">
        <h2>Editor de Curso</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Nombre del Curso</label>
            <input
              type="text"
              id="title"
              name="title"
              value={course.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Precio del curso</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={course.amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="button">Guardar</button>
            <button type="button" className="button cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
