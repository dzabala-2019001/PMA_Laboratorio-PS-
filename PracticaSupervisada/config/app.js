import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from '../src/auth/auth.routes.js';
import teacherRoutes from '../src/teacher/teacher.routes.js';
import studentRoutes from '../src/student/student.routes.js'
import { connectDB } from './mongo.js';
import { validateJwt, errorHandler } from '../src/middlewares/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2655

// Conectar a la base de datos MongoDB
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Definir rutas >:v
app.use('/api/auth', authRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to School Management System');
})

app.use(validateJwt);

app.use(errorHandler);

export default app;

