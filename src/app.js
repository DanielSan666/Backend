import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"; // Importa cors

import authRoutes from './routes/auth.routes.js'

const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());

// Configura CORS para permitir todas las solicitudes
app.use(cors());

app.use('/api', authRoutes);

export default app;
