import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { 
    CalendarPlus, 
    Type, 
    AlignLeft, 
    CalendarDays, 
    Clock, 
    MapPin, 
    Coins, 
    Users, 
    AlertTriangle,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

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
        <div className="relative min-h-screen flex items-center justify-center bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
            
            {/* Background Premium Blob */}
            <div className="absolute top-0 -left-20 w-[30rem] h-[30rem] bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none z-0" style={{ animationDuration: '10s' }}></div>
            <div className="absolute bottom-0 -right-20 w-[30rem] h-[30rem] bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none z-0" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>

            {/* Main Form Card */}
            <div className="relative z-10 max-w-3xl w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white p-8 sm:p-12 animate-fade-in-up">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900 text-amber-400 mb-5 shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <CalendarPlus className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Créer un Événement
                    </h2>
                    <p className="mt-3 text-base text-slate-500 font-medium">
                        Remplissez les détails ci-dessous pour ajouter un nouvel événement à votre catalogue.
                    </p>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-8 bg-red-50 border border-red-100 p-5 rounded-2xl shadow-sm flex items-start gap-4 animate-headshake">
                        <AlertTriangle className="w-6 h-6 text-red-500 mt-0.5 shrink-0" strokeWidth={2} />
                        <div>
                            <p className="font-bold text-red-800 text-sm mb-0.5">Oups !</p>
                            <span className="text-red-700 font-medium text-sm">{errorMessage}</span>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleAddEvent} className="space-y-7">
                    
                    {/* Titre */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2.5">Titre de l'événement <span className="text-red-500">*</span></label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                                <Type className="h-5.5 w-5.5" strokeWidth={2} />
                            </div>
                            <input 
                                type="text" 
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                required 
                                placeholder="Ex: Soirée de Gala 2026" 
                                maxLength={255} 
                                className="w-full pl-12 pr-4.5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-amber-100/50 focus:border-amber-400 transition-all duration-200 outline-none text-slate-900 font-medium placeholder-slate-400"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2.5">Description <span className="text-red-500">*</span></label>
                        <div className="relative group">
                            <div className="absolute top-4 left-0 pl-4.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                                <AlignLeft className="h-5.5 w-5.5" strokeWidth={2} />
                            </div>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required 
                                rows="4"
                                placeholder="Décrivez l'événement en quelques mots..."
                                className="w-full pl-12 pr-4.5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-amber-100/50 focus:border-amber-400 transition-all duration-200 outline-none text-slate-900 font-medium placeholder-slate-400 resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Date & Heure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2.5">Date <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                                    <CalendarDays className="h-5.5 w-5.5" strokeWidth={2} />
                                </div>
                                <input 
                                    type="date" 
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required 
                                    min={new Date().toISOString().split('T')[0]} 
                                    className="w-full pl-12 pr-4.5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-amber-100/50 focus:border-amber-400 transition-all duration-200 outline-none text-slate-900 font-medium cursor-pointer"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2.5">Heure <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                                    <Clock className="h-5.5 w-5.5" strokeWidth={2} />
                                </div>
                                <input 
                                    type="time" 
                                    value={heure}
                                    onChange={(e) => setHeure(e.target.value)}
                                    required 
                                    className="w-full pl-12 pr-4.5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-amber-100/50 focus:border-amber-400 transition-all duration-200 outline-none text-slate-900 font-medium cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lieu */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2.5">Lieu <span className="text-red-500">*</span></label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                                <MapPin className="h-5.5 w-5.5" strokeWidth={2} />
                            </div>
                            <input 
                                type="text" 
                                value={lieu}
                                onChange={(e) => setLieu(e.target.value)}
                                required 
                                placeholder="Ex: Amphi A, Campus Principal" 
                                maxLength={255} 
                                className="w-full pl-12 pr-4.5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-amber-100/50 focus:border-amber-400 transition-all duration-200 outline-none text-slate-900 font-medium placeholder-slate-400"
                            />
                        </div>
                    </div>

                    {/* Prix & Capacité */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2.5">Prix (DH) <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                                    <Coins className="h-5.5 w-5.5" strokeWidth={2} />
                                </div>
                                <input 
                                    type="number" 
                                    value={prix}
                                    onChange={(e) => setPrix(e.target.value)}
                                    required 
                                    placeholder="0.00 (Mettre 0 si gratuit)" 
                                    min="0" 
                                    step="0.1" 
                                    className="w-full pl-12 pr-4.5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-amber-100/50 focus:border-amber-400 transition-all duration-200 outline-none text-slate-900 font-medium placeholder-slate-400"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2.5">Capacité Max <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                                    <Users className="h-5.5 w-5.5" strokeWidth={2} />
                                </div>
                                <input 
                                    type="number" 
                                    value={jaugemaximale}
                                    onChange={(e) => setJaugemaximalen(e.target.value)}
                                    required 
                                    placeholder="Ex: 100" 
                                    min="1" 
                                    step="1" 
                                    className="w-full pl-12 pr-4.5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-amber-100/50 focus:border-amber-400 transition-all duration-200 outline-none text-slate-900 font-medium placeholder-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions / Buttons */}
                    <div className="pt-6 flex flex-col-reverse sm:flex-row gap-4 border-t border-slate-100">
                        <button 
                            type="button" 
                            onClick={() => navigate('/admin/dashboard')} 
                            className="group w-full sm:w-1/3 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex justify-center items-center gap-2 active:scale-95"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" strokeWidth={2.5}/>
                            <span>Annuler</span>
                        </button>

                        <button 
                            type="submit" 
                            className="group w-full sm:w-2/3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-amber-500/30 transform hover:-translate-y-1 active:scale-95 transition-all duration-300 flex justify-center items-center gap-2 text-lg"
                        >
                            <span>Créer l'événement</span>
                            <CheckCircle2 className="w-6 h-6 transition-transform group-hover:scale-110" strokeWidth={2.5} />
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}