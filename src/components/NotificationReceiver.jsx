import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';

const APP_SERVICE_BASE_URL = 'https://servicenotificationmicrojava-gubjg8gpa5guccbz.centralus-01.azurewebsites.net';


const pollNotifications = (userEmail, setInfoModalState) => {
    // Si el usuario no está logueado o el email es nulo, no hacemos polling.
    if (!userEmail) {
        // Retrasamos el reintento para evitar inundar la consola si el usuario se acaba de desloguear
        setTimeout(() => pollNotifications(userEmail, setInfoModalState), 5000); 
        return; 
    }

    const url = `${APP_SERVICE_BASE_URL}/api/notifications/poll?userEmail=${userEmail}`;
    const headers = {};

    console.log(`Polling iniciado para ${userEmail}. URL: ${url}`);

    fetch(url, { headers })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error(`Fallo en el polling, código: ${response.status}`);
        })
        .then(payload => {
            if (payload !== "TIMEOUT") {
                console.log('Notificación de Compra Recibida:', payload);
                setInfoModalState({
                    isOpen: true,
                    title: '¡Nueva Compra!',
                    message: payload
                });
            } else {
                // Timeout normal, el servidor no tenía datos, volvemos a intentarlo inmediatamente
                console.log('Polling: Timeout (no hay nuevos datos), reintentando...');
            }
        })
        .catch(error => {
            console.error('Error de Long Polling:', error.message);
            setTimeout(() => pollNotifications(userEmail, setInfoModalState), 5000);
            return;
        })
        .finally(() => {
            pollNotifications(userEmail, setInfoModalState); 
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