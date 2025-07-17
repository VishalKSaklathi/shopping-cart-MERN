import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth'

function Login() {
    const { setUser } = useAuth();
    const [values, setValues] = useState({ email: '', pass: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleChange = e => {
        const { name, value } = e.target;
        setValues(v => ({ ...v, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        //Valid
        const { email, pass } = values;
        if (!email || !pass) {
            setError('Please enter both email and password');
            return;
        }

        try {
            const res = await fetch(
                `${BASE_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, pass }),
                    credentials: 'include'
                }
            );
            const data = await (res.headers.get('content-type')?.includes('application/json')
                ? res.json()
                : Promise.reject(new Error('Invalid JSON response')));

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }
            setUser(data.user);
            console.log('Current User:', data)
            if (data) {
                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h3 className="mb-3">Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name='email'
                        type="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name='pass'
                        type="password"
                        placeholder="Password"
                        value={values.pass}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
                <span >Aren't you registered yet? <Link to="/signup"> Sign Up</Link></span>
            </Form>
        </Container>
    );
}

export default Login;
