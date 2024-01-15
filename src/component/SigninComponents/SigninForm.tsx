import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { Bars } from 'react-loading-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Google from '../../icons/google';
import SignUpLoader from '../../loaders/SignUpLoader';

export default function SigninForm() {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const [pageloading, setPageLoading] = useState<boolean>(true)
    const [googleloading, setGoogleLoading] = useState<boolean>(false)
    const auth = useAuth();
    const navigate = useNavigate();
    if (!auth) {
        throw new Error("Auth context is undefined");
    }

    const { login, currentUser, loginWithGoogle } = auth;

    function handleChange() {
        navigate("/forgotpassword");
    }
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (currentUser) {
            return setError('A User Is Already Logged In')

        }
        if (emailRef.current && passwordRef.current) {
            try {
                setError('')
                setLoading(true)
                await login(emailRef.current.value, passwordRef.current.value);
                navigate('/')
            } catch (e) {
                setError('Failed To Log In')
            }
        } else {
            setError('Failed To Log In')
        }
        setLoading(false)
    }

    async function handleGoogleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (currentUser) {
            return setError('A User Is Already Logged In')
        }
        if (emailRef.current && passwordRef.current) {
            try {
                setError('')
                setGoogleLoading(true)
                await loginWithGoogle();
                navigate('/')
            } catch (e) {
                console.error(e);
                setError('Failed To Register')
            }
        }
        setLoading(false)
    }
    useEffect(() => {
        const t = setTimeout(() => {
            setPageLoading(false)
        }, 3000);
        return () => {
            clearTimeout(t);
        }
    }, []);

    return (
        <Container fluid>
            {!pageloading ? (
                <>
                    <h2 className='p-3'>
                        <span className='p-2'>Log in to</span>
                        <span>Order</span>
                        <span style={{ color: '#db4444' }}>Ease</span>

                    </h2>
                    <p className='p-4'>Enter Your Details Below</p>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form action="/submit_form" method="post">
                        <Form.Group controlId="formEmailPhone" className='mb-3 p-3'>
                            <Form.Control ref={emailRef} className='form-input' type="text" placeholder="Email" />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className='mb-3 p-3'>
                            <Form.Control ref={passwordRef} className='form-input' type="password" placeholder="Password" />
                        </Form.Group>
                        <Row style={{ paddingLeft: '2%', paddingRight: '5%' }}>
                            <Col lg={6} md={5} xs={5}>
                                <Button disabled={loading} variant="danger" type="submit" onClick={handleSubmit} className='form-btn mb-3 p-3'>
                                    {loading ? (
                                        <Bars width={"100%"} strokeWidth={"100%"} height={'100%'} stroke='none' />
                                    ) : (
                                        "Log In"
                                    )}
                                </Button>

                            </Col>
                            <Col lg={6} md={7} xs={7}>
                                <Button disabled={loading} variant="text" type="submit" className='form-text-btn mb-3' onClick={handleChange}>
                                    Forgot Password
                                </Button>
                            </Col>
                        </Row>

                    </Form>

                    <Button disabled={googleloading} variant="outline-secondary" className=' form-btn mb-3 p-3' onClick={handleGoogleSubmit}>
                        {!googleloading ? (
                            <Stack direction='horizontal' className="justify-content-center align-items-center">
                                <Google />
                                <h5 className='ms-3'>
                                    Go with Google
                                </h5>
                            </Stack>
                        ) : (
                            <Bars width={"100%"} strokeWidth={"100%"} height={'100%'} stroke='black' fill='black' />

                        )}

                    </Button>
                    <Row>
                        <Col lg={9} md={12} xs={12} className='form-text d-flex justify-content-center'>
                            <p className='login-btn'>Don't have account? <Link to="/signup" className='login-btn2'>Sign Up</Link></p>
                        </Col>
                    </Row>

                </>
            ) : (
                <SignUpLoader />
            )}
        </Container>
    );
}
