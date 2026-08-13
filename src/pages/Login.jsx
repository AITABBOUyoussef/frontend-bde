import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { Ticket, Mail, Lock, LogIn, AlertTriangle } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await axiosInstance.post('/login', {
                email: email,
                password: password
            });
            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/student/dashboard');
            }

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                 setErrorMessage("Erreur de connexion avec le serveur."); 
            }
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-50 font-sans overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
            
            {/* Background Animations */}
            <div className="absolute top-0 -left-10 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse pointer-events-none z-0" style={{ animationDuration: '8s' }}></div>
            <div className="absolute top-1/2 -right-20 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-pulse pointer-events-none z-0" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
            <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse pointer-events-none z-0" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
            
            {/* Content Container */}
            <div className="relative z-10 max-w-md w-full animate-fade-in-up">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-emerald-600 shadow-lg mb-6 border border-emerald-50 transform -rotate-3 transition-transform hover:rotate-0 duration-300">
                        <Ticket className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Bienvenue !
                    </h2>
                    <p className="mt-2 text-base text-gray-500 font-medium">
                        Connectez-vous pour accéder à votre espace
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white/90 backdrop-blur-xl py-10 px-8 sm:px-10 shadow-2xl rounded-[2.5rem] border border-gray-100">

                    <h3 className="text-xl font-bold text-gray-800 mb-8 text-center sm:text-left">
                        Connexion à votre espace
                    </h3>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start">
                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" strokeWidth={2} />
                            <span className="text-red-700 font-medium text-sm">{errorMessage}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Adresse Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                                    <Mail className="h-5 w-5" strokeWidth={2} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="nom.prenom@ecole.com"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800 font-medium placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                                    <Lock className="h-5 w-5" strokeWidth={2} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800 font-medium tracking-widest placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="group w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center gap-2 text-lg"
                            >
                                <span>Se connecter</span>
                                <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5}/>
                            </button>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-8">
                    &copy; 2026 BDE Events. Tous droits réservés.
                </p>

            </div>
        </div>
    );
}