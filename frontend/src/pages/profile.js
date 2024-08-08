import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Menu from './components/menu';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', { withCredentials: true });
        setProfile(response.data);
      } catch (error) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleGoHome = () => {
    navigate('/home');
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
    <Menu />
    <div style={styles.container}>
      <h1 style={styles.heading}>User Profile</h1>
      {profile ? (
        <div style={styles.profileContainer}>
          <p><strong>Nombre de Usuario:</strong> {profile.username}</p>
          <p><strong>Correo electrónico:</strong> {profile.email}</p>
          <h2>Cursos en los que te regustraste:</h2>
          <ul>
            {profile.courses && profile.courses.map(course => (
              <li key={course._id}>{course.name}</li> // Ajusta según la estructura de tus cursos
            ))}
          </ul>
          <button style={styles.button} onClick={handleGoHome}>Regresar a cursos</button> {/* Agrega el botón */}
        </div>
      ) : (
        <p>No hay datos disponibles sobre el perfil</p>
      )}
    </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#444',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Profile;
