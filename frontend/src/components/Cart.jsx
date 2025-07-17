import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContent';
import { useAuth } from '../context/useAuth';
import emptyCartImg from '../assets/empty_cart.png';
import '../App.css'

function Cart() {
    const { cartItems, quantities, setQuantities, fetchCartItems } = useCart();
    const [totalAmount, setTotalAmount] = useState(0);
    const { count } = useCart();
    const { user } = useAuth();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Update Quantity
    const handleUpdate = (id, newQty) => {
        fetch(`${BASE_URL}/api/cart/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: newQty, userID: user.userID }),
        })
            .then(res => res.json())
            .then(() => {
                fetchCartItems()
                // console.log("Request is received until here....");
            });
    };
    const addValue = (id) => {
        const newQty = (quantities[id] || 1) + 1;
        setQuantities(prev => ({ ...prev, [id]: newQty }))
        handleUpdate(id, newQty);
        console.log("Count Incresed", newQty);
    }
    const removeValue = (id) => {
        const currentQty = quantities[id] || 1;
        const newQty = currentQty > 1 ? currentQty - 1 : 1;
        setQuantities(prev => ({ ...prev, [id]: newQty }))
        handleUpdate(id, newQty);
        console.log("Count Dereased", newQty);
    }

    // Remove Item
    const handleRemove = (id) => {
        fetch(`${BASE_URL}/api/cart/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then((data) => {
                alert(data.message);
                fetchCartItems()
            });
    };

    // Handle quantity input
    // const handleQtyChange = (id, value) => {
    //     setQuantities(prev => ({ ...prev, [id]: Number(value) }));
    // };

    useEffect(() => {
        const amount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        setTotalAmount(amount);
    }, [cartItems]);

    return (count != 0) ?
        (
            <>
                <Container className="my-4">
                    <h3 className="mb-4">
                        <FaShoppingCart className="me-1" />Your Cart</h3>
                    <Row>
                        <Col md={8}>
                            <Container>
                                {cartItems.map(item => (
                                    <Row key={item.productID} className="align-items-center border p-3 mb-3 shadow-sm position-relative">
                                        <FaTrash
                                            className='dust-icon text-secondary'
                                            onClick={() => handleRemove(item.productID)}
                                            title="Remove from cart"
                                        />
                                        <Col md={3} sm={4} xs={12}>
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="img-fluid rounded"
                                                style={{ maxHeight: '120px' }}
                                            />
                                        </Col>

                                        <Col md={9} sm={8} xs={12}>
                                            <h5>{item.title}</h5>

                                            {/* Quantity Input + Update Button */}
                                            <Form className="d-flex align-items-center mb-2">
                                                {/* <Form.Control
                                                type="number"
                                                min="1"
                                                value={quantities[item.productID] || 1}
                                                onChange={e => handleQtyChange(item.productID, e.target.value)}
                                                className="me-2"
                                                style={{ width: '100px' }}
                                            /> */}
                                                {/* <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleUpdate(item.productID)}
                                            >
                                                Update
                                            </Button> */}
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => removeValue(item.productID)}
                                                >-</Button>
                                                <Form.Control
                                                    type="text"
                                                    readOnly
                                                    value={quantities[item.productID] || 1}
                                                    className="mx-2 text-center"
                                                    style={{
                                                        width: '50px',
                                                        borderTop: '1px solid #000',
                                                        borderBottom: '1px solid #000',
                                                        borderLeft: 'none',
                                                        borderRight: 'none',
                                                        borderRadius: '0', // optional: remove rounded corners
                                                    }}
                                                />
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => addValue(item.productID)}
                                                >+</Button>
                                            </Form>

                                            <p className="mb-1">Price: ₹{item.price}</p>
                                            <p className="fw-bold">Total: ₹{item.price * item.quantity}</p>

                                            {/* Remove Button */}
                                        </Col>
                                    </Row>
                                ))}
                            </Container>
                        </Col>
                        <Col md={4} className="p-4 border rounded shadow-sm bg-light" style={{ height: 'auto', minHeight: '35vh' }}>
                            <h5 className="mb-3 border-bottom pb-2"> Price Details</h5>
                            {cartItems.map(item => (
                                <div key={item.productID} className='mb-2 d-flex justify-content-between'>
                                    <span > {item.title} </span>
                                    <span>{item.price * item.quantity}/-</span>
                                </div>

                            ))}

                            <div className="mb-2 d-flex justify-content-between">
                                <b><span>Price ({count} item{count !== 1 ? 's' : ''})</span></b>
                                <b><span>₹{totalAmount}</span></b>
                            </div>
                            <div className="mb-2 d-flex justify-content-between text-success">
                                <span>Discount (10%)</span>
                                <span>- ₹{(0.10 * totalAmount).toFixed(2)}</span>
                            </div>

                            <div className="border-top pt-2 d-flex justify-content-between fw-bold">
                                <span>Total Amount</span>
                                <span>₹{(totalAmount - (0.10 * totalAmount)).toFixed(2)}</span>
                            </div>

                            <div className="mt-4 text-center">
                                <Link to="/checkout">
                                    <Button variant="success" className="w-100">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </>
        ) :
        (<><div className='empty-cart' >
            <img src={emptyCartImg} alt="empty_cart_img" className='empty-cart-img' />
            <span>No items in the cart</span>
        </div ></>);
}

export default Cart;
