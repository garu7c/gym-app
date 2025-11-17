import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';

const APP_SERVICE_BASE_URL = 'https://servicenotificationmicrojava-gubjg8gpa5guccbz.centralus-01.azurewebsites.net';


const pollNotifications = (userEmail, setInfoModalState) => {
    
    if (!userEmail) {
        return; 
    }

    const url = `${APP_SERVICE_BASE_URL}/api/poll?userEmail=${userEmail}`;
    const headers = {}; 

    console.log(`Polling iniciado para ${userEmail}. URL: ${url}`);

    fetch(url, { headers })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        })
        .then(payload => {
        })
        .catch(error => {
            console.error('Error de Long Polling:', error.message);
        
            if (error.message.includes("404") || error.message.includes("403")) {
                console.warn("ERROR CRÍTICO DE RUTA/CONFIGURACIÓN. EL POLLING NO CONTINUARÁ.");
                return; 
            }
            
            setTimeout(() => pollNotifications(userEmail, setInfoModalState), 5000);
            return;

        })
        .finally(() => {
        });
};


export const NotificationReceiver = ({ setInfoModalState }) => {
    const { user } = useContext(AuthContext); 
    const userEmail = user?.userDetails;

    useEffect(() => {
        // Reinicia el polling con el email correcto o lo detiene si no hay usuario.
        pollNotifications(userEmail, setInfoModalState);
        return () => {};
    }, [userEmail, setInfoModalState]);

    return null;;
};