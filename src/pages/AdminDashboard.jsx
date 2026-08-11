import { useState, useEffect } from "react"; 
import { Link } from 'react-router-dom';
import axiosInstance from "../api/axios";

export default function AdminDashboard() {
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    
    // 1. زدنا حالة التحميل باش نديرو الـ Animation
    const [isLoading, setIsLoading] = useState(true);

    // 2. قادينا useEffect باش ميبقاش يطلع الخطأ الصفر فـ Console
    useEffect(() => {
        const getevents = async () => {
            try {
                // كنبداو التحميل
                setIsLoading(true);
                
                const result = await axiosInstance.get('/events');
                setEvents(result.data.data); 
            } catch (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("Erreur de connexion avec le serveur");
                }
            } finally {
                // كنساليو التحميل
                setIsLoading(false);
            }
        };

        getevents();
    }, []);

    // 3. شاشة التحميل الاحترافية
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
                <div className="relative flex justify-center items-center">
                    <div className="w-24 h-24 border-red-200 border-[6px] border-dashed rounded-full animate-[spin_3s_linear_infinite]"></div>
                    <div className="w-24 h-24 border-red-600 border-[6px] rounded-full absolute top-0 left-0 border-t-transparent animate-spin"></div>
                    <span className="absolute text-red-600 text-3xl">⚙️</span>
                </div>
                <h2 className="mt-8 text-xl font-bold text-gray-700 animate-pulse tracking-wide">
                    Chargement du tableau de bord...
                </h2>
            </div>
        );
    }

    // 4. الواجهة الرئيسية (Admin Dashboard)
    return (
        <div className="min-h-screen bg-slate-50 py-10 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-inner">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Espace Administrateur</h1>
                            <p className="text-sm text-gray-500 font-medium">Gérez tous les événements de la plateforme</p>
                        </div>
                    </div>
                    
                    {/* بوطونة الإضافة */}
                    <Link 
                        to="/admin/addevents" 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-red-500/30 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        <span>Créer un événement</span>
                    </Link>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-red-700 font-medium">{errorMessage}</span>
                    </div>
                )}

                {/* Table Container */}
                <div className="bg-white rounded-[2rem] shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            {/* عناوين الطابلو */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Événement & Prix
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Date & Lieu
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Capacité
                                    </th>
                                </tr>
                            </thead>
                            
                            {/* محتوى الطابلو */}
                            <tbody className="bg-white divide-y divide-gray-100">
                                {events.length > 0 ? (
                                    events.map((e) => (
                                        <tr key={e.id} className="hover:bg-slate-50 transition-colors duration-200">
                                            
                                            {/* Column 1: Titre & Prix */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-base font-bold text-gray-900">{e.titre}</div>
                                                        <div className={`text-sm font-bold mt-1 ${e.prix > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                            {e.prix > 0 ? `${e.prix} DH` : 'Gratuit'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* Column 2: Date & Lieu */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900 mb-1">
                                                    {e.date} à {e.heure}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    </svg>
                                                    {e.lieu}
                                                </div>
                                            </td>
                                            
                                            {/* Column 3: Jauge */}
                                            <td className="px-6 py-5 whitespace-nowrap text-center">
                                                <span className="px-4 py-2 inline-flex items-center gap-1.5 text-xs leading-5 font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                                    </svg>
                                                    Places Max : {e.jauge_maximale}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State ديال الطابلو */
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                                </svg>
                                                <p className="text-lg font-medium text-gray-900">Aucun événement</p>
                                                <p className="text-sm">Il n'y a pas d'événements à afficher pour le moment.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    );
}