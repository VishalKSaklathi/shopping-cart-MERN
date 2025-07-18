import React from 'react';
import Login from './Login';     // Ensure these are imported correctly
import SignUp from './SignUp';
import '../Card.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/useAuth'

function AuthCard() {
    const { activeTab, setActiveTab } = useAuth();
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                {/* Tabs */}
                <div className="d-flex justify-content-around mb-4">
                    <Button
                        variant={activeTab === 'login' ? 'success' : 'outline-success'}
                        onClick={() => setActiveTab('login')}
                        className="w-50 me-1"
                    >
                        Login
                    </Button>
                    <Button
                        variant={activeTab === 'signup' ? 'success' : 'outline-success'}
                        onClick={() => setActiveTab('signup')}
                        className="w-50 ms-1"
                    >
                        Signup
                    </Button>
                </div>

                {/* Content */}
                <div>
                    {activeTab === 'login' ? <Login /> : <SignUp />}
                </div>
            </Card>
        </Container>
    );
}

export default AuthCard;
