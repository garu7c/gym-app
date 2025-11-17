import React, { useMemo, useContext } from 'react'; 
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContexts';
import { Button } from './ui/button';
import { X, Trash2, ShoppingCart } from 'lucide-react';

const formatPrice = (p) => p.toFixed(2);

export const CartModal = ({ isOpen, onClose, darkMode, onCheckoutSuccess }) => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { token } = useContext(AuthContext);

    // Calcula el precio total (sin cambios)
    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
    }, [cartItems]);

    const handleCheckout = async () => {
        if (!token) {
        alert("Debes iniciar sesión para comprar.");
        return;
        }
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
            'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error("Error al procesar el pedido. Intenta de nuevo.");
        }

        if (onCheckoutSuccess) {
            onCheckoutSuccess("Tu pedido ha sido enviado a la cola. ¡Pronto recibirás una notificación!");
        }
        clearCart(); 
        onClose();   

        } catch (error) {
        console.error("Error en el checkout:", error);
        alert(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
        <div 
            className={`relative w-full max-w-lg p-6 rounded-2xl shadow-xl transition-colors
                ${darkMode ? "bg-red-900 text-white" : "bg-yellow-500 text-black"}
            `}
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

            {/* Footer del Modal */}
            {cartItems.length > 0 && (
            <div className="mt-6 pt-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className={`text-2xl font-extrabold ...`}>
                    ₡{formatPrice(totalPrice)}
                </span>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2">
                <Button variant="destructive" onClick={clearCart} /* ... */>
                    Vaciar Carrito
                </Button>
                <Button 
                    onClick={handleCheckout} 
                    className={`flex-1 ${darkMode ? "bg-black hover:bg-gray-700" : "bg-yellow-500 hover:bg-yellow-600"} text-white dark:text-white`}
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