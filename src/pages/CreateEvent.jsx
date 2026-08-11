import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

export default function AddEvent(){
      const navigate = useNavigate();
    const [titre, setTitre]=useState('');
    const [description, setDescription]=useState('');
    const [date, setDate]=useState('');
    const [heure, setHeure]=useState('');
    const [lieu, setLieu]=useState('');
    const [prix, setPrix]=useState('');
    const [jaugemaximale, setJaugemaximalen]=useState('');
    const [errorMessage, setErrorMessage]=useState('');
  
    const handleAddEvent = async(e)=>{
        e.preventDefault();
        setErrorMessage('');
        try{
        const response =     await axiosInstance.post('/add-event', {
                titre : titre ,
                description : description ,
                date : date ,
                heure : heure ,
                lieu : lieu ,
                prix : prix ,
                jauge_maximale : jaugemaximale     
            });
             navigate('/admin/dashboard');

        }
        catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('error sur serve')
            }
        }
    };
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    AddEvent</h2>
                
               {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleAddEvent} className="space-y-4">
                  
    {/* Titre */}
    <input type="text"    value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            required placeholder="Titre de l'événement"  maxLength={255} />
    
    {/* Description */}
    <textarea placeholder="Description"     value={description}
                            onChange={(e) => setDescription(e.target.value)}
                           required rows="4"></textarea>
    
    {/* Date */}
    <input 
        type="date"     value={date}
                            onChange={(e) => setDate(e.target.value)}
                           
        required 
        min={new Date().toISOString().split('T')[0]} 
    />
    
    {/* Heure */}
    <input type="time"   value={heure}
                            onChange={(e) => setHeure(e.target.value)}
                            reqired required />
    
    {/* Lieu */}
    <input type="text"    value={lieu}
                            onChange={(e) => setLieu(e.target.value)}
                             placeholder="Lieu" required maxLength={255} />
    
    {/* Prix */}
    <input type="number"    value={prix}
                            onChange={(e) => setPrix(e.target.value)}
                             placeholder="Prix" required min="0" step="0.1" />
    
    {/* Jauge Maximale (Capacité) */}
    <input type="number"    value={jaugemaximale}
                            onChange={(e) => setJaugemaximalen(e.target.value)}
                             placeholder="Capacité maximale" required min="1" step="1" />

    <button type="submit">Ajouter l'événement</button>


                 
                </form>
            </div>
        </div>
    );

}