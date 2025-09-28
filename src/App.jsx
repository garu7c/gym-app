import { useEffect, useState } from "react";
import {
  Menu,
  ShoppingCart,
  Dumbbell,
  MapPin,
  HelpCircle,
  Sun,
  Moon,
  PawPrint,
} from "lucide-react";
import Home from "./Home";
import { Training } from "./components/Training";
import { Branches } from "./components/Branches";
import Shop from "./components/Shop";
import Help from "./components/Help";
import Find from "./components/Find";
import { PrivateRoute } from "./components/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContexts";
import LoginModal from "./components/LoginModal";
import ProfileModal from "./components/ProfileModal";


export default function App() {
  const [activeTab, setActiveTab] = useState("home"); 
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const { user } = useContext(AuthContext);

  const [userImage, setUserImage] = useState(() => {
    return localStorage.getItem("userImage") || null;
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

   useEffect(() => {
    if (userImage) {
      localStorage.setItem("userImage", userImage);
    } else {
      localStorage.removeItem("userImage");
    }
  }, [userImage]);

  const tabs = [
    { id: "home", label: "Inicio", icon: <Menu className="w-4 h-4" /> },
    { id: "store", label: "Tienda", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "routines", label: "Rutinas", icon: <Dumbbell className="w-4 h-4" /> },
    { id: "branches", label: "Sucursales", icon: <MapPin className="w-4 h-4" /> },
    { id: "help", label: "Ayuda", icon: <HelpCircle className="w-4 h-4" /> },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <header
        className={`shadow-lg ${
          darkMode ? "bg-red-800 text-white " : "bg-yellow-500 text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? "bg-white text-slate-800" : "bg-black text-yellow-500"
              }`}
            >
              <PawPrint className='w-6 h-6' />
            </div>
            <div>
              <h1 className="text-2xl font-bold">JAGUAR FITNESS</h1>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center space-x-4">
            {/* Botón de modo oscuro/claro */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition ${
                darkMode
                  ? "bg-red-800 hover:bg-red-700 outline-2 outline-white"
                  : "bg-yellow-500 hover:bg-yellow-700 outline-2 outline-black"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>

            {/* Botón Iniciar Sesión */}
            {user ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className={`flex items-center space-x-2 px-4 py-2 font-semibold rounded-lg transition ${
                  darkMode
                    ? "bg-red-800 border-2 border-white hover:bg-red-700 text-white"
                    : "bg-yellow-500 border-2 border-black hover:bg-yellow-700 text-black"
                }`}
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="Perfil"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                    {/* Ícono de usuario cuando no hay imagen */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A9.003 9.003 0 0112 15c2.486 0 4.735.995 6.364 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                )}
                <span>{user.userDetails.split("@")[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className={`px-4 py-2 font-semibold rounded-lg transition ${
                  darkMode
                    ? "bg-red-800 border-2 border-white hover:bg-red-700 text-white"
                    : "bg-yellow-500 border-2 border-black hover:bg-yellow-700 text-black"
                }`}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`border-4 ${
          darkMode ? "border-gray-950 bg-gray-950" : " border-gray-200/50 bg-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex space-x-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 transition rounded-xl ${
                activeTab === tab.id
                  ? darkMode
                    ? "bg-red-900 text-white"
                    : "bg-black text-white"
                  : darkMode
                  ? "hover:bg-red-900/50 text-white-200"
                  : "hover:bg-gray-300 text-gray-700"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Contenido dinámico */}
      <main className="flex-1">
        {activeTab === "home" && <Home darkMode={darkMode} />}
        {activeTab === "store" &&
          (user ? <Shop darkMode={darkMode} /> : (alert(`Debes iniciar sesión`), <p>Debes iniciar sesión</p>))}
        {activeTab === "routines" &&
          (user ? <Training darkMode={darkMode} /> : (alert(`Debes iniciar sesión`), <p>Debes iniciar sesión</p>))}
        {activeTab === "branches" &&
          (user ? <Find darkMode={darkMode} /> : (alert(`Debes iniciar sesión`), <p>Debes iniciar sesión</p>))}
        {activeTab === "help" && <Help darkMode={darkMode} />}
      </main>

      {/* Modal de login */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        darkMode={darkMode}
      />
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        email={user?.userDetails}
        darkMode={darkMode}
        userImage={userImage}        
        onUpdateImage={setUserImage}  
      />
    </div>
  );
}
