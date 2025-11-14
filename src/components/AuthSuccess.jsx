// src/components/AuthSuccess.jsx
import React, { useContext, useEffect } from "react";
// Debes asegurarte de tener React Router DOM instalado y configurado
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../contexts/AuthContexts"; 

const AuthSuccess = () => {
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Capturar el token de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
        // 2. Almacenar el token y actualizar el estado
        // La función 'login' se definirá en AuthContexts.jsx
        login(token); 
        
        // 3. Redirigir al usuario al Home y limpiar el historial
        navigate('/', { replace: true }); 

        } else {
        console.error("Autenticación fallida: No se encontró el token.");
        // Redirigir si falla la autenticación (ej. si el usuario cancela)
        navigate('/error-login', { replace: true });
        }
    }, [login, navigate]);

    // Mostrar un mensaje de carga mientras se procesa el token
    return (
        <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl">Procesando inicio de sesión...</h1>
        </div>
    );
};

export default AuthSuccess;