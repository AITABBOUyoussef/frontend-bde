import { useState, useEffect } from "react"; 
import { Link } from 'react-router-dom';
import axiosInstance from "../api/axios";
import { 
    ShieldCheck, 
    PlusCircle, 
    AlertTriangle, 
    CalendarCheck, 
    CalendarDays, 
    Clock, 
    MapPin, 
    Users, 
    Inbox,
    Loader2,
    Eye,
    X,
    AlignLeft,
    Ticket
} from "lucide-react";

export default function AdminDashboard() {
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    // --- NOUVEAU STATE POUR LE MODAL ---
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const getevents = async () => {
            try {
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
                setIsLoading(false);
            }
        };
        getevents();
    }, []);

    // --- LOADING STATE ---
    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-slate-50/50 font-sans">
                <div className="relative flex justify-center items-center mb-6">
                    <div className="absolute w-20 h-20 bg-amber-100 rounded-full animate-ping opacity-60"></div>
                    <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-amber-50">
                        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" strokeWidth={2.5} />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 animate-pulse tracking-wide">
                    Chargement de l'espace admin...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 py-10 font-sans relative overflow-hidden">
            
            {/* Background Blob */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none z-0" style={{ animationDuration: '12s' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white mb-8 gap-6 transition-all">
                    
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center shadow-inner transform transition-transform hover:scale-105 duration-300">
                            <ShieldCheck className="w-8 h-8" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
                                Espace Administrateur
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                Gérez et supervisez tous les événements de la plateforme.
                            </p>
                        </div>
                    </div>
                    
                    <Link 
                        to="/admin/addevents" 
                        className="group w-full md:w-auto bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold py-3.5 px-7 rounded-2xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
                    >
                        <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" strokeWidth={2.5} />
                        <span>Créer un événement</span>
                    </Link>
                </div>

                {/* --- ERROR MESSAGE --- */}
                {errorMessage && (
                    <div className="mb-8 bg-red-50 border border-red-100 p-5 rounded-2xl shadow-sm flex items-start gap-4 animate-headshake">
                        <AlertTriangle className="w-6 h-6 text-red-500 mt-0.5 shrink-0" strokeWidth={2} />
                        <div>
                            <p className="font-bold text-red-800 text-sm mb-0.5">Erreur</p>
                            <span className="text-red-700 font-medium text-sm">{errorMessage}</span>
                        </div>
                    </div>
                )}

                {/* --- DATA TABLE --- */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th scope="col" className="px-6 py-5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                                        Événement & Détails
                                    </th>
                                    <th scope="col" className="px-6 py-5 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                                        Date & Lieu
                                    </th>
                                    <th scope="col" className="px-6 py-5 text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                                        Capacité
                                    </th>
                                    <th scope="col" className="px-6 py-5 text-right text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                          
                            <tbody className="bg-white divide-y divide-slate-50">
                                {events.length > 0 ? (
                                    events.map((e) => (
                                        <tr key={e.id} className="hover:bg-slate-50/80 transition-colors duration-200 group">
                                            
                                            {/* Column 1: Event & Price */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors flex items-center justify-center text-slate-500 border border-slate-200 group-hover:border-slate-800 shrink-0">
                                                        <CalendarCheck className="w-6 h-6" strokeWidth={1.5} />
                                                    </div>
                                                    <div className="flex flex-col max-w-[180px] sm:max-w-xs">
                                                        <div className="text-base font-bold text-slate-900 mb-1 truncate" title={e.titre}>
                                                            {e.titre}
                                                        </div>
                                                        <div className="flex">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${e.prix > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                                                {e.prix > 0 ? `${e.prix} DH` : 'Gratuit'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                              
                                            {/* Column 2: Date & Location */}
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex flex-col gap-2 max-w-[150px] sm:max-w-[200px]">
                                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800 truncate">
                                                        <CalendarDays className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={2} />
                                                        <span className="truncate">{e.date}</span>
                                                        <span className="text-slate-300 mx-1 shrink-0">|</span>
                                                        <Clock className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={2} />
                                                        <span className="truncate">{e.heure}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium truncate" title={e.lieu}>
                                                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={2} />
                                                        <span className="truncate">{e.lieu}</span>
                                                    </div>
                                                </div>
                                            </td>
                                             
                                            {/* Column 3: Capacity */}
                                            <td className="px-6 py-5 whitespace-nowrap text-center">
                                                <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 shadow-sm">
                                                    <Users className="w-4 h-4" strokeWidth={2} />
                                                    {e.jauge_maximale} Places
                                                </span>
                                            </td>

                                            {/* Column 4: Actions (View More BUTTON NOW) */}
                                            <td className="px-6 py-5 whitespace-nowrap text-right">
                                                <button 
                                                    onClick={() => setSelectedEvent(e)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-700 hover:bg-slate-900 hover:text-amber-400 border border-slate-200 hover:border-slate-900 shadow-sm transition-all duration-300 font-semibold text-sm"
                                                    title="Voir les détails"
                                                >
                                                    <Eye className="w-4 h-4" strokeWidth={2} />
                                                    <span className="hidden sm:inline">Détails</span>
                                                </button>
                                            </td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    /* --- EMPTY STATE --- */
                                    <tr>
                                        <td colSpan="4" className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center animate-fade-in-up">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                                    <Inbox className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
                                                </div>
                                                <p className="text-xl font-bold text-slate-900 mb-1">Aucun événement</p>
                                                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                                                    Votre tableau de bord est vide. Créez votre premier événement pour commencer.
                                                </p>
                                                <Link 
                                                    to="/admin/addevents" 
                                                    className="mt-6 text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group"
                                                >
                                                    <PlusCircle className="w-4 h-4" />
                                                    Créer maintenant
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>

            {/* --- EVENT DETAILS MODAL (POPUP) --- */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    {/* Modal Content - fade-in-up animation */}
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up border border-slate-100 flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-6 py-4 border-b border-slate-100 flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900 pr-4">
                                    {selectedEvent.titre}
                                </h3>
                                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border bg-amber-50 text-amber-700 border-amber-200">
                                    {selectedEvent.prix > 0 ? `${selectedEvent.prix} DH` : 'Événement Gratuit'}
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedEvent(null)} 
                                className="p-2 bg-slate-100 hover:bg-red-100 rounded-full text-slate-500 hover:text-red-600 transition-colors shrink-0"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                
                                {/* Info blocks */}
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-amber-500 shrink-0">
                                        <CalendarDays className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Date & Heure</p>
                                        <p className="font-bold text-slate-800">{selectedEvent.date}</p>
                                        <p className="text-sm text-slate-500">{selectedEvent.heure}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-amber-500 shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Lieu</p>
                                        <p className="font-bold text-slate-800">{selectedEvent.lieu}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-amber-500 shrink-0">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Capacité Max</p>
                                        <p className="font-bold text-slate-800">{selectedEvent.jauge_maximale} Places</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-amber-500 shrink-0">
                                        <Ticket className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">ID Événement</p>
                                        <p className="font-mono text-sm font-bold text-slate-800">#{selectedEvent.id}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description Section (ila kanet kayna f l'API, sinnon 7itha wla khliha) */}
                            {selectedEvent.description && (
                                <div className="mt-2">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlignLeft className="w-5 h-5 text-slate-400" />
                                        <h4 className="font-bold text-slate-800 text-lg">Description</h4>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                                        {selectedEvent.description}
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 mt-auto rounded-b-3xl flex justify-end">
                            <button 
                                onClick={() => setSelectedEvent(null)}
                                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-slate-900/20"
                            >
                                Fermer
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}