import { useState, useEffect } from "react"; 
import { Link } from 'react-router-dom';
import axiosInstance from "../api/axios";

export default function AdminDashboard(){
     const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const getevents = async () => {
        try {
            const result = await axiosInstance.get('/events');
            // console.log("Data from Laravel:", result.data);
              setEvents(result.data.data); 
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erreur de connexion avec le serveur");
            }
        }
    }

    useEffect(() => {
        getevents();
    }, []);

    return (
        <div>
            <div className="p-8 text-center">
                <h1 className="text-3xl font-bold text-red-600">Welcom (Admin)</h1>
            </div>
            
            <div className="p-4">
                <Link to="/admin/addevents" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Add Events
                </Link>
            </div>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

         <table className="min-w-full divide-y divide-gray-200 mt-4">
                <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((e) => (
                        <tr key={e.id} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-bold text-gray-900">{ e.titre }</div>
                                 <div className={`text-sm font-medium ${e.prix > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                                    { e.prix > 0 ? e.prix + ' DH' : 'Gratuit' }
                                </div>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    { e.date } à { e.heure }
                                </div>
                                <div className="text-sm text-gray-500">{ e.lieu }</div>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="px-4 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-100 text-blue-800">
                                    Places Max : { e.jauge_maximale }
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}