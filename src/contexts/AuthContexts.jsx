import { createContext, useContext, useState, useEffect } from "react";

// Función para decodificar el JWT 
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

// Función para enviar notificación
const sendLoginNotification = async (userEmail) => {
  try {
    const APIM_BASE_URL = 'https://cla-royale.azure-api.net/notifications-ms';
    const serviceUrl = `${APIM_BASE_URL}/api/notifications/login`;
    const APIM_SUBSCRIPTION_KEY = '6b194d73d19340beb3003faec661dac5';
    
    console.log('Enviando notificación de login a:', userEmail);
    
    fetch(serviceUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY
      },
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
    .then(message => console.log('Notificación exitosa:', message))
    .catch(error => console.log('Servicio de notificaciones no disponible:', error.message));
    
  } catch (error) {
    console.log('Error enviando notificación:', error);
  }
};

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(null);

  // Cargar el usuario si hay un token
  useEffect(() => {
    if (token) {
      setUser(decodeJwt(token));
    } else {
      setUser(null);
    }
  }, [token]);
  // Función de Login
  const login = (jwtToken) => {
    const decodedUser = decodeJwt(jwtToken);
    
    if (decodedUser) {
      localStorage.setItem("jwtToken", jwtToken);
      setToken(jwtToken); // Dispara el useEffect de arriba y actualiza 'user'
      
      // Enviamos la notificación solo en el evento de login
      console.log('Nuevo login, enviando notificación...');
      sendLoginNotification(decodedUser.email);
    }
  };

  // Función de Logout
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