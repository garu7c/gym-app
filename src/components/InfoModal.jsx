// src/components/InfoModal.jsx
import React from 'react';
import { Button } from './ui/button';
import { X, CheckCircle } from 'lucide-react';

export const InfoModal = ({ isOpen, onClose, title, message, darkMode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
        <div 
            className={`relative w-full max-w-md p-6 rounded-2xl shadow-xl transition-colors
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
            `}
        >
            {/* Encabezado y Botón de Cerrar */}
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                {title}
            </h2>
            <button 
                onClick={onClose} 
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                <X className="w-5 h-5" />
            </button>
            </div>

            {/* Mensaje */}
            <p className="text-center text-gray-300 py-4">{message}</p>

            {/* Botón de Aceptar */}
            <Button 
            onClick={onClose}
            className={`w-full ${darkMode ? "bg-red-800 hover:bg-red-700" : "bg-yellow-500 hover:bg-yellow-600"} text-black dark:text-white`}
            >
            Aceptar
            </Button>
        </div>
        </div>
    );
};