import Student from '../student/student.model.js'
import Course from '../auth/courseModel.js'
import jwt from 'jsonwebtoken'

export const assignCourse = async (req, res) => {
    try {
        let token = req.headers.authorization
        let decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        let id = decodeToken.id
        const course = await Course.findOne({ _id: req.params.courseId})
        if (!course) {
            return res.status(404).send({ message: 'Curso no encontrado' })
        }
        course.students = id;
        await course.save();
        res.status(200).send({ message: `Asignado a ${course} existosamente` });

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error al asignar al curso' })
    }
}

export const viewCourses = async (req, res) => {
    try {
        // ver los cursos
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los cursos.' });
    }
} 

export const editProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        student.username = req.body.username || student.username;
        student.email = req.body.email || student.email;
        await student.save();
        res.status(200).json({ message: 'Perfil actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar' });
    }
}

export const deleteProfile = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'Perfil eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar' });
    }
}
