import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Tickets from "./Ticket";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [reservations , setReservations] = useState([]);
    // const [response , setResponse] = useState([]);
    const[errorMessage, setErrorMessage]=useState("");
    const getReservations = async ()=>{
        try {
            
            const result = await axiosInstance.get('/reservations');
            setReservations(result.data.data);
        }catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erreur de connexion avec le serveur");
            }
        }
    }
    const reserve= async(id)=>{
        try {
            setErrorMessage("");
  await axiosInstance.post('/reserv' , {
            event_id : id
        });
       getReservations();
           
           } catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('error sur serve')
            }
        }
    };
    const toTickets = () => {
        navigate('/student/ticket');
    };
    useEffect(()=>{
        getReservations();
       
    }, []);
   return (
        <div>
            <div className="p-8 text-center">
                <h1 className="text-3xl font-bold text-green-600">Welcome Student</h1>
            </div>

            {errorMessage && (
                <div className="text-red-500 text-center mb-4">{errorMessage}</div>
            )}

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reservations.map((e) => (
                    <div key={e.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col relative">
                        <div className="p-6 flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors">
                                    {e.titre}
                                </h4>
                                         <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${e.prix > 0 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                                    {e.prix > 0 ? e.prix + ' DH' : 'Gratuit'}
                                </span>
                            </div>
                                             <p className="text-gray-600 text-sm line-clamp-2 mb-6" title={e.description}>
                                {e.description}
                            </p>

                            <div className="space-y-3 text-sm font-medium text-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <span> {e.date} à {e.heure}</span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <span>{e.lieu}</span>
                                </div>
                                <div className="p-6 pt-0 mt-auto">
    {e.event_id === e.id && e.reserveBy === user.id ? (
        
       <button 
            type="button"
            onClick={() => toTickets()} 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2"
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
            className="w-full bg-gray-100 text-gray-400 border border-gray-200 font-bold py-3 px-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
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
            className="w-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
            <span>Réserver ma place</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
        </button>

    )}
</div>
                       
                            </div>
                        </div>
                    </div>
                  ))}
            </div> </div>
    );
}