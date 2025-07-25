import React, { createContext, useState, useEffect, useCallback, Children } from 'react';
import { useAuth } from './useAuth'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [count, setCount] = useState(0);
    const [quantities, setQuantities] = useState({});
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const fetchCartItems = useCallback(() => {
        if (!user) return;
        fetch(`${BASE_URL}/api/cart/${user._id}`)
            .then((res) => res.json())
            .then((data) => {
                setCartItems(data);
                // To Set quantities in the input field of every cart element
                // console.log("Cart Items:", data);
                const qtyMap = {};
                data.forEach(item => qtyMap[item.productID] = item.quantity);
                setQuantities(qtyMap);
            });
    }, [BASE_URL, user]);

    useEffect(() => {
        if (user && user._id) {
            fetchCartItems();
        }
    }, [user, fetchCartItems]);

    useEffect(() => {
        setCount(cartItems.length);
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, count, quantities, setQuantities, fetchCartItems }}>
            {children}
        </CartContext.Provider>
    );
}