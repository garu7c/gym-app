import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContexts";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from "./contexts/CartContext"

const GOOGLE_CLIENT_ID = "49601852139-e9j9phauklg852t5nlub7gvh5sg37tq6.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
