import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContent';
import { useAuth } from '../context/useAuth';
import {
    Container, Row, Col, Form, Button, Card, InputGroup, Badge,
} from 'react-bootstrap';

function Checkout() {
    const { count, cartItems } = useCart();
    const { user } = useAuth();
    const [amount, setAmount] = useState(0);
    const [formData, setFormData] = useState({
        firstName: user?.userName || '',
        lastName: '',
        phone: user?.userphoneNo || '',
        email: user?.userEmail || '',
        address: user?.userAddress || '',
        state: '',
        district: '',
        zip: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const payNow = async () => {
        // e.preventDefault();
        // Create order by calling the server endpoint
        console.log(`Transactioning amount of value ${amount}`)
        const response = await fetch('http://localhost:5000/api/payment/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1', notes: {} })
        });
        const order = await response.json();
        // Open Razorpay Checkout
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
            amount: order.amount,
            currency: order.currency,
            name: 'Your Company Name',
            description: 'Test Transaction',
            order_id: order.id, // This is the order_id created in the backend
            callback_url: 'http://localhost:5173/payment-success', // Your success URL
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.contact
            },
            theme: {
                color: '#F37254'
            },
            handler: function (response) {
                // console.log("Payment success:", response);
                // window.location.href = '/payment-success';  // React route
                fetch('http://localhost:5000/api/payment/verify-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    })
                }).then(res => res.json())
                    .then(data => {
                        if (data.status === 'ok') {
                            //i have to call a functin ar something taht directs to backend
                            fetch('http://localhost:5000/api/payment/clear-cart', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ userID: user.userID })
                            }).then(response => {
                                if (!response.ok) {
                                    throw new Error('Failed to clear cart');
                                }
                                return response.json();
                            }).then(data => {
                                console.log('Cart cleared:', data);
                                window.location.href = '/payment-success';
                            }).catch(err => {
                                console.error('Error clearing cart:', err);
                            });
                        } else {
                            alert('Payment verification failed');
                        }
                    }).catch(error => {
                        console.error('Error:', error);
                        alert('Error verifying payment');
                    });
            }
        };
        const rzp = new window.Razorpay(options);//need to chk
        rzp.open();
    }
    //handle amount
    useEffect(() => {
        const amount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        setAmount(amount);
    }, [cartItems]);
    return (
        <Container className="py-5">
            <div className="text-center mb-4">
                <h2>Checkout form</h2>
                <p className="lead">Please fill up required details below</p>
            </div>

            <Row>
                <Col md={4}>
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">My cart</span>
                        <Badge bg="secondary" pill>{count}</Badge>
                    </h4>
                    <ul className="list-group mb-3">
                        {cartItems.map(item => (
                            <li key={item.productID} className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">{item.title}</h6>
                                    {/* <small className="text-muted">{item.category}</small> */}
                                </div>
                                <span className="text-muted">₹{item.price * item.quantity}</span>
                            </li>
                        ))}
                        {/* <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                                <h6 className="my-0">Promo code</h6>
                                <small>DISCOUNT</small>
                            </div>
                            <span className="text-success">−10%</span>
                        </li> */}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total</span>
                            <strong>₹{amount}</strong>
                        </li>
                    </ul>

                    {/* <Card className="p-2">
                        <InputGroup>
                            <Form.Control placeholder="Promo code" />
                            <Button variant="secondary">Redeem</Button>
                        </InputGroup>
                    </Card> */}
                </Col>

                <Col md={8}>
                    <h4 className="mb-3">Billing address</h4>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Valid first name is required.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Valid last name is required.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Contact Info</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>+91</InputGroup.Text>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Phone Number"
                                />
                                <Form.Control.Feedback type="invalid">Your username is required.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control required placeholder="Username" />
                                <Form.Control.Feedback type="invalid">Your username is required.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group> */}

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email <span className="text-muted">(Optional)</span></Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="1234 Main St"
                            />

                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="address2">
                            <Form.Label>Address 2 <span className="text-muted">(Optional)</span></Form.Label>
                            <Form.Control placeholder="Apartment or suite" />
                        </Form.Group> */}

                        <Row>
                            <Col md={5} className="mb-3">
                                <Form.Group controlId="country">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required>
                                        <option value="">Choose...</option>
                                        <option value='Karnataka'>Karnataka</option>
                                        <option value='Maharastra'>Maharastra</option>
                                        <option value='Telangana'>Telangana</option>
                                        <option value='Kerala'>Kerala</option>
                                        <option value='Tamilnadu'>Tamilnadu</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4} className="mb-3">
                                <Form.Group controlId="state">
                                    <Form.Label>District</Form.Label>
                                    <Form.Select
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required>
                                        <option value="">Choose...</option>
                                        <option value='Uttara Kannada'>Uttara Kannada</option>
                                        <option value='Hubli-Dharwad'>Hubli-Dharwad</option>
                                        <option value='Bengaluru'>Bengaluru</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3} className="mb-3">
                                <Form.Group controlId="zip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* <hr className="mb-4" /> */}

                        {/* <Form.Check
                            type="checkbox"
                            label="Shipping address is the same as my billing address"
                            id="same-address"
                        />
                        <Form.Check
                            type="checkbox"
                            label="Save this information for next time"
                            id="save-info"
                        /> */}

                        {/* <hr className="mb-4" />
                        <Container className='bg-body-secondary rounded-3 p-4'>
                            <h4 className="mb-3">Payment</h4>

                            <div className="mb-3">
                                <Form.Check
                                    type="radio"
                                    label="Credit card"
                                    name="paymentMethod"
                                    id="credit"
                                    defaultChecked
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    label="Debit card"
                                    name="paymentMethod"
                                    id="debit"
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    label="Paypal"
                                    name="paymentMethod"
                                    id="paypal"
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    label="UPI"
                                    name="paymentMethod"
                                    id="paypal"
                                    required
                                />
                            </div>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group controlId="cc-name">
                                        <Form.Label>Name on card</Form.Label>
                                        <Form.Control required />
                                        <Form.Text className="text-muted">Full name as displayed on card</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group controlId="cc-number">
                                        <Form.Label>Credit card number</Form.Label>
                                        <Form.Control required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={3} className="mb-3">
                                    <Form.Group controlId="cc-expiration">
                                        <Form.Label>Expiration</Form.Label>
                                        <Form.Control required />
                                    </Form.Group>
                                </Col>
                                <Col md={3} className="mb-3">
                                    <Form.Group controlId="cc-cvv">
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control required />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container> */}

                        {/* <hr className="mb-4" /> */}
                        <Button variant="primary" size="lg" className="w-100" onClick={() => payNow()}>Continue to checkout</Button>
                    </Form>
                </Col>
            </Row>

            <footer className="pt-5 text-center text-muted text-small">
                <p className="mb-1">&copy; 2020-2021 therichpost.com</p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#">Privacy</a></li>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Support</a></li>
                </ul>
            </footer>
        </Container>
    );
}

export default Checkout;
