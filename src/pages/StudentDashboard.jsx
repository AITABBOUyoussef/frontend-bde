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
    Sparkles
} from "lucide-react";

export default function StudentDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [reservations, setReservations] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    // --- NOUVEAU STATE: Bach n3rfo ayna event rah kayt-réserva db ---
    const [reservingId, setReservingId] = useState(null);

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
            setReservingId(id); // <-- Kandeclariw bli bdina la réservation l had l'event
            await axiosInstance.post('/reserv', {
                event_id: id
            });
            await getReservations(); // Kantsnaw data jdida tji
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Erreur sur le serveur');
            }
        } finally {
            setReservingId(null); // <-- Kan-saliw l-animation dyal loading kima kant natija (success ola error)
        }
    };

    const toTickets = () => {
        navigate('/student/ticket');
    };

    useEffect(() => {
        getReservations();
    }, []);

    // --- LOADING STATE COMPLET DE LA PAGE ---
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
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            
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
                
                {/* Error Message */}
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
                        <div key={e.id} className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-emerald-500/10 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col transform hover:-translate-y-1 group">
                            
                            {/* Card Content */}
                            <div className="p-6 sm:p-8 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-4 gap-4">
                                    <h4 className="text-2xl font-extrabold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2" title={e.titre}>
                                        {e.titre}
                                    </h4>
                                    <span className={`shrink-0 inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-xs font-bold border ${e.prix > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                        {e.prix > 0 ? e.prix + ' DH' : 'Gratuit'}
                                    </span>
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

                            {/* Card Footer (Action Buttons) */}
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
                                    // --- BOUTON DE RÉSERVATION MÀJ AVEC LOADER ---
                                    <button 
                                        type="button"
                                        onClick={() => reserve(e.id)} 
                                        disabled={reservingId === e.id}
                                        className={`group w-full font-bold py-4 px-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 ${
                                            reservingId === e.id 
                                            ? 'bg-emerald-600/70 text-white cursor-wait shadow-none' // Style en cours de chargement
                                            : 'bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-emerald-500/30' // Style normal
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
        </div>
    );
}