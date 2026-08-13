import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { 
    CalendarDays, 
    MapPin, 
    Clock, 
    Ticket, 
    XCircle, 
    ArrowRight, 
    AlertTriangle, 
    Loader2,
    Sparkles,
    Eye,
    X,
    AlignLeft,
    Users
} from "lucide-react";

export default function StudentDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [reservations, setReservations] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const [reservingId, setReservingId] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // RJ3NA L /reservations BACH MAY3TICH ERREUR D'ADMIN
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
            setReservingId(id); 
            await axiosInstance.post('/reserv', {
                event_id: id
            });
            await getReservations(); 
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Erreur sur le serveur');
            }
        } finally {
            setReservingId(null); 
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
            <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-slate-50 font-sans">
                <div className="relative flex justify-center items-center mb-6">
                    <div className="absolute w-20 h-20 bg-emerald-100 rounded-full animate-ping opacity-60"></div>
                    <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-emerald-50">
                        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" strokeWidth={2.5} />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 animate-pulse tracking-wide">
                    Chargement des événements...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12 relative">
            
            {/* --- HERO SECTION --- */}
            <div className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-green-900 pt-16 pb-32 px-4 sm:px-6 lg:px-8 text-center shadow-2xl rounded-b-[3rem] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                    <div className="absolute top-20 -right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm mb-6">
                        <Sparkles className="w-4 h-4 text-emerald-200" />
                        <span>Votre espace étudiant</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Vivez vos meilleures <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-yellow-200">
                            expériences
                        </span>
                    </h1>
                    <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Découvrez nos prochains événements, rejoignez vos amis et réservez votre place en un seul clic.
                    </p>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20">
                
                {errorMessage && (
                    <div className="mb-8 max-w-3xl mx-auto bg-white p-1 rounded-2xl shadow-lg animate-headshake">
                        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 shrink-0 text-red-500 mt-0.5" strokeWidth={2} />
                            <div>
                                <p className="font-bold text-red-800 text-sm mb-0.5">Erreur</p>
                                <span className="font-medium text-sm">{errorMessage}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reservations.map((e) => (
                        <div key={e.id} className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-emerald-500/10 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col transform hover:-translate-y-1 group relative">
                            
                            {/* Card Content */}
                            <div className="p-6 sm:p-8 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-4 gap-2">
                                    <h4 className="text-2xl font-extrabold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2 pr-2" title={e.titre}>
                                        {e.titre}
                                    </h4>
                                    
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <button 
                                            onClick={() => setSelectedEvent(e)}
                                            className="p-2 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-colors border border-slate-100 shadow-sm"
                                            title="Voir les détails"
                                        >
                                            <Eye className="w-5 h-5" strokeWidth={2} />
                                        </button>
                                        <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-xs font-bold border ${e.prix > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                            {e.prix > 0 ? e.prix + ' DH' : 'Gratuit'}
                                        </span>
                                    </div>
                                </div>
                                
                                <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed" title={e.description}>
                                    {e.description}
                                </p>

                                <div className="mt-auto space-y-3 text-sm font-semibold text-slate-700 bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded-xl text-emerald-500 shadow-sm border border-slate-100 shrink-0">
                                            <CalendarDays className="w-4.5 h-4.5" strokeWidth={2} />
                                        </div>
                                        <span className="truncate">{e.date} <span className="text-slate-400 font-normal mx-1">à</span> {e.heure}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded-xl text-emerald-500 shadow-sm border border-slate-100 shrink-0">
                                            <MapPin className="w-4.5 h-4.5" strokeWidth={2} />
                                        </div>
                                        <span className="truncate" title={e.lieu}>{e.lieu}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="p-6 pt-0">
                                {e.event_id === e.id && e.reserveBy === user?.id ? (
                                    <button 
                                        type="button"
                                        onClick={() => toTickets()} 
                                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-4 rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
                                    >
                                        <Ticket className="w-5 h-5" strokeWidth={2.5} />
                                        <span>Voir mon ticket</span>
                                    </button>
                                ) : e.jauge_maximale <= 0 ? (
                                    <button 
                                        type="button" 
                                        disabled
                                        className="w-full bg-slate-100 text-slate-400 border-2 border-slate-200 font-bold py-4 px-4 rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" strokeWidth={2.5} />
                                        <span>Complet</span>
                                    </button>
                                ) : (
                                    <button 
                                        type="button"
                                        onClick={() => reserve(e.id)} 
                                        disabled={reservingId === e.id}
                                        className={`group w-full font-bold py-4 px-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 ${
                                            reservingId === e.id 
                                            ? 'bg-emerald-600/70 text-white cursor-wait shadow-none'
                                            : 'bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-emerald-500/30'
                                        }`}
                                    >
                                        {reservingId === e.id ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                                                <span>Réservation...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Réserver ma place</span>
                                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {reservations.length === 0 && !isLoading && (
                        <div className="col-span-full bg-white rounded-[2rem] p-12 text-center shadow-lg border border-slate-100">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <CalendarDays className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun événement à venir</h3>
                            <p className="text-slate-500">Revenez plus tard pour découvrir nos prochains événements.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- EVENT DETAILS MODAL --- */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up border border-slate-100 flex flex-col">
                        
                        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-6 py-4 border-b border-slate-100 flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900 pr-4 leading-tight">
                                    {selectedEvent.titre}
                                </h3>
                                <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${selectedEvent.prix > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
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

                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-500 shrink-0">
                                        <CalendarDays className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Date & Heure</p>
                                        <p className="font-bold text-slate-800">{selectedEvent.date}</p>
                                        <p className="text-sm text-slate-500">{selectedEvent.heure}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-500 shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Lieu</p>
                                        <p className="font-bold text-slate-800">{selectedEvent.lieu}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-500 shrink-0">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Places Restantes</p>
                                        <p className="font-bold text-slate-800">
                                            {selectedEvent.jauge_maximale > 0 ? selectedEvent.jauge_maximale : "Complet"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {selectedEvent.description && (
                                <div className="mt-2">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlignLeft className="w-5 h-5 text-slate-400" />
                                        <h4 className="font-bold text-slate-800 text-lg">À propos de cet événement</h4>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                                        {selectedEvent.description}
                                    </p>
                                </div>
                            )}
                        </div>
                        
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