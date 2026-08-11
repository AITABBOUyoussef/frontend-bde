import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // زدت هادي باش ما يطيحش ليك الكود
import axiosInstance from "../api/axios";

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getTickets = async () => {
        try {
            const result = await axiosInstance.get('/tickets');
            setTickets(result.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des billets", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getTickets();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const formatTime = (timeString) => {
        return timeString ? timeString.substring(0, 5) : '';
    };

    // 1. Loading Animation احترافية
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
                <div className="relative flex justify-center items-center">
                    <div className="w-24 h-24 border-emerald-200 border-[6px] border-dashed rounded-full animate-[spin_3s_linear_infinite]"></div>
                    <div className="w-24 h-24 border-emerald-600 border-[6px] rounded-full absolute top-0 left-0 border-t-transparent animate-spin"></div>
                    <span className="absolute text-emerald-600 text-3xl">🎟️</span>
                </div>
                <h2 className="mt-8 text-xl font-bold text-gray-700 animate-pulse tracking-wide">
                    Préparation de vos billets...
                </h2>
            </div>
        );
    }

    // 2. الواجهة الرئيسية
    return (
        <div className="py-12 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900 leading-tight flex items-center gap-3 mb-2">
                            <span className="text-4xl drop-shadow-md">🎟️</span> Mes Billets
                        </h2>
                        <p className="text-base text-gray-500 font-medium">
                            Retrouvez et gérez tous vos pass numériques en un seul endroit.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold text-sm shadow-sm">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        {tickets.length} Billet(s) actif(s)
                    </div>
                </div>

                {/* Grid ديال les Tickets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tickets.length > 0 ? (
                        tickets.map((reservation) => (
                            <div key={reservation.id} className="bg-white rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between transform hover:-translate-y-2 border border-gray-100 relative group">
                                
                                {/* Header ديال l-Ticket بـ Gradient */}
                                <div className="bg-gradient-to-br from-emerald-500 to-green-700 px-8 py-6 text-white flex justify-between items-start relative overflow-hidden">
                                    {/* ديكورات فالخلفية ديال التيكي */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 transform group-hover:scale-150 transition-transform duration-700"></div>
                                    
                                    <div className="relative z-10 w-full">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/40 shadow-sm">
                                                Validé
                                            </span>
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-emerald-600 font-black text-xs">BDE</span>
                                            </div>
                                        </div>
                                        <h4 className="text-2xl font-black leading-tight drop-shadow-md">
                                            {reservation.event?.titre || 'Événement supprimé'}
                                        </h4>
                                    </div>
                                </div>

                                {/* Details ديال l-Event */}
                                <div className="px-8 py-6 space-y-4 text-sm font-medium text-gray-700 bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Date & Heure</span>
                                            <span className="text-gray-900 font-bold">
                                                {formatDate(reservation.event?.date)} à {formatTime(reservation.event?.heure)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Lieu</span>
                                            <span className="text-gray-900 font-bold">{reservation.event?.lieu}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Separateur واقعي بحال ورقة مقطوعة */}
                                <div className="relative flex items-center px-4 bg-white">
                                    {/* هاد الجوج دوائر كيعطيو داك الديكور ديال التيكي مقطوع من الجناب */}
                                    <div className="h-8 w-8 bg-slate-50 rounded-full absolute -left-4 shadow-inner border-r border-gray-100 z-10"></div>
                                    <div className="h-8 w-8 bg-slate-50 rounded-full absolute -right-4 shadow-inner border-l border-gray-100 z-10"></div>
                                    <div className="w-full border-t-2 border-dashed border-gray-200"></div>
                                </div>

                                {/* Footer ديال l-Ticket (Code unique) */}
                                <div className="bg-white px-8 py-6 text-center">
                                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-3">
                                        Code de Réservation
                                    </p>
                                    <div className="bg-gray-50 border border-gray-200 py-3 px-4 rounded-2xl flex justify-center items-center gap-3">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                                        </svg>
                                        <span className="text-xl font-black text-gray-900 tracking-widest font-mono">
                                            {reservation.reservation_code}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        /* Empty State أنيق بزاف */
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center flex flex-col items-center justify-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-emerald-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                <div className="relative w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun billet pour le moment</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                                Votre portefeuille de billets est vide. Découvrez nos prochains événements et réservez votre place !
                            </p>
                            
                            <Link 
                                to="/student/dashboard" 
                                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1"
                            >
                                Découvrir les événements
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}