// src/components/NotificationReceiver.jsx

import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const APIM_GATEWAY_BASE = 'https://cla-royale.azure-api.net/notifications-ms';
// El endpoint WebSocket configurado en Spring Boot (WebSocketConfig.java)
const WS_ENDPOINT = '/ws/notifications';
const APIM_SUBSCRIPTION_KEY = '6b194d73d19340beb3003faec661dac5';
const socketUrl = `${APIM_GATEWAY_BASE}${WS_ENDPOINT}?subscription-key=${APIM_SUBSCRIPTION_KEY}`;

export const NotificationReceiver = ({ setInfoModalState }) => {
    
    // Estado para guardar la última notificación (opcional)
    const [lastNotification, setLastNotification] = useState(null); 
    
    useEffect(() => {
        let stompClient = null;

        try {
            // URL completa para la conexión WebSocket (usando WSS para seguridad)
            const socket = new SockJS(socketUrl);
            stompClient = Stomp.over(socket);
            stompClient.debug = null; // Desactiva los logs detallados de STOMP

            // Conexión al servidor WebSocket/STOMP
            stompClient.connect({}, (frame) => {
                console.log('✅ WebSocket: Conectado vía APIM.', frame);

                // Suscripción al tópico donde el backend envía las órdenes
                // Esto coincide con 'config.enableSimpleBroker("/topic")' y 'messagingTemplate.convertAndSend("/topic/orders", payload)'
                stompClient.subscribe('/topic/orders', (message) => {
                    const payload = message.body;
                    console.log('🔔 Notificación de Compra Recibida:', payload);
                    
                    // Actualiza el estado local y muestra un modal (usando el prop pasado desde App.jsx)
                    setLastNotification(payload); 
                    if (setInfoModalState) {
                        setInfoModalState({
                            isOpen: true,
                            title: '🛍️ ¡Nueva Compra!',
                            message: payload
                        });
                    }
                });

            }, (error) => {
                console.error('❌ WebSocket: Error de conexión o APIM:', error.headers.message || error);
            });

        } catch (e) {
            console.error('❌ WebSocket: Error al inicializar:', e);
        }

        // Cleanup: Desconexión al desmontar el componente (importante)
        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect(() => {
                    console.log('🔌 WebSocket desconectado.');
                });
            }
        };
    }, [setInfoModalState]); // Se vuelve a ejecutar si el estado del modal cambia.

    return null; // Este componente no renderiza nada visible, solo maneja la conexión.
};