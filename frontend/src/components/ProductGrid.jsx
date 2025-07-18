import React from 'react'
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Item from './Item';

function ProductGrid() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=15')
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
            .catch((err) => console.error('Failed to fetch products:', err));
    }, []);
    return (
        <Container className="py-4" fluid>
            <h2 className="mb-4 text-center">Products</h2>
            <Row xs={2} md={3} lg={4}>
                {products.map((product) => (
                    <Col key={product.id} md={4} sm={6} className="mb-4">
                        <Item product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ProductGrid