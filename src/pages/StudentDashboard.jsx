import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [reservations, setReservations] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
  
    const [isLoading, setIsLoading] = useState(true);

    const getReservations = async () => {
        try {
            const result = await axiosInstance.get('/reservations');
            setReservations(result.data.data);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erreur de connexion avec le serveur");
            }
        } finally {
              setIsLoading(false);
        }
    }

    const reserve = async (id) => {
        try {
            setErrorMessage("");
            await axiosInstance.post('/reserv', {
                event_id: id
            });
            getReservations();
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Erreur sur le serveur');
            }
        }
    };

    const toTickets = () => {
        navigate('/student/ticket');
    };

    useEffect(() => {
        getReservations();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
                <div className="relative">
                    <div className="w-20 h-20 border-green-200 border-8 rounded-full"></div>
                    <div className="w-20 h-20 border-green-600 border-8 rounded-full absolute top-0 left-0 border-t-transparent animate-spin"></div>
                </div>
                <h2 className="mt-6 text-xl font-bold text-gray-700 animate-pulse tracking-wide">
                    Chargement des événements...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            
             <div className="bg-gradient-to-r from-green-600 to-emerald-800 py-16 px-8 text-center shadow-lg rounded-b-[3rem] mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                    Bienvenue dans votre Espace
                </h1>
                <p className="text-green-100 text-lg max-w-2xl mx-auto font-medium">
                    Découvrez nos prochains événements et réservez votre place en un seul clic.
                </p>
            </div>
     {errorMessage && (
                <div className="max-w-3xl mx-auto mb-8 px-4">
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <span className="font-medium">{errorMessage}</span>
                    </div>
                </div>
            )}
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reservations.map((e) => (
                        <div key={e.id} className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col relative transform hover:-translate-y-1">
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-5">
                                    <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors">
                                        {e.titre}
                                    </h4>
                                    <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${e.prix > 0 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                                        {e.prix > 0 ? e.prix + ' DH' : 'Gratuit'}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 text-sm line-clamp-2 mb-6 leading-relaxed" title={e.description}>
                                    {e.description}
                                </p>

                                <div className="space-y-4 text-sm font-medium text-gray-700 bg-gray-50 p-4 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded-xl text-green-600 shadow-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <span>{e.date} à {e.heure}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded-xl text-green-600 shadow-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <span>{e.lieu}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-auto">
                                  {e.event_id === e.id && e.reserveBy === user?.id ? (
                                    <button 
                                        type="button"
                                        onClick={() => toTickets()} 
                                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                                    >
                                        <span>Voir mon ticket</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                                        </svg>
                                    </button>
                                ) : e.jauge_maximale <= 0 ? (
                                    <button 
                                        type="button" 
                                        disabled
                                        className="w-full bg-gray-100 text-gray-400 border border-gray-200 font-bold py-3.5 px-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <span>Événement complet</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                    </button>
                                ) : (
                                    <button 
                                        type="button"
                                        onClick={() => reserve(e.id)} 
                                        className="w-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 font-bold py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                                    >
                                        <span>Réserver ma place</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}