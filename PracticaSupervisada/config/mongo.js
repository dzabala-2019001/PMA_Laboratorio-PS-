import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Teacher from '../src/teacher/teacher.model.js'; // Importamos el modelo de maestro

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        // Proceso de conexión
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connect to mongodb');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | try connecting');
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to mongodb');
        });
        mongoose.connection.once('open', async () => {
            console.log('MongoDB | connected to database');

            const existingTeacher = await Teacher.findOne();

            if (!existingTeacher) {
                const hashedPassword = await bcrypt.hash('admin123', 10); 
                const defaultTeacher = new Teacher({
                    name: 'defaultTeacher',
                    surname: 'default',
                    username: 'admin',
                    password: hashedPassword,
                    email: 'admin@example.com',
                    role: 'TEACHER',
                    versionKey: false
                });
                await defaultTeacher.save();
                console.log('Default teacher created:', defaultTeacher);
            }
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconnected to mongodb');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | disconnected');
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection failed', err);
    }
};

