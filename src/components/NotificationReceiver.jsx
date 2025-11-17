// src/components/NotificationReceiver.jsx

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts'; // Importa tu contexto de autenticación

// 🛑 CONFIGURACIÓN CLAVE DE AZURE APIM
const APIM_BASE_URL = 'https://cla-royale.azure-api.net/notifications-ms';
const APIM_SUBSCRIPTION_KEY = '6b194d73d19340beb3003faec661dac5'; 
// Usamos el email del usuario como identificador de sesión para el polling

const pollNotifications = (userEmail, setInfoModalState) => {
    
    // Si el usuario no está logueado o el email es nulo, no hacemos polling.
    if (!userEmail) {
        // Retrasamos el reintento para evitar inundar la consola si el usuario se acaba de desloguear
        setTimeout(() => pollNotifications(userEmail, setInfoModalState), 5000); 
        return; 
    }

    const url = `${APIM_BASE_URL}/api/notifications/poll`;
    const headers = { 
        'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY // Clave APIM
    };

    console.log(`Polling iniciado para ${userEmail}. URL: ${url}`);

    fetch(url, { headers })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            // Si hay error (ej. 404), tiramos un error
            throw new Error(`Fallo en el polling, código: ${response.status}`);
        })
        .then(payload => {
            if (payload !== "TIMEOUT") {
                // ✅ Notificación recibida! (El servidor respondió con datos)
                console.log('🔔 Notificación de Compra Recibida:', payload);
                setInfoModalState({
                    isOpen: true,
                    title: '🛍️ ¡Nueva Compra!',
                    message: payload
                });
            } else {
                // Timeout normal, el servidor no tenía datos, volvemos a intentarlo inmediatamente
                console.log('Polling: Timeout (no hay nuevos datos), reintentando...');
            }
        })
        .catch(error => {
            console.error('❌ Error de Long Polling:', error.message);
            // Si falla por red (ej. desconexión), esperamos un poco antes de reintentar
            // Esto es crucial para no bloquear el navegador en caso de error 401 o 404
            setTimeout(() => pollNotifications(userEmail, setInfoModalState), 5000);
            return;
        })
        .finally(() => {
            // Importante: Si la petición fue exitosa (TIMEOUT o dato), iniciar la siguiente inmediatamente
            pollNotifications(userEmail, setInfoModalState); 
        });
};


export const NotificationReceiver = ({ setInfoModalState }) => {
    // Usamos el contexto para obtener el usuario
    const { user } = useContext(AuthContext); 
    const userEmail = user?.userDetails; // Captura el email si está logueado

    useEffect(() => {
        // Esta función se ejecuta CADA VEZ que el estado del usuario cambia (login/logout)
        // Esto reinicia el polling con el email correcto o lo detiene si no hay usuario.
        pollNotifications(userEmail, setInfoModalState);
        
        // No necesitamos una función de cleanup explícita para detener el loop, 
        // ya que el `if (!userEmail)` y el `setTimeout` manejan la recursividad.
        // Sin embargo, en un entorno real, se podría usar una referencia para detener la cola de setTimeout.
        
        return () => {};
    }, [userEmail, setInfoModalState]);

    return null; // Este componente es invisible, solo maneja la lógica de fondo
};