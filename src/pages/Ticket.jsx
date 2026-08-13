import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import axiosInstance from "../api/axios";
import { 
    Loader2, 
    Ticket, 
    CalendarDays, 
    MapPin, 
    ArrowRight, 
    QrCode,
    CheckCircle2
} from "lucide-react";

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

    // --- MODERN LOADING STATE ---
    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-slate-50 font-sans">
                <div className="relative flex justify-center items-center mb-6">
                    <div className="absolute w-20 h-20 bg-emerald-100 rounded-full animate-ping opacity-60"></div>
                    <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-emerald-50">
                        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" strokeWidth={2.5} />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 animate-pulse tracking-wide">
                    Préparation de vos billets...
                </h2>
            </div>
        );
    }

    return (
        <div className="py-12 bg-slate-50 min-h-screen font-sans relative overflow-hidden">
            
            {/* Background Decorative Blob */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none z-0" style={{ animationDuration: '10s' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* --- HEADER --- */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
                    <div>
                        <h2 className="font-extrabold text-3xl md:text-4xl text-slate-900 leading-tight flex items-center gap-4 mb-3">
                            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 shadow-sm">
                                <Ticket className="w-8 h-8" strokeWidth={2} />
                            </div>
                            Mes Billets
                        </h2>
                        <p className="text-base text-slate-500 font-medium max-w-xl">
                            Retrouvez et gérez tous vos pass numériques en un seul endroit.
                        </p>
                    </div>
                    
                    {/* Active Tickets Counter */}
                    <div className="inline-flex items-center gap-3 bg-white border border-emerald-100 text-emerald-800 px-5 py-3 rounded-2xl font-bold text-sm shadow-sm">
                        <span className="relative flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                        </span>
                        {tickets.length} Billet{tickets.length > 1 ? 's' : ''} actif{tickets.length > 1 ? 's' : ''}
                    </div>
                </div>

                {/* --- TICKETS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tickets.length > 0 ? (
                        tickets.map((reservation) => (
                            <div key={reservation.id} className="animate-fade-in-up">
                                {/* REALISTIC TICKET CARD */}
                                <div className="bg-transparent flex flex-col transform hover:-translate-y-2 transition-transform duration-300 group">
                                    
                                    {/* TOP SECTION (Header of Ticket) */}
                                    <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-t-[2rem] px-8 py-7 text-white relative overflow-hidden shadow-lg">
                                        {/* Decorative circle pattern inside ticket */}
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
                                        
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20 shadow-sm">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Validé
                                                </span>
                                                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                                    <Ticket className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                            <h4 className="text-2xl font-black leading-tight drop-shadow-sm mb-1 line-clamp-2" title={reservation.event?.titre}>
                                                {reservation.event?.titre || 'Événement supprimé'}
                                            </h4>
                                        </div>
                                    </div>
                                    
                                    {/* MIDDLE SECTION (The Cutout & Dashed Line) */}
                                    <div className="relative bg-white h-8 flex items-center shadow-sm z-10">
                                        {/* Left Notch (Color matches the page background bg-slate-50) */}
                                        <div className="absolute -left-4 w-8 h-8 bg-slate-50 rounded-full shadow-inner border-r border-slate-100"></div>
                                        
                                        {/* Dashed Line */}
                                        <div className="w-full border-t-2 border-dashed border-slate-200 mx-6"></div>
                                        
                                        {/* Right Notch */}
                                        <div className="absolute -right-4 w-8 h-8 bg-slate-50 rounded-full shadow-inner border-l border-slate-100"></div>
                                    </div>

                                    {/* BOTTOM SECTION (Info & Code) */}
                                    <div className="bg-white rounded-b-[2rem] px-8 py-7 shadow-lg flex-grow flex flex-col border-b border-x border-slate-100">
                                        <div className="space-y-5 mb-8">
                                            
                                            {/* Date & Time */}
                                            <div className="flex items-center gap-4">
                                                <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 border border-slate-100 shrink-0">
                                                    <CalendarDays className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Date & Heure</span>
                                                    <span className="text-slate-900 font-bold">
                                                        {formatDate(reservation.event?.date)} <span className="text-slate-400 font-normal mx-1">à</span> {formatTime(reservation.event?.heure)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-center gap-4">
                                                <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 border border-slate-100 shrink-0">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Lieu</span>
                                                    <span className="text-slate-900 font-bold line-clamp-1" title={reservation.event?.lieu}>
                                                        {reservation.event?.lieu}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reservation Code */}
                                        <div className="mt-auto text-center pt-5 border-t border-slate-100">
                                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                                                Code de Réservation
                                            </p>
                                            <div className="bg-slate-50 border border-slate-200 py-3.5 px-4 rounded-2xl flex justify-center items-center gap-3">
                                                <QrCode className="w-6 h-6 text-emerald-600" strokeWidth={1.5} />
                                                <span className="text-xl font-black text-slate-900 tracking-[0.2em] font-mono">
                                                    {reservation.reservation_code}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        /* --- EMPTY STATE --- */
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-slate-100 p-16 text-center flex flex-col items-center justify-center animate-fade-in-up">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-emerald-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                <div className="relative w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
                                    <Ticket className="w-12 h-12" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Aucun billet pour le moment</h3>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto text-base">
                                Votre portefeuille de billets est vide. Découvrez nos prochains événements et réservez votre place !
                            </p>
                            
                            <Link 
                                to="/student/dashboard" 
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all transform active:scale-95"
                            >
                                <span>Découvrir les événements</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}