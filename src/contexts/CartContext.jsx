import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
    };

    export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
        } catch (error) {
        console.error("Error al cargar el carrito:", error);
        return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Funciones para manipular el carrito
    const addToCart = (product) => {
        setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);

        if (existingItem) {
            return prevItems.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            return [...prevItems, { ...product, quantity: 1 }];
        }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
        return prevItems.filter(item => item.id !== productId);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    //Valor que se comparte a toda la app
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
    };