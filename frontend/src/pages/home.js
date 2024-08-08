// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from './components/menu'; // Ajusta el path si es necesario
import '../menu.css';
import '../home.css';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false); // Nuevo estado para manejar acceso denegado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses', {
          withCredentials: true
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
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
        if (error.response && error.response.status === 401) {
          setAccessDenied(true); // Establecer acceso denegado si el estado es 401
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    fetchUserProfile();
  }, []);

  const handleAddCourse = () => {
    navigate('/addcourse');
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) return <p>Loading...</p>;

  if (accessDenied) return <p>Acceso Denegado. Favor de verificar credenciales.</p>; // Mostrar mensaje de acceso denegado

  return (
    <div>
      <Menu />
      <div className="main-content">
        <h2>Cursos</h2>
        {courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map(course => (
              <div
                className="course-card"
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
              >
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Cursos no disponibles.</p>
        )}
        {userRole === 'admin' && (
          <button onClick={handleAddCourse}>Agregar Curso</button>
        )}
      </div>
    </div>
  );
};

export default Home;
