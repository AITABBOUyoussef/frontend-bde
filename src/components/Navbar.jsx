import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

export default function Navbar() {
    const navigate = useNavigate();
    
    // كنجبدو اليوزر من LocalStorage
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
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* 1. Logo (الشعار) */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-3xl transform group-hover:scale-110 transition-transform duration-200">🎟️</span>
                        <span className="font-extrabold text-2xl text-gray-900 tracking-tight">
                            BDE <span className="text-emerald-600">Events</span>
                        </span>
                    </Link>
                    
                    {/* 2. Navigation Links (الروابط على حساب الـ Role) */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {user ? (
                            user.role === 'admin' ? (
                                /* روابـــــــــط الأدمـــــــــن */
                                <Link 
                                    to="/admin/dashboard" 
                                    className="text-gray-600 hover:text-emerald-600 font-bold transition-colors py-2"
                                >
                                    Tableau de bord
                                </Link>
                            ) : (
                                /* روابـــــــــط الطالـــــــــب */
                                <>
                                    <Link 
                                        to="/student/dashboard" 
                                        className="text-gray-600 hover:text-emerald-600 font-bold transition-colors py-2"
                                    >
                                        Événements
                                    </Link>
                                    <Link 
                                        to="/student/ticket" 
                                        className="text-gray-600 hover:text-emerald-600 font-bold transition-colors py-2"
                                    >
                                        Mes billets
                                    </Link>
                                </>
                            )
                        ) : null}
                    </div>
                    
                    {/* 3. User Actions (تسجيل الدخول / الخروج / البروفايل) */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4 sm:gap-6">
                                
                                {/* معلومات اليوزر (Avatar) */}
                                <div className="hidden sm:flex items-center gap-3 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shadow-sm">
                                        {/* كناخدو الحرف الأول من السمية، وإيلا مالقيناهاش كنديرو U */}
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 pr-2">
                                        {user.name || 'Utilisateur'}
                                    </span>
                                </div>

                                {/* بوطونة تسجيل الخروج */}
                                <button 
                                    onClick={handleLogout} 
                                    className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg font-bold transition-all duration-200"
                                    title="Se déconnecter"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    <span className="hidden md:inline">Déconnexion</span>
                                </button>
                            </div>
                        ) : (
                            /* بوطونة تسجيل الدخول (للناس لي ممكونيكطينش) */
                            <Link 
                                to="/login" 
                                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                            >
                                <span>Se connecter</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                </svg>
                            </Link>
                        )}
                    </div>
                    
                </div>
            </div>
        </nav>
    );
}