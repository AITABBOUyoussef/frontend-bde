import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        <Route path="/admin/dashboard" 
        element={<ProtectedRoute allowedRole="admin">
          <AdminDashboard />
          </ProtectedRoute> } />
        <Route path="/student/dashboard" 
        element={ <ProtectedRoute allowedRole="student">
          <StudentDashboard />
        </ProtectedRoute> } />
      </Routes>
    </Router>
  );
}

export default App;