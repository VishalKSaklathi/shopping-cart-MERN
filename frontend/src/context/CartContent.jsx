import React, { createContext, useContext, useState, useEffect, Children } from 'react';
import { useAuth } from './useAuth'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [count, setCount] = useState(0);
    const [quantities, setQuantities] = useState({});

    const fetchCartItems = () => {
        if (!user) return; //ensure user

        fetch(`http://localhost:5000/api/cart/${user.userID}`)
            .then((res) => res.json())
            .then((data) => {
                setCartItems(data);
                // To Set quantities in the input field of every cart element
                const qtyMap = {};
                data.forEach(item => qtyMap[item.productID] = item.quantity);
                setQuantities(qtyMap);
            });
    };
    // const fetchCartItems = () => {
    //     fetch("http://localhost:5000/api/cart")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setCartItems(data);
    //             // Set default quantities
    //             const qtyMap = {};
    //             data.forEach(item => qtyMap[item.productID] = item.quantity);
    //             setQuantities(qtyMap);
    //         });
    // };

    useEffect(() => {
        if (user && user.userID) {
            fetchCartItems();
        }
    }, [user]);

    useEffect(() => {
        setCount(cartItems.length);
    }, [count, cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, count, quantities, setQuantities, fetchCartItems }}>
            {children}
        </CartContext.Provider>
    );
}
// custom hook for usecart
export const useCart = () => useContext(CartContext);