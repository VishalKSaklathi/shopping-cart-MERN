import '../App.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/useCart';
import { useSearch } from '../context/useSearch';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

function NavBar({ expanded, setExpanded }) {
    const { count } = useCart();
    const { searchText, setSearchText } = useSearch();
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    return (
        <Navbar expand="lg" fixed="top"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            className="d-flex  justify-content-between align-items-center p-2 navbar"
        >
            <Container >
                <Navbar.Brand href="/" style={{ color: '#f4f4f4' }}>Shopping Cart</Navbar.Brand>
                <Navbar.Collapse>
                    <Form className="d-flex "
                        style={{ flex: 1, maxWidth: "500px" }}
                        onSubmit={(e) => {
                            e.preventDefault()
                            navigate('/search')
                        }}>
                        <Form.Control
                            type="search"
                            placeholder="Search by product, category name"
                            className="me-2"
                            aria-label="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        {/* <Button type="submit" variant="outline-success">Search</Button> */}
                    </Form>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '120px' }}

                    >
                        <Nav.Link href="/" className='color-text'>Home</Nav.Link>
                        <Nav.Link href="/products" className='color-text'>Products</Nav.Link>
                        {!isAuth ?

                            <Nav.Link href="/login" className='color-text'>Login</Nav.Link>
                            :
                            <Nav.Link href="/profile" className='color-text'>Profile</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
                <div className='d-flex align-item-center'>
                    <Nav className="ms-auto mx-4">
                        <Nav.Link href="/cart" className="position-relative">
                            <FaShoppingCart size={20} className='color-text' />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                {count}
                            </span>
                        </Nav.Link>
                    </Nav>
                    <Navbar.Toggle aria-controls="navbarScroll" className='color-text' />
                </div>
            </Container>
        </Navbar>
    )
}

export default NavBar