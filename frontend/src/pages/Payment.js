// src/components/Payment.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = ({ course, amount }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckoutStripe = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/payment-stripe', { course, amount });
        const session = response.data;

        if (session && session.url) {
          window.location.href = session.url;
        } else {
          throw new Error('No se pudo iniciar el pago');
        }
      } catch (error) {
        console.error('Error al iniciar el pago:', error);
        alert('No se pudo iniciar el pago. Inténtalo de nuevo más tarde.');
      }
    };

    handleCheckoutStripe();
  }, [course, amount]);

  return (
    <div>
      <h2>Processing Payment for {course}</h2>
    </div>
  );
};

export default Payment;
