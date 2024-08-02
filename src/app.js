import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"; // Importa cors

import authRoutes from './routes/auth.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import coursesRouter from './routes/course.routes.js'

const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());

// Configura CORS para permitir todas las solicitudes
app.use(cors({
    origin: 'http://localhost:3000', // La URL de tu frontend
    credentials: true 
}));

app.use('/api', authRoutes);
app.use('/api', paymentRoutes);
app.use('/api', coursesRouter)

export default app;
