// src/components/RequiresLoginBox.jsx
import React from 'react';
import { Lock } from 'lucide-react';

export const RequiresLoginBox = ({ darkMode }) => {
    return (
        <div className={`max-w-xl mx-auto my-20 p-8 text-center rounded-lg border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <Lock className={`w-16 h-16 mx-auto ${darkMode ? 'text-red-800' : 'text-yellow-500'}`} />
        <h2 className="mt-6 text-2xl font-bold">Contenido Protegido</h2>
        <p className="mt-2 text-gray-400">
            Debes iniciar sesión para acceder a las rutinas de entrenamiento.
        </p>
        </div>
    );
};