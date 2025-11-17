// src/contexts/AuthContexts.jsx (¡CORREGIDO!)
import { createContext, useContext, useState, useEffect } from "react";

// 1. Función para decodificar el JWT (sin cambios)
function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const decoded = JSON.parse(jsonPayload);
    return {
      email: decoded.email,
      role: decoded.role,
      userDetails: decoded.email,
    };

  } catch (e) {
    console.error("Error decodificando el token:", e);
    return null;
  }
}

// 2. Función para enviar notificación (sin cambios)
const sendLoginNotification = async (userEmail) => {
  try {
    const APIM_BASE_URL = 'https://cla-royale.azure-api.net/notifications-ms';
    const serviceUrl = `${APIM_BASE_URL}/api/notifications/login`;
    
    console.log('Enviando notificación de login a:', userEmail);
    
    fetch(serviceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userEmail: userEmail,
        source: 'jaguar_fitness_web',
        timestamp: new Date().toISOString()
      })
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(message => console.log('🔔 Notificación exitosa:', message))
    .catch(error => console.log('⚠️ Servicio de notificaciones no disponible:', error.message));
    
  } catch (error) {
    console.log('⚠️ Error enviando notificación:', error);
  }
};

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(null);

  // 3. useEffect (AHORA SIMPLIFICADO)
  // Este hook solo se encarga de cargar el usuario si hay un token
  // (ej. al recargar la página). No envía notificaciones.
  useEffect(() => {
    if (token) {
      setUser(decodeJwt(token));
    } else {
      setUser(null);
    }
  }, [token]); // Solo depende del 'token'

  // 4. Función de Login (AHORA MANEJA LA NOTIFICACIÓN)
  // Se llama SOLAMENTE cuando el usuario hace clic en "Login".
  const login = (jwtToken) => {
    const decodedUser = decodeJwt(jwtToken);
    
    if (decodedUser) {
      localStorage.setItem("jwtToken", jwtToken);
      setToken(jwtToken); // Esto dispara el useEffect de arriba y actualiza 'user'
      
      // Enviamos la notificación AQUÍ, solo en el evento de login
      console.log('Nuevo login, enviando notificación...');
      sendLoginNotification(decodedUser.email);
    }
  };

  // 5. Función de Logout (sin cambios)
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  const value = {
    token,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}