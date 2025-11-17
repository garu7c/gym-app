import { X, Github, Chrome } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../contexts/AuthContexts";
import { useContext } from "react"; 

const API_URL = "https://cla-royale.azure-api.net/api/auth/exchange/google";

export default function LoginModal({ isOpen, onClose, darkMode }) {

  const { login } = useContext(AuthContext);

  const sendCodeToBackend = async (code) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: code })
      });

      if (!response.ok) {
        throw new Error("Falló el intercambio del código con el backend");
      }

      const data = await response.json();

      if (data.token) {
        login(data.token);
        onClose();
      } else {
        throw new Error("El backend no devolvió un token");
      }
    } catch (error) {
      console.error("Error en sendCodeToBackend:", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (codeResponse) => {
      sendCodeToBackend(codeResponse.code);
    },
    onError: (errorResponse) => {
      console.error("Error de Google login:", errorResponse);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div
        className={`relative w-full max-w-xs md:max-w-md p-6 rounded-2xl shadow-xl transition-colors
          ${darkMode ? "bg-gray-900 text-white" : "bg-yellow-500 text-black"}
        `}
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Contenedor de icono y título */}
        <div className="flex items-center justify-center mb-4 space-x-3">
          {/* Icono dinámico según modo */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? "bg-gray-100 text-gray-900" : "bg-black text-yellow-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-paw-print w-5 h-5"
              aria-hidden="true"
            >
              <circle cx="11" cy="4" r="2"></circle>
              <circle cx="18" cy="8" r="2"></circle>
              <circle cx="20" cy="16" r="2"></circle>
              <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"></path>
            </svg>
          </div>

          <h2 className="text-xl font-bold">Iniciar Sesión</h2>
        </div>

        {/* Botones */}
        <div className="flex flex-col space-y-3">
          <button
            disabled
            className={`flex items-center justify-center w-full px-4 py-2 rounded-lg font-semibold shadow 
              ${darkMode ? "bg-red-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-300"}
            `}
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub (Proximamente)
          </button>

          <button
            onClick={() => handleGoogleLogin()}
            className={`flex items-center justify-center w-full px-4 py-2 rounded-lg font-semibold shadow 
              ${darkMode ? "bg-red-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-300 text-black"}
            `}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
