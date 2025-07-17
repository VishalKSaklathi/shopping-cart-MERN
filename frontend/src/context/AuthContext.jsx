import React, { createContext, useState, useEffect, Children } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('login');
    // const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/auth/check`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setUser(null);
            }
        };
        checkAuth();
    }, [BASE_URL]);
    //logout handle
    const logout = async () => {
        try {
            await fetch(`${BASE_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, isAuth: !!user, activeTab, setActiveTab }}>
            {children}
        </AuthContext.Provider>
    );

}