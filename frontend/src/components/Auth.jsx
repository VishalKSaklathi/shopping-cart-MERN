import React from 'react';
import Login from './Login';     // Ensure these are imported correctly
import SignUp from './SignUp';
import '../Card.css';
import { useAuth } from '../context/useAuth'

function Card() {
    const { activeTab, setActiveTab } = useAuth();
    return (

        <div className="card-container">
            <div className="card-tabs">
                <button
                    className={activeTab === 'login' ? 'active' : ''}
                    onClick={() => setActiveTab('login')}
                >
                    Login
                </button>
                <button
                    className={activeTab === 'signup' ? 'active' : ''}
                    onClick={() => setActiveTab('signup')}
                >
                    Signup
                </button>
            </div>
            <div className="card-content">
                {activeTab === 'login' ? <Login /> : <SignUp />}
            </div>
        </div>
    );
}

export default Card;
