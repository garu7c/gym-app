// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
export const CartContext = createContext();

// 2. Hook personalizado para usar el contexto fácilmente
export const useCart = () => {
    return useContext(CartContext);
    };

    // 3. El Proveedor (Provider) que manejará la lógica
    export const CartProvider = ({ children }) => {
    // 4. Estado para los items del carrito.
    // Intenta cargar el carrito desde localStorage al iniciar.
    const [cartItems, setCartItems] = useState(() => {
        try {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
        } catch (error) {
        console.error("Error al cargar el carrito:", error);
        return [];
        }
    });

    // 5. useEffect que guarda en localStorage CADA VEZ que 'cartItems' cambia
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // --- Funciones para manipular el carrito ---

    /**
     * Añade un producto al carrito.
     * Si ya existe, aumenta la cantidad.
     * @param {object} product - El objeto completo del producto
     */
    const addToCart = (product) => {
        setCartItems(prevItems => {
        // 1. Buscar si el item ya existe
        const existingItem = prevItems.find(item => item.id === product.id);

        if (existingItem) {
            // 2. Si existe, mapear y aumentar la cantidad
            return prevItems.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            // 3. Si no existe, añadirlo con cantidad 1
            return [...prevItems, { ...product, quantity: 1 }];
        }
        });
    };

    /**
     * Elimina un producto del carrito
     * @param {number} productId - El ID del producto a eliminar
     */
    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
        return prevItems.filter(item => item.id !== productId);
        });
    };

    /**
     * Limpia el carrito completamente
     */
    const clearCart = () => {
        setCartItems([]);
    };

    // 6. Valor que se comparte a toda la app
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        // Puedes añadir updateQuantity(id, qty) aquí en el futuro
    };

    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
    };