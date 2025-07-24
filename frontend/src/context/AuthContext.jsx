import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
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
                    console.log('Auth check response:', data);
                    setUser(data.user);
                    setIsAuth(true);
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
        <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth, activeTab, setActiveTab, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
export default AuthProvider;