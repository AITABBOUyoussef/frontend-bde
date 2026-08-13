import { Link } from "react-router-dom";
import { 
  Ticket, 
  Sparkles, 
  ArrowRight, 
  CalendarDays, 
  Music, 
  Camera,
  Users
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-white font-sans">
      
      {/* Background Animations (Glowing Orbs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Music className="absolute top-1/4 left-1/4 text-emerald-300 w-12 h-12 -rotate-12 animate-bounce" style={{ animationDuration: "3s" }} />
        <Camera className="absolute bottom-1/3 right-1/4 text-teal-300 w-10 h-10 rotate-12 animate-bounce" style={{ animationDuration: "4s" }} />
        <Users className="absolute top-1/3 right-1/3 text-green-200 w-14 h-14 rotate-45 animate-bounce" style={{ animationDuration: "5s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold text-sm mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Plateforme Officielle du BDE</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
          Vivez vos meilleures <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            expériences étudiantes
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Découvrez, réservez et participez aux meilleurs événements organisés par votre Bureau des Étudiants. Ne ratez aucune occasion de créer des souvenirs inoubliables.
        </p>

        {/* Call to Actions (Buttons) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/student/dashboard"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:-translate-y-1 transition-all duration-300"
          >
            <CalendarDays className="w-5 h-5" />
            <span>Explorer les événements</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/student/ticket"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 hover:text-emerald-600 border-2 border-gray-100 hover:border-emerald-200 px-8 py-4 rounded-2xl font-bold text-lg shadow-sm hover:bg-emerald-50 transform hover:-translate-y-1 transition-all duration-300"
          >
            <Ticket className="w-5 h-5" />
            <span>Mes billets</span>
          </Link>
        </div>

        {/* Stats / Features Bottom */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 text-center border-t border-gray-100 pt-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
              <CalendarDays className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900">+50 Événements</h3>
            <p className="text-sm text-gray-500">Organisés chaque année</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900">+1000 Étudiants</h3>
            <p className="text-sm text-gray-500">Communauté active</p>
          </div>
          <div className="flex flex-col items-center col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
              <Ticket className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900">100% Digital</h3>
            <p className="text-sm text-gray-500">Billetterie sécurisée</p>
          </div>
        </div>

      </div>
    </div>
  );
}