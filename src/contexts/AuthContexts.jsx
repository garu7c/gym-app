// src/contexts/AuthContexts.jsx (ACTUALIZADO CON NOTIFICACIONES)
import { createContext, useContext, useState, useEffect } from "react";

// 1. Función para decodificar el JWT (simplificada)
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
    // Extraemos los campos que nos importan del token
    return {
      email: decoded.email,
      role: decoded.role,
      userDetails: decoded.email, // Para compatibilidad con tu App.jsx
    };

  } catch (e) {
    console.error("Error decodificando el token:", e);
    return null;
  }
}

// Función para enviar notificación de login
const sendLoginNotification = async (userEmail) => {
  try {
    const serviceUrl = 'http://localhost:8081/api/notifications/login';
    
    console.log('Enviando notificación de login a:', userEmail);
    
    // No usar await - no bloquear el login
    fetch(serviceUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userEmail: userEmail,
        source: 'jaguar_fitness_web',
        timestamp: new Date().toISOString()
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(message => {
      console.log('🔔 Notificación exitosa:', message);
    })
    .catch(error => {
      // Error silencioso - no afectar UX
      console.log('⚠️ Servicio de notificaciones no disponible:', error.message);
    });
    
  } catch (error) {
    console.log('⚠️ Error enviando notificación:', error);
  }
};

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(null);
  
  // Referencia para evitar notificaciones duplicadas
  const [previousUser, setPreviousUser] = useState(null);

  // 2. Efecto para cargar el usuario si el token ya existe
  useEffect(() => {
    if (token) {
      const decodedUser = decodeJwt(token);
      setUser(decodedUser);
      
      // Enviar notificación cuando se detecta un nuevo usuario
      if (decodedUser && decodedUser !== previousUser) {
        console.log('Usuario autenticado, enviando notificación...');
        sendLoginNotification(decodedUser.email);
        setPreviousUser(decodedUser);
      }
    } else {
      setUser(null);
      setPreviousUser(null);
    }
  }, [token, previousUser]);

  // 3. Función de Login: se llamará desde LoginModal
  const login = (jwtToken) => {
    localStorage.setItem("jwtToken", jwtToken);
    setToken(jwtToken);
    
    //La notificación se maneja en el useEffect arriba
    // para cubrir tanto login nuevo como recarga de página con token existente
  };

  // 4. Función de Logout: se llamará desde ProfileModal
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    setUser(null);
    setPreviousUser(null); // Resetear referencia
    window.location.href = "/"; // Forzar recarga al inicio
  };

  // 5. Exponer el token, el usuario y las funciones
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