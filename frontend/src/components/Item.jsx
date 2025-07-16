import '../App.css';

import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaHeart } from 'react-icons/fa';

function Item({ product, onFavAdd }) {
    const [isFav, setIsFav] = useState(false);
    const detailUrl = `/products/${product.id}`

    const handleFavClick = (e) => {
        e.preventDefault(); // Prevent Link navigation

        const newState = !isFav;
        setIsFav(newState);
        if (newState) {
            onFavAdd(product); // Only send if marked as fav
        } // Send product to parent (FavItems handler)
    };
    return (
        <Link to={detailUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className="h-100 hover-card" style={{ width: '100%' }} >
                <FaHeart
                    className={`fav-icon ${isFav ? 'fav-active' : ''}`}
                    onClick={handleFavClick}
                    title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                />
                <Card.Img variant="top" src={product.thumbnail} />
                <Card.Body>
                    <Card.Title >{product.title}
                        <Badge bg="success" className="ms-2">⭐{product.rating}</Badge>
                    </Card.Title>
                    <Card.Text >
                        {product.brand}
                        {product.brand && <br />}
                        ₹{Math.ceil(product.price * 80)}
                    </Card.Text>
                    <div className="hover-hint">Click to see product</div>
                    {/* <Link to={detailUrl}><Button variant="info">See Product</Button></Link> */}
                </Card.Body>
            </Card>
        </Link>
    );
}

export default Item;