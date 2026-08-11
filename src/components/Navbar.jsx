import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Login from '../pages/Login';

export default function Navbar() {
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
             await axiosInstance.post('/logout');
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        } finally {
             localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate('/login');
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              
                <Link to="/" className="text-xl font-bold">BDE Events</Link>
                
              
                <div className="flex space-x-4 items-center">
                    
                
                    {user ? (
                        user.role === 'admin' ? (
                            <Link to="/admin/dashboard" className="hover:underline">Tableau de bord</Link>
                        ) : (
                            <div className='gap-5 flex '>
                            <Link to="/student/dashboard" className="hover:underline">Home </Link>
                            <Link to="/student/ticket" className="hover:underline">Mes billets</Link>
                           </div>
                        )
                    ) : null}
                    
                   {user ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
                        >
                            Déconnexion
                        </button>
                    ) :    <button 
                            onClick={Login} 
                            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
                        >
                            Login
                        </button>}
                </div>
            </div>
        </nav>
    );
}
