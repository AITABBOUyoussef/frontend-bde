
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export default function Tickets(){
   
    const [tickets , setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const getTickets = async ()=>{
        try{
      const result = await axiosInstance.get('/tickets'); 
                setTickets(result.data.data);
                // console.log(result.data.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des billets", error);
            } finally {
                setIsLoading(false);
            }
    }
 
    useEffect(()=>{
        getTickets();
       
    }, []);
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // دالة باش نقادو الفورما ديال الساعة (مثلا من 14:30:00 لـ 14:30)
    const formatTime = (timeString) => {
        return timeString ? timeString.substring(0, 5) : '';
    };

    if (isLoading) {
        return <div className="text-center py-12">Chargement de vos billets...</div>;
    }

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                
                {/* Header (عوض x-slot) */}
                <h2 className="font-extrabold text-2xl text-gray-800 leading-tight flex items-center gap-2 mb-8">
                    🎟️ Mes Billets & Réservations
                </h2>

                <div className="mb-8">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide">Vos Pass Numériques</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Retrouvez ici tous les tickets des événements auxquels vous êtes inscrit.
                    </p>
                </div>

                {/* Grid ديال les Tickets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tickets.length > 0 ? (
                        tickets.map((reservation) => (
                            <div key={reservation.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 flex flex-col justify-between transform transition hover:scale-[1.02]">
                                
                                {/* Header ديال l-Ticket */}
                                <div className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-5 text-white flex justify-between items-center">
                                    <div>
                                        <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/30">
                                            Validé
                                        </span>
                                        <h4 className="text-xl font-black mt-2 leading-tight">
                                            {reservation.event?.titre || 'Événement supprimé'}
                                        </h4>
                                    </div>
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-inner shrink-0 ml-4">
                                        <span className="text-green-600 font-black text-xs">BDE</span>
                                    </div>
                                </div>

                                {/* Details ديال l-Event */}
                                <div className="p-6 space-y-3 text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <span>
                                            {formatDate(reservation.event?.date)} à {formatTime(reservation.event?.heure)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <span>{reservation.event?.lieu}</span>
                                    </div>
                                </div>

                                {/* Separateur مقطع (Dashed) */}
                                <div className="relative flex items-center px-4">
                                    <div className="h-5 w-5 bg-gray-50 rounded-full absolute -left-2.5 shadow-inner"></div>
                                    <div className="h-5 w-5 bg-gray-50 rounded-full absolute -right-2.5 shadow-inner"></div>
                                    <div className="w-full border-t-2 border-dashed border-gray-200"></div>
                                </div>

                                {/* Footer ديال l-Ticket (Code unique) */}
                                <div className="bg-gray-50 p-6 text-center">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">
                                        Code de Réservation
                                    </p>
                                    <div className="bg-white border border-gray-300 py-2.5 px-4 rounded-xl shadow-sm inline-block w-full">
                                        <span className="text-xl font-black text-gray-900 tracking-widest font-mono">
                                            {reservation.reservation_code}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        /* إيلا ما كان عندو حتى réservation (@empty) */
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
                            <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Aucun billet pour le moment</h3>
                            <p className="text-gray-500 mb-6">
                                Vous n'avez encore réservé aucune place pour les événements à venir.
                            </p>
                            
                            {/* الرابط لصفحة الأحداث */}
                            <Link 
                                to="/student/dashboard" 
                                className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition"
                            >
                                Découvrir les événements
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}