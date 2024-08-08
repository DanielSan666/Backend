import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password }, { withCredentials: true });
            if (response.data.token) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in!',
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    navigate('/home');
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Please check your email and password.',
            });
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">Inicio de sesión</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />
                    <div className="buttonContainer">
                        <button type="submit" className="button">Iniciar sesion</button>
                        <div className="buttonSpacer">
                            <button type="button" className="button" onClick={() => navigate('/register')}>Registrarse</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
