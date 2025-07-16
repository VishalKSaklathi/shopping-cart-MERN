import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Button, Container } from 'react-bootstrap';
import '../App.css'

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    return (
        <Container className="profile-container mt-5">
            <h2>Welcome, {user?.userName || 'User'}!</h2>
            <p><strong>ID:</strong> {user?.userID}</p>
            <p><strong>Email:</strong> {user?.userEmail}</p>
            <p><strong>Contact:</strong> {user?.userphoneNo}</p>
            <p><strong>Address:</strong> {user?.userAddress}</p>

            <Button className="logout-btn" onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    )
}

export default Profile