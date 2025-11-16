// src/components/CartModal.jsx (ACTUALIZADO)
import React, { useMemo, useContext } from 'react'; // 1. Importar useContext
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContexts'; // 2. Importar AuthContext
import { Button } from './ui/button';
import { X, Trash2, ShoppingCart } from 'lucide-react';

const formatPrice = (p) => p.toFixed(2);

export const CartModal = ({ isOpen, onClose, darkMode }) => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { token } = useContext(AuthContext); // 3. Obtener el token de autenticación

    // Calcula el precio total (sin cambios)
    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
    }, [cartItems]);

    // --- 4. FUNCIÓN handleCheckout (¡ACTUALIZADA!) ---
    const handleCheckout = async () => {
        if (!token) {
        alert("Debes iniciar sesión para comprar.");
        return;
        }

        // Prepara el cuerpo (body) que el backend espera (List<CartItemDto>)
        //
        // Mapeamos los items del carrito para enviar solo lo necesario
        const body = cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        nombre: item.nombre,
        precio: item.precio
        }));

        try {
        const response = await fetch("https://cla-royale.azure-api.net/api/checkout", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            // ¡CRUCIAL! Envía el token para el [Authorize]
            'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error("Error al procesar el pedido. Intenta de nuevo.");
        }

        // Si todo sale bien...
        alert("¡Pedido recibido! Se está procesando tu notificación.");
        clearCart(); // Limpia el carrito
        onClose(); // Cierra el modal

        } catch (error) {
        console.error("Error en el checkout:", error);
        alert(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
        <div 
            className={`relative w-full max-w-lg p-6 rounded-2xl shadow-xl ...`}
            // ... (resto del JSX del modal sin cambios)
        >
            {/* Encabezado y Botón de Cerrar */}
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2" />
                Tu Carrito
            </h2>
            <button onClick={onClose} /* ... */>
                <X className="w-5 h-5" />
            </button>
            </div>

            {/* Contenido del Carrito (sin cambios) */}
            <div className="max-h-[60vh] overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Tu carrito está vacío.</p>
            ) : (
                <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 ...">
                    <img 
                        src={item.imageUrl1 || item.images?.[0] || 'https://via.placeholder.com/100'} 
                        alt={item.nombre} 
                        className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold">{item.nombre}</h3>
                        <p className="text-sm text-gray-500">
                        Cantidad: {item.quantity}
                        </p>
                        <p className={`font-bold ...`}>
                        ₡{formatPrice(item.precio * item.quantity)}
                        </p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    </div>
                ))}
                </div>
            )}
            </div>

            {/* Footer del Modal (Total y Acciones) (sin cambios) */}
            {cartItems.length > 0 && (
            <div className="mt-6 pt-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className={`text-2xl font-extrabold ...`}>
                    ₡{formatPrice(totalPrice)}
                </span>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2">
                <Button variant="outline" onClick={clearCart} /* ... */>
                    Vaciar Carrito
                </Button>
                <Button 
                    onClick={handleCheckout} // <--- Esta función ahora llama al backend
                    className={`flex-1 ${darkMode ? "bg-red-800 ..." : "bg-yellow-500 ..."}`}
                >
                    Proceder al Pago (Comprar)
                </Button>
                </div>
            </div>
            )}
        </div>
        </div>
    );
};