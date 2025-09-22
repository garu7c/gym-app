// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="fixed w-full z-50 shadow-md">
      {/* Primera fila */}
      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo + Nombre */}
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/logo-jaguar.png"
              alt="Jaguar Fitness Logo"
              className="w-8 h-8"
            />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              JAGUAR FITNESS
            </h1>
          </div>

          {/* Botón + Switch tema */}
          <div className="flex items-center gap-4">
            {/* Switch modo oscuro */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800" />
              )}
            </button>

            {/* Botón iniciar sesión */}
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Segunda fila */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex space-x-8 text-sm font-medium text-gray-700 dark:text-gray-200">
          <a href="#" className="hover:text-yellow-500 transition">Inicio</a>
          <a href="#" className="hover:text-yellow-500 transition">Tienda</a>
          <a href="#" className="hover:text-yellow-500 transition">Rutinas</a>
          <a href="#" className="hover:text-yellow-500 transition">Sucursales</a>
          <a href="#" className="hover:text-yellow-500 transition">Noticias</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
