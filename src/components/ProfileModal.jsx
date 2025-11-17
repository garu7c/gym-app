// src/components/ProfileModal.jsx (¡CORREGIDO Y FINAL!)

import { useRef, useContext } from "react"; // <-- 1. IMPORTAR useContext
import { X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContexts"; // <-- 2. IMPORTAR AuthContext

// Acepta 'userImage' y 'onUpdateImage' de App.jsx
export default function ProfileModal({ isOpen, onClose, email, darkMode, userImage, onUpdateImage }) {
  
  const { logout } = useContext(AuthContext); // <-- 3. OBTENER LA FUNCIÓN 'logout'
  const username = email?.split("@")[0] || "Usuario";
  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // Llama a la función de App.jsx para actualizar el estado
      if (onUpdateImage) onUpdateImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // --- 4. FUNCIÓN DE LOGOUT CORREGIDA ---
  const handleLogout = () => {
    logout(); // Llama a la función del contexto
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      {/* 5. USA TUS COLORES DE TEMA */}
      <div className={`relative w-full max-w-xs md:max-w-md p-6 rounded-2xl shadow-xl transition-colors ${darkMode ? "bg-red-900 text-white" : "bg-yellow-500 text-black"}`}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <X className="w-5 h-5" />
        </button>

        {/* Imagen y usuario (lee 'userImage' de props) */}
        <div className="flex flex-col items-center mb-4">
          <div 
            className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer ${userImage ? '' : darkMode ? "bg-gray-100 text-gray-900" : "bg-gray-400 text-white"}`}
            onClick={handleAvatarClick}
          >
            {userImage ? (
              <img src={userImage} alt="Usuario" className="w-16 h-16 rounded-full object-cover"/>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
              </svg>
            )}
          </div>
          <p className="font-bold mt-2">{username}</p>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden"/>
        </div>

        {/* Botón Cerrar Sesión (con el onClick correcto) */}
        <button onClick={handleLogout} className={`w-full px-4 py-2 rounded-lg font-semibold shadow ${darkMode ? "bg-gray-950 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300 text-black"}`}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}