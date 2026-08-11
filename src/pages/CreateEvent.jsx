import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

export default function AddEvent() {
    const navigate = useNavigate();
    
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [lieu, setLieu] = useState('');
    const [prix, setPrix] = useState('');
    const [jaugemaximale, setJaugemaximalen] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddEvent = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            await axiosInstance.post('/add-event', {
                titre: titre,
                description: description,
                date: date,
                heure: heure,
                lieu: lieu,
                prix: prix,
                jauge_maximale: jaugemaximale
            });
            navigate('/admin/dashboard');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Erreur de connexion avec le serveur');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 sm:p-12 transform transition-all">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-sm">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Créer un Nouvel Événement
                    </h2>
                    <p className="mt-3 text-sm text-gray-500 font-medium">
                        Remplissez les détails ci-dessous pour ajouter un événement à votre catalogue.
                    </p>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-red-700 font-medium text-sm">{errorMessage}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleAddEvent} className="space-y-6">
                    
                    {/* Titre */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Titre de l'événement <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            required 
                            placeholder="Ex: Soirée d'intégration BDE" 
                            maxLength={255} 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required 
                            rows="4"
                            placeholder="Décrivez l'événement en quelques mots..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800 resize-none"
                        ></textarea>
                    </div>

                    {/* Grid: Date & Heure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Date <span className="text-red-500">*</span></label>
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required 
                                min={new Date().toISOString().split('T')[0]} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800 cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Heure <span className="text-red-500">*</span></label>
                            <input 
                                type="time" 
                                value={heure}
                                onChange={(e) => setHeure(e.target.value)}
                                required 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Lieu */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Lieu <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                value={lieu}
                                onChange={(e) => setLieu(e.target.value)}
                                required 
                                placeholder="Ex: Amphi A, Campus Principal" 
                                maxLength={255} 
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Grid: Prix & Jauge */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Prix (DH) <span className="text-red-500">*</span></label>
                            <input 
                                type="number" 
                                value={prix}
                                onChange={(e) => setPrix(e.target.value)}
                                required 
                                placeholder="0.00" 
                                min="0" 
                                step="0.1" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Capacité Max <span className="text-red-500">*</span></label>
                            <input 
                                type="number" 
                                value={jaugemaximale}
                                onChange={(e) => setJaugemaximalen(e.target.value)}
                                required 
                                placeholder="Ex: 100" 
                                min="1" 
                                step="1" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Submit & Cancel Buttons (مجموعة بالـ Flex) */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        
                        {/* بوطونة الإلغاء (Annuler) */}
                        <button 
                            type="button" 
                            onClick={() => navigate('/admin/dashboard')} // كترجعك للـ Dashboard
                            className="w-full sm:w-1/3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            <span>Annuler</span>
                        </button>

                        {/* بوطونة الإضافة */}
                        <button 
                            type="submit" 
                            className="w-full sm:w-2/3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            <span>Ajouter l'événement</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}