// src/contexts/AuthContexts.jsx
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Función auxiliar para decodificar el payload del JWT
const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    // Reemplaza caracteres no válidos para Base64 URL antes de decodificar
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const claims = JSON.parse(jsonPayload);
    
    // El microservicio devuelve el email o sub como el identificador del usuario
    // Mapeamos a 'userDetails' para mantener compatibilidad con App.jsx
    return { 
        userDetails: claims.email || claims.sub || 'Usuario JWT',
    };

  } catch (error) {
    console.error("Error decodificando JWT:", error);
    localStorage.removeItem('jwtToken');
    return null;
  }
};


export function AuthProvider({ children }) {
  // 1. Inicializar desde localStorage
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [user, setUser] = useState(decodeJwt(token));

  // 2. Función de LOGIN (Guarda Token y decodifica usuario)
  const login = (jwtToken) => {
    localStorage.setItem('jwtToken', jwtToken);
    setToken(jwtToken);
    setUser(decodeJwt(jwtToken));
  };
  
  // 3. Función de LOGOUT
  const logout = () => {
    localStorage.removeItem('jwtToken'); // Elimina el token
    setToken(null);
    setUser(null);
    // Redirección para asegurar que el estado se borre
    window.location.href = "/";
  };
  
  // No se necesita el useEffect anterior que hacía fetch("/.auth/me")

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}