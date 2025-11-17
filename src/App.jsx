import { useEffect, useState, useContext } from "react";
import {
  Home as HomeIcon,
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
import { AuthContext } from "./contexts/AuthContexts";
import LoginModal from "./components/LoginModal";
import ProfileModal from "./components/ProfileModal";
import { CartModal } from "./components/CartModal";
import { useCart } from "./contexts/CartContext";
import { InfoModal } from "./components/InfoModal";
import { RequiresLoginBox } from "./components/RequiresLoginBox";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  const [activeTab, setActiveTab] = useState("home"); 
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const { user } = useContext(AuthContext);
  const { cartItems } = useCart();

  const [userImage, setUserImage] = useState(() => {
    return localStorage.getItem("userImage") || null;
  });

  const [texts, setTexts] = useState({});
  const [lang, setLang] = useState("es");
  const currentTexts = texts[lang] || {};

  //  Carga de textos
  useEffect(() => {
    fetch("/texts.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); 
      })
      .then(data => {
        setTexts(data); 
        console.log("Textos cargados correctamente.");
      })
      .catch(error => {
        console.error("Error al cargar o parsear texts.json:", error);
      });
  }, []);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [infoModalState, setInfoModalState] = useState({
    isOpen: false,
    title: '',
    message: ''
  });
  const closeInfoModal = () => {
    setInfoModalState({ isOpen: false, title: '', message: '' });
  };
  
  // Persistencia de imagen de usuario
  useEffect(() => {
    if (userImage) {
      localStorage.setItem("userImage", userImage);
    } else {
      localStorage.removeItem("userImage");
    }
  }, [userImage]);

  // Configuración de pestañas
  const tabs = [
    { id: "home", label: currentTexts.inicio , icon: <HomeIcon className="w-4 h-4" /> },
    { id: "store", label: currentTexts.tienda, icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "routines", label: currentTexts.rutinas, icon: <Dumbbell className="w-4 h-4" /> },
    { id: "branches", label: currentTexts.sucursales, icon: <MapPin className="w-4 h-4" /> },
    { id: "help", label: currentTexts.ayuda, icon: <HelpCircle className="w-4 h-4" /> },
  ];

  // Toggle dark/light mode
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
          darkMode ? "bg-red-900 text-white " : "bg-yellow-500 text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center py-4">
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
              <h1 className="text-2xl font-bold">{currentTexts.marca}</h1>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
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

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition border-2 ${
                darkMode
                  ? "bg-red-800 hover:bg-red-700 border-white"
                  : "bg-yellow-500 hover:bg-yellow-700 border-black"
              }`}
            >
              <ShoppingCart className={`w-5 h-5 ${darkMode ? "text-white" : "text-black"}`} />
              {cartItems.length > 0 && (
                <span className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                  darkMode ? "bg-white text-red-900" : "bg-black text-white"
                }`}>
                  {cartItems.length}
                </span>
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
                {currentTexts.login}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`border-4 ${
          darkMode ? "border-black bg-black" : " border-gray-200/50 bg-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex space-x-2 justify-center overflow-x-auto scrollbar-hide py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'routines' && !user) {
                  // Si hacen clic en "Routines" Y NO están logueados
                  setIsLoginOpen(true); // Abre el modal
                }
                // Siempre activa la pestaña (para que vean el mensaje)
                setActiveTab(tab.id); 
              }}
              className={`rounded-lg flex items-center whitespace-nowrap space-x-2 px-5 py-3 ${
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

          {user && user.role === 'Admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`rounded-lg flex items-center whitespace-nowrap space-x-2 px-5 py-3 ${
                activeTab === 'admin'
                  ? darkMode ? "bg-red-900 text-white" : "bg-black text-white"
                  : darkMode ? "hover:bg-red-900/50 text-white-200" : "hover:bg-gray-300 text-gray-700"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m0 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0m-2-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2m6 1.5a2.5 2.5 0 0 0-2.5-2.5h-7A2.5 2.5 0 0 0 1 12.5V13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.5zM11 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-3-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/></svg>
              <span>Admin</span>
            </button>
          )}
        </div>
      </nav>

      {/* Contenido dinámico */}
      <main className="flex-1">
        {activeTab === "home" && <Home darkMode={darkMode} texts={currentTexts} />}
        {activeTab === "store" &&
          <Shop darkMode={darkMode} texts={currentTexts} />}
        {activeTab === "routines" &&
          (user ? (
            <Training darkMode={darkMode} texts={currentTexts} />
          ) : (
            // Si el tab es 'routines' pero no hay usuario, muestra la caja.
            // El modal ya se abrió (o se cerró) gracias al onClick de la nav.
            <RequiresLoginBox darkMode={darkMode} />
          ))}
        {activeTab === "branches" &&
          <Find darkMode={darkMode} texts={currentTexts} />}
        {activeTab === "help" && <Help darkMode={darkMode} texts={currentTexts} />}
        {activeTab === "admin" && <AdminPanel darkMode={darkMode} />}
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
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        darkMode={darkMode}
      />
      <InfoModal
        isOpen={infoModalState.isOpen}
        onClose={closeInfoModal}
        title={infoModalState.title}
        message={infoModalState.message}
        darkMode={darkMode}
      />
    </div>
  );
}