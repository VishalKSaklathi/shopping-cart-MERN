import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Button, Container } from 'react-bootstrap';
import '../App.css'

function Profile() {
    const { user, setIsAuth, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        setIsAuth(false);
        navigate('/login');
    };
    return (
        <Container className="profile-container mt-5">
            <h2>Welcome, {user?.name || 'User'}!</h2>
            <p><strong>ID:</strong> {user?._id}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Contact:</strong> {user?.phone}</p>
            <p><strong>Address:</strong> {user?.address}</p>

            <Button className="logout-btn" onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    )
}

export default Profile