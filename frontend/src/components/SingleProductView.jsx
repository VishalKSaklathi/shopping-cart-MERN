import '../App.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, Button, Form, Row, Col, Spinner, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContent';
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom';

function SingleProductView() {
    const navigate = useNavigate();
    const { fetchCartItems } = useCart();
    const { user, isAuth } = useAuth();
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleAddToCart = () => {
        if (!isAuth) {
            navigate('/login')
            alert('Login to add items to cart!!!');
        } else {
            console.log(`Added ${quantity} items of ${productDetails.title} to cart`);
            fetch(`${BASE_URL}/api/cart`, { //API request to backend isn't working
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    productID: productDetails.id,
                    userID: user.userID,
                    title: productDetails.title,
                    price: Math.ceil(productDetails.price * 80),
                    quantity,
                    thumbnail: productDetails.thumbnail,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Response from backend:", data);
                    alert(data.message);
                    fetchCartItems();
                }).catch((err) => console.error("API error:", err));
        }
    };

    useEffect(() => {
        fetch(
            `https://dummyjson.com/products/${id}`
        )
            .then((response) => response.json())
            .then((data) => {
                setProductDetails(data);
                setIsLoading(false);
            });
    }, [id]);

    return isLoading ? (
        <div className="text-center mt-5">
            <Spinner animation="border" />
            <h5 className="mt-2">Loading...</h5>
        </div>) :
        (
            <Container mt="4">
                <Row className="mt-4">
                    <Col md={5}>
                        <Card className="p-3 shadow-sm bg-light">
                            <Card.Img
                                variant="top"
                                src={productDetails.thumbnail}
                                alt={productDetails.title}
                                style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                            />
                            <Card.Body>
                                <Card.Title>{productDetails.title}
                                    <Badge bg="success" className="ms-2">⭐{productDetails.rating}</Badge>
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{productDetails.brand}</Card.Subtitle>
                                <Card.Text>
                                    <strong>₹{Math.ceil(productDetails.price * 80)}</strong> &nbsp;
                                    <small className="text-muted">({productDetails.discountPercentage}% off)</small><br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Container className="my-4 p-4 border rounded shadow-sm bg-light">
                            <Form>
                                <Form.Group className="mb-3" controlId="formQuantity">
                                    <Form.Label className="fw-bold">Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        max={productDetails.stock}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="w-50"
                                    />
                                    <Form.Text muted>
                                        Available stock: {productDetails.stock}
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="success" onClick={handleAddToCart}>
                                    🛒 Add to Cart
                                </Button>
                            </Form>
                        </Container>
                    </Col>

                    <Col md={7} className="scrollable-section">
                        <h2>{productDetails.title}</h2>
                        <span className="mb-2 text-muted">{productDetails.brand}</span>
                        <p>
                            <strong>₹{Math.ceil(productDetails.price * 80)}</strong> &nbsp;
                            <small className="text-muted">({productDetails.discountPercentage}% off)</small><br />
                            <span className="text-warning">Rating: {productDetails.rating} / 5</span><br />
                            Category: {productDetails.category}<br />
                            Stock: {productDetails.stock}<br />
                            SKU: {productDetails.sku}<br />
                            Weight: {productDetails.weight}g<br />
                            Dimensions: {productDetails.dimensions.width} × {productDetails.dimensions.height} × {productDetails.dimensions.depth}
                        </p>
                        <h4>Description</h4>
                        <p>{productDetails.description}</p>

                        <h5>Availability</h5>
                        <p>{productDetails.availabilityStatus}</p>

                        <h5>Shipping Info</h5>
                        <p>{productDetails.shippingInformation}</p>

                        <h5>Warranty</h5>
                        <p>{productDetails.warrantyInformation}</p>

                        <h5>Return Policy</h5>
                        <p>{productDetails.returnPolicy}</p>

                        <h5>Tags</h5>
                        <p>{productDetails.tags.join(', ')}</p>

                        <h5>Reviews</h5>
                        <ul>
                            {productDetails.reviews.map((review, index) => (
                                <li key={index}>
                                    <strong>{review.reviewerName}</strong> ({review.rating}★): {review.comment}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container >
        )
}

export default SingleProductView