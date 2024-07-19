import { Router } from 'express';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/course.controller.js';
import { adminRequired } from '../middlewares/adminRequired.js';

const router = Router();

router.get('/courses', getCourses);
router.post('/courses', adminRequired,createCourse);
router.put('/courses/:id', adminRequired,updateCourse);
router.delete('/courses/:id', adminRequired,deleteCourse);

export default router;
