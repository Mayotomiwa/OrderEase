import { useEffect, useState } from "react";
import { Navbar as BSNavBar, Button, Container, Nav, Stack } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import '../../css/NavBar.css';
import Cart from "../../icons/cart";
import NavbarLoader from "../../loaders/NavBarLoader";
import SearchBar from "./SearchBar";
import Separator from "./seperator";

export default function NavBar() {
    const location = useLocation();
    const { cartQuantity } = useCart();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
        }, 3000);
        return () => {
            clearTimeout(t);
        }
    }, []);

    return (
        <Container fluid>
            {!loading ? (
                <BSNavBar sticky="top" className="nav shadow-sm mb-4 mt-2 d-flex" expand="lg">
                    <Container fluid>
                        <BSNavBar.Brand className="d-flex">
                            <h3>
                                <span className="title">Order</span>
                                <span className="titleColor">Ease</span>
                            </h3>
                        </BSNavBar.Brand>
                        <BSNavBar.Toggle aria-controls="responsive-navbar-nav" />
                        <BSNavBar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto ms-auto">
                                <Nav.Link to="/" as={NavLink} active={location.pathname === "/"} className="nav-item">Home</Nav.Link>
                                <Nav.Link to="/about" as={NavLink} active={location.pathname === "/about"} className="nav-item">About</Nav.Link>
                                <Nav.Link to="/contact" as={NavLink} active={location.pathname === "/contact"} className="nav-item">Contact</Nav.Link>
                                <Nav.Link to="/signup" as={NavLink} active={location.pathname === "/signup"} className="nav-item">Sign Up</Nav.Link>
                            </Nav>

                            <SearchBar />
                            <Nav>
                                <Stack direction='horizontal' gap={2}>

                                    <Nav.Link to="/profile" as={NavLink}>
                                        <Button style={{ width: '3rem', height: '3rem' }} variant="outlined-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <path d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Button>
                                    </Nav.Link>
                                    <Nav.Link to="/wishlist" as={NavLink}>
                                        <Button style={{ width: '3rem', height: '3rem' }} variant="outlined-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Button>
                                    </Nav.Link>
                                    <Nav.Link to="/cart" as={NavLink}>
                                        <Button style={{ width: '3rem', height: '3rem', position: 'relative' }} variant="outlined-primary">
                                            <Cart />
                                            {cartQuantity > 0 &&
                                                <div className="rounded-circle d-flex justify-content-center align-items-center" style={{
                                                    color: 'white',
                                                    backgroundColor: '#db4444',
                                                    width: '1.5rem',
                                                    height: '1.5rem',
                                                    position: 'absolute',
                                                    right: 0,
                                                    bottom: 0,
                                                    transform: 'translate(25%, 25%)'
                                                }}>{cartQuantity}</div>
                                            }
                                        </Button>
                                    </Nav.Link>
                                </Stack>
                            </Nav>
                        </BSNavBar.Collapse>
                    </Container>
                </BSNavBar>
            ) : (
                <NavbarLoader />
            )}

            <Separator />
        </Container>
    );
}
