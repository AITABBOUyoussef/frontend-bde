import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axios";
import { 
  Ticket, 
  LayoutDashboard, 
  CalendarDays, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  User 
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isOpen, setIsOpen] = useState(false); 

  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50 font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-100 p-2 rounded-xl group-hover:bg-emerald-500 group-hover:text-white text-emerald-600 transition-all duration-300 transform group-hover:scale-110 shadow-sm">
              <Ticket className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-2xl text-gray-900 tracking-tight">
              BDE <span className="text-emerald-600">Events</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {user ? (
              user.role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Tableau de bord
                </Link>
              ) : (
                <>
                  <Link
                    to="/student/dashboard"
                    className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Événements
                  </Link>
                  <Link
                    to="/student/ticket"
                    className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                  >
                    <Ticket className="w-4 h-4" />
                    Mes billets
                  </Link>
                </>
              )
            ) : null}
          </div>

          {/* User Profile & Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-200 hover:border-emerald-200 transition-colors cursor-default">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-bold text-gray-700 pr-2">
                    {user.name || "Utilisateur"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-red-500/30"
                  title="Se déconnecter"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="group flex items-center gap-2 bg-gray-900 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Se connecter</span>
                <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {user ? (
            <>
              {/* Mobile User Info */}
              <div className="flex items-center gap-3 px-3 py-4 mb-2 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Connecté en tant que</span>
                  <span className="font-bold text-gray-800">{user.name || "Utilisateur"}</span>
                </div>
              </div>

              {/* Mobile Links */}
              {user.role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-3 rounded-xl font-semibold transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Tableau de bord
                </Link>
              ) : (
                <>
                  <Link
                    to="/student/dashboard"
                    className="flex items-center gap-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <CalendarDays className="w-5 h-5" />
                    Événements
                  </Link>
                  <Link
                    to="/student/ticket"
                    className="flex items-center gap-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Ticket className="w-5 h-5" />
                    Mes billets
                  </Link>
                </>
              )}

              {/* Mobile Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 text-red-500 hover:text-white hover:bg-red-500 px-3 py-3 rounded-xl font-bold transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </>
          ) : (
            <div className="pt-4 pb-2">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white px-6 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all"
              >
                <LogIn className="w-5 h-5" />
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}