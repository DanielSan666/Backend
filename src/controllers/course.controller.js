import Course from '../models/course.model.js';

// Obtener todos los cursos
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un curso por ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Crear un curso
export const createCourse = async (req, res) => {
  const { title, description, duration } = req.body;
  try {
    const newCourse = new Course({ title, description, duration });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un curso
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, duration } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, duration },
      { new: true, runValidators: true }
    );
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un curso
export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
