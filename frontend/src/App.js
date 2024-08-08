import './App.css';
import Login from './pages/login';
import Register from './pages/register'; // Import the Register component
import Home from './pages/home';
import Profile from './pages/profile';
import AddCourse from './pages/addcourse';
import Infcurso from './pages/infcurso';
import EditCourse from './pages/editCourse';
import ProtectedRoute from './pages/components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/addcourse' element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
        <Route path="/editcourse/:courseId" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
        <Route path="/course/:courseId" element={<ProtectedRoute><Infcurso /></ProtectedRoute>} />
       
      </Routes>
    </Router>
  );
}

export default App;
