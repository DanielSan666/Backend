import { Router } from 'express';
import { getCourses, createCourse, updateCourse, deleteCourse, getCourseById } from '../controllers/course.controller.js';

const router = Router();

router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

export default router;
