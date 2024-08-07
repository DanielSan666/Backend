import Course from "../models/course.model.js";
import User from "../models/user.model.js";

// Obtener todos los cursos
export const getCourses = async (req, res) => {
  const { filterUserCourses } = req.query;
  try {
    if (filterUserCourses) {
      const user = await User.findById(filterUserCourses);
      if (!user) return res.status(404).json({ message: "User not found" });

      console.log(user.courses);

      const courses = await Course.find({ _id: { $nin: user.courses } });
      return res.json(courses);
    }
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCoursesByUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).populate("courses");

  return res.json(user.courses);
};

// Obtener un curso por ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un curso
export const createCourse = async (req, res) => {
  const { title, description, duration, amount } = req.body;
  try {
    const newCourse = new Course({ title, description, duration, amount });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un curso
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, amount } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, duration, amount },
      { new: true, runValidators: true },
    );
    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });
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
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCoursesToUser = async (req, res) => {
  const { id } = req.params;

  const { userId } = req.body;

  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.courses.includes(course._id))
      return res.status(400).json({ message: "Course already added" });

    user.courses.push(course);

    await user.save();

    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
