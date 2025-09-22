import { useState } from "react";
import {
  Menu,
  ShoppingCart,
  Dumbbell,
  MapPin,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react";

import Home from "./Home";

function Store() {
  return <div className="p-6">🛒 Aquí va la tienda</div>;
}
function Routines() {
  return <div className="p-6">💪 Aquí van las rutinas</div>;
}
function Branches() {
  return <div className="p-6">📍 Aquí van las sucursales</div>;
}
function Help() {
  return <div className="p-6">❓ Aquí va la sección de ayuda</div>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  const tabs = [
    { id: "home", label: "Inicio", icon: <Menu className="w-4 h-4" /> },
    { id: "store", label: "Tienda", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "routines", label: "Rutinas", icon: <Dumbbell className="w-4 h-4" /> },
    { id: "branches", label: "Sucursales", icon: <MapPin className="w-4 h-4" /> },
    { id: "help", label: "Ayuda", icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <header
        className={`shadow-lg ${
          darkMode ? "bg-slate text-white " : "bg-yellow-500 text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? "bg-white text-slate-900" : "bg-black text-yellow-500"
              }`}
            >
              <Dumbbell className='w-6 h-6' />
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
                  ? "bg-red-800 hover:bg-red-700"
                  : "bg-yellow-500 hover:bg-yellow-300 outline-2 outline-black"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>

            {/* Botón Iniciar Sesión */}
            <button
              className={`px-4 py-2 font-semibold rounded-lg transition ${
                darkMode
                  ? "bg-red-800 hover:bg-red-700 text-white"
                  : "bg-yellow-500 border-2 border-black hover:bg-yellow-700 text-black-500"
              }`}
            >
              Iniciar Sesión
            </button>
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
        {activeTab === "store" && <Shop darkMode={darkMode} />}
        {activeTab === "routines" && <Routines />}
        {activeTab === "branches" && <Branches />}
        {activeTab === "help" && <Help />}
      </main>
    </div>
  );
}
