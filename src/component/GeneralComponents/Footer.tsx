import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../css/Footer.css';

const FooterLoader = React.lazy(() => import('../../loaders/FooterLoader'));


export default function Footer() {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();


    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
        }, 3000);
        return () => {
            clearTimeout(t);
        }
    }, []);
    return (
        <>
            {!loading ? (
                <Container fluid id="footer">
                    <div className="footer-top">
                        <Container>
                            <Row>

                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-info">
                                        <h3>
                                            <span className="title">Order</span>
                                            <span className="titleColor">Ease</span>
                                        </h3>
                                        <h5 className='subscribe'>
                                            Subscribe
                                        </h5>
                                        <p className='subscribe'>
                                            Get 5% off your first order
                                        </p>

                                    </div>
                                    <Form className="col-lg-10 col-md-6 footer-newsletter">
                                        <Form.Group className='form-item'>
                                            <Form.Control type="email" name="email" placeholder='Enter your email' className='form-items-email custom-placeholder' />
                                            <Button type="submit" className='form-items-submit' variant='outlined-primary'>
                                                <svg className='hover' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M9.91199 12H3.99999L2.02299 4.13505C2.01033 4.08934 2.00262 4.0424 1.99999 3.99505C1.97799 3.27405 2.77199 2.77405 3.45999 3.10405L22 12L3.45999 20.896C2.77999 21.223 1.99599 20.737 1.99999 20.029C2.00201 19.9658 2.01313 19.9031 2.03299 19.843L3.49999 15" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                        </Form.Group>
                                    </Form>

                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-info">
                                        <h3>Support</h3>
                                        <p className='subscribe'>
                                            201, Ikeja,  PO 10001, Lagos, Nigeria.
                                        </p>
                                        <p className='subscribe'>
                                            info@orderease.com
                                        </p>
                                        <p className='subscribe'>
                                            +234 90-8888-9999
                                        </p>

                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-6">
                                    <div className="footer-info">
                                        <h3>Account</h3>
                                        <p onClick={() => {navigate('/profile')}} className='subscribe'>
                                            My Account
                                        </p>
                                        <p onClick={() => {navigate('/signup')}} className='subscribe'>
                                            LogIn / Register
                                        </p>
                                        <p onClick={() => {navigate('/cart')}} className='subscribe'>
                                            Cart
                                        </p>
                                        <p onClick={() => {navigate('/wishlist')}} className='subscribe'>
                                            Wishlist
                                        </p>

                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-6">
                                    <div className="footer-info">
                                        <h3>Quick Links</h3>
                                        <p className='subscribe'>
                                            Privacy Policy
                                        </p>
                                        <p className='subscribe'>
                                            Terms Of Use
                                        </p>
                                        <p className='subscribe'>
                                            FAQ
                                        </p>
                                        <p onClick={() => {navigate('/contact')}} className='subscribe'>
                                            Contact
                                        </p>

                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-6">
                                    <div className="footer-info">
                                        <h3>Download App</h3>
                                        <h3 className='subscribe'>Coming soon on all platforms</h3>

                                    </div>
                                </div>

                            </Row>
                        </Container>
                    </div>

                    <Container className="container">
                        <div className="copyright">
                            &copy; Copyright <strong><span> <span className="title">Order</span>
                                <span className="titleColor">Ease</span></span></strong>. All Rights Reserved
                        </div>
                        <div className='credits'>
                            <span style={{ color: '#db4444' }}>Designed by:</span><span style={{ fontStyle: 'italic' }}> Oluseyi Mayotomiwa Immanuel</span>
                        </div>
                    </Container>
                </Container>

            ) : (
                <FooterLoader />
            )}
        </>
    )
}

