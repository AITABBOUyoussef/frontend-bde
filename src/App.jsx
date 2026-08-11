import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AddEvent from './pages/CreateEvent';
import Tickets from './pages/Ticket';

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
            <Route path="/admin/addevents" 
        element={<ProtectedRoute allowedRole="admin">
          <AddEvent />
          </ProtectedRoute> } />
        <Route path="/student/dashboard" 
        element={ <ProtectedRoute allowedRole="student">
          <StudentDashboard />
          
        </ProtectedRoute> } />
            <Route path="/student/ticket" 
        element={ <ProtectedRoute allowedRole="student">
          <Tickets />
          
        </ProtectedRoute> } />
      </Routes>
    </Router>
  );
}

export default App;