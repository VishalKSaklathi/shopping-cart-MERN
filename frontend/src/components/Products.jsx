import { useState, useEffect } from 'react'
import Item from './Item';
import Filter from './Filter';
import { Spinner, Row, Col, Form, Container } from 'react-bootstrap/';
import { useLocation } from 'react-router-dom';

// API 20 : https://fakestoreapi.com/products/
// API - more features 30: https://dummyjson.com/products/
function Products() {
    const [products, setProducts] = useState([]); // full product data
    const [loading, setLoading] = useState(true); // loading state
    //states to filter values
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState([]);
    const [rating, setRating] = useState(5);

    const handleFavAdd = (product) => {
        // Send to FavItems component or update state
        console.log(" Fav clicked:", product);
        // e.g., setFavItems(prev => [...prev, product])
    };

    useEffect(() => {
        fetch(`https://dummyjson.com/products/`)
            .then(res => res.json())
            .then(data =>
                setProducts(data.products),
            )
            .finally(setLoading(false))
            .catch(error => console.error("Error fetching data:", error));
    }, [])
    const location = useLocation();
    const catg = location.state?.catg;
    useEffect(() => {
        if (catg) {
            setCategory(catg); // wrap it in an array
        }
    }, [catg]);
    return loading ? (
        <div className="text-center mt-5">
            <Spinner animation="border" />
            <h5 className="mt-2">Loading...</h5>
        </div>
    ) : (
        <div className="animated-bg">
            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Col md={3} className="p-3 border shadow-sm sidebar-sticky">
                        <Filter
                            price={price}
                            setPrice={setPrice}
                            rating={rating}
                            setRating={setRating}
                            category={category}
                            setCategory={setCategory} />
                    </Col>

                    {/* Product Grid */}
                    <Col md={9}>
                        <Container className='my-4'>
                            <Row xs={2} md={3} lg={4} className="g-1">
                                {products
                                    .filter(product =>
                                        (Math.ceil(product.price * 80) <= price) &&
                                        (rating === 5 || product.rating <= rating) &&
                                        (category.length === 0 || category.includes(product.category.toLowerCase()))
                                    )
                                    .map((product) => (
                                        <Col key={product.id}> {
                                            <Item product={product} onFavAdd={handleFavAdd} />
                                        }
                                        </Col>
                                    ))}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Products