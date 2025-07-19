import React, { useEffect } from 'react';
import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../Home.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import AllService from './AllService';
import ProductGrid from './ProductGrid';
function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible');
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Container className="mt-2 thumbnail-container" fluid>
                <div className="animated-text">
                    <h2 className="headline">Welcome to <span style={{ color: '#f39c12' }}>Shopping Cart</span> </h2>
                    <p className="subtext">
                        Your <span style={{
                            backgroundColor: '#28b463', color: '#fff', paddingBottom: '4px', marginTop: '2px'
                        }}>one-stop</span> platform for quality products at unbeatable prices
                    </p>
                </div>
                <Image
                    src="https://deerdesigner.com/wp-content/uploads/2024/05/Article-34-ecommerce-design-01.png.webp"
                    thumbnail
                    alt="Thumbnail"
                    className='thumbnail-img'
                />
                {/* <div className="text-center my-4">
                    <h3 className="mb-4">We Respect</h3>
                    <div className="d-flex justify-content-center gap-4 flex-wrap">
                        <div
                            className="respect-circle text-white"
                            style={{
                                background: 'linear-gradient(135deg, #90ee90, #32cd32)', // LightGreen gradient
                            }}
                        >
                            Customer
                        </div>
                        <div
                            className="respect-circle text-white"
                            style={{
                                background: 'linear-gradient(135deg, #ffa500, #ff7f50)', // Orange gradient
                            }}
                        >
                            Quality
                        </div>
                        <div
                            className="respect-circle text-dark"
                            style={{
                                background: 'linear-gradient(135deg, #d3d3d3, #f5f5f5)', // Grey to White gradient
                            }}
                        >
                            Experience
                        </div>
                    </div>
                </div> */}
            </Container>
            {/* <ScrollTimeline /> */}
            <AllService />
            <Container fluid my={2} className="text-center">
                <h2 className='headline-text mx-4'>Top Categories</h2>
                <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4 mx-2">
                    {/* for Groceries */}

                    <Col md={6}>
                        <Link
                            to="/products"
                            state={{ catg: ['groceries'] }}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card
                                // onClick={() => handleCard('groceries')}
                                className="Item-card text-white" style={{ width: '320px', height: '240px' }}>
                                <div className="image-container">
                                    <Card.Img
                                        src="https://plus.unsplash.com/premium_photo-1676963357751-8b0339f9e468?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Card image"
                                        height="250px"
                                    />
                                </div>

                                <Card.ImgOverlay className="Item-overlay d-flex flex-column justify-content-end">
                                    <div className="hover-text scroll-reveal">
                                        <Card.Text className='pb-2'>
                                            Explore our grocery collection with fresh
                                            produce, daily essentials like eggs and milk,
                                            and pantry staples including beans and grains.
                                        </Card.Text>
                                    </div>
                                    <Card.Title className="always-show">Groceries</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>
                    </Col>
                    {/* For Beuty and fragnances */}
                    <Col>
                        <Link
                            to="/products"
                            state={{ catg: ['beauty', 'fragrances'] }}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card
                                className="Item-card text-white" style={{ width: '320px', height: '240px' }}>
                                <div className="image-container">
                                    <Card.Img
                                        src="https://plus.unsplash.com/premium_photo-1720433639528-5d1ce620ae27?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Card image"
                                        height="250px"
                                    />
                                </div>

                                <Card.ImgOverlay className="Item-overlay d-flex flex-column justify-content-end">
                                    <div className="hover-text scroll-reveal">
                                        <Card.Text className='pb-2'>
                                            Indulge in self-care with our exquisite beauty picks and enchanting fragrances.
                                        </Card.Text>
                                    </div>
                                    <Card.Title className="always-show">Beauty & Fragnances</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>
                    </Col>
                    {/* Furnitures */}
                    <Col>
                        <Link
                            to="/products"
                            state={{ catg: ['furniture'] }}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card className="Item-card text-white" style={{ width: '320px', height: '240px' }}>
                                <div className="image-container">
                                    <Card.Img
                                        src="https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Card image"
                                        height="250px"
                                    />
                                </div>

                                <Card.ImgOverlay
                                    className="Item-overlay d-flex flex-column justify-content-end">
                                    <div className="hover-text scroll-reveal">
                                        <Card.Text className='pb-2'>
                                            Redefine comfort with stylish furniture built for your space
                                        </Card.Text>
                                    </div>
                                    <Card.Title className="always-show">Furnitures</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Link
                            to="/products"
                            state={{ catg: '' }}
                            style={{ textDecoration: 'none' }}
                        ><Card className="Item-card text-white" style={{ width: '320px', height: '240px' }}>
                                <div className="image-container ">
                                    <Card.Img
                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Card image"
                                        height="250px"
                                    />
                                </div>

                                <Card.ImgOverlay
                                    className="Item-overlay d-flex flex-column justify-content-end">
                                    <div className="hover-text scroll-reveal">
                                        <Card.Text className='pb-2'>
                                            From daily must-haves to rare gems – browse our versatile collection!
                                        </Card.Text>
                                    </div>
                                    <Card.Title className="always-show">Others</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container >
            <ProductGrid />
            <Footer />
        </>
    );
}

export default Home;
