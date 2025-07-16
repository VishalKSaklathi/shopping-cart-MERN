import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth'

function SignUp() {
    const [values, setValues] = useState({
        name: '',
        pass: '',
        phone: 0,
        address: '',
        email: ''
    });

    const { setActiveTab } = useAuth();
    const [tempPassword, setTempPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === 'phone' ? (value === '' ? 0 : Number(value)) : value;

        setValues({ ...values, [name]: newValue });
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        const { name, phone, address, email, pass } = values;

        if (!name || !email || !phone || !address || !pass || !tempPassword) {
            setError('Please fill out all fields');
            return;
        }
        //passowrd handle
        if (pass !== tempPassword) {
            setError('Passwords do not match');
            return;
        }
        // Simulate user creation
        console.log('User created:', values)
        fetch('http://localhost:5000/api/auth/signup', { //API request to backend isn't working
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
            .then((res) => res.json())
            .then(() => {
                setActiveTab('login');
            }).catch((err) => console.error("Sign Up", err));
        // Redirect to login after signup
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h3 className="mb-3">Sign Up</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="signupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signupPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        name='phone'
                        placeholder="Enter Phone No."
                        value={values.phone === 0 ? '' : values.phone}
                        onChange={handleChange}
                        maxLength="10"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signupAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter name"
                        value={values.address}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="pass"
                        placeholder="Create password"
                        value={values.pass}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="checkPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Re-enter password"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;
