import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

export default function Login(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [errorMessage, setErrorMessage]=useState('');
    const navigate = useNavigate();
    const handleLogin = async(e)=>{
        e.preventDefault();
        setErrorMessage('');
        try{
            const response = await axiosInstance.post('/login', {
                email : email ,
                password : password
            });
            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem('token', token);
            localStorage.setItem('user',JSON.stringify(user));
            if(user.role ==='admin'){
                navigate('/admin/dashboard');
            }else{
                navigate('/student/dashboard');
            }
           
        }
        catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erreur lors de la déconnexion:")
            }
        }
    };
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Connexion</h2>
                
               {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input 
                            type="email" 
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Login
                    </button>
                </form>
            </div>
        </div>
    );

}