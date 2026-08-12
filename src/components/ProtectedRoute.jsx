import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children, allowedRole}){
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
        if(!token || !user){
            return <Navigate to="/login" />;
        } 
        if(user.role !== allowedRole){
            return <Navigate to={`/${user.role}/dashboard`}  />;
        }
        return children;
} 