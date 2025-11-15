// src/contexts/AuthContexts.jsx (¡NUEVO CÓDIGO!)
import { createContext, useContext, useState, useEffect } from "react";

// 1. Función para decodificar el JWT (simplificada)
// En una app real, usarías una librería como 'jwt-decode'
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


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(null);

  // 2. Efecto para cargar el usuario si el token ya existe
  useEffect(() => {
    if (token) {
      const decodedUser = decodeJwt(token);
      setUser(decodedUser);
      // Aquí es donde configurarías el 'Authorization' header para todos los fetch
      // (si usaras una librería como 'axios')
    } else {
      setUser(null);
    }
  }, [token]);

  // 3. Función de Login: se llamará desde LoginModal
  const login = (jwtToken) => {
    localStorage.setItem("jwtToken", jwtToken);
    setToken(jwtToken);
  };

  // 4. Función de Logout: se llamará desde ProfileModal
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
    setUser(null);
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