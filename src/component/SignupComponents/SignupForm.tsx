import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { Bars } from 'react-loading-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignUpLoader = React.lazy(() => import('../../loaders/SignUpLoader'));
const Google = React.lazy(() => import('../../icons/google'));

export default function SignupForm() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [googleloading, setGoogleLoading] = useState<boolean>(false)
    const [pageloading, setPageLoading] = useState<boolean>(true)
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth) {
        throw new Error("Auth context is undefined");
    }

    const { register, currentUser, loginWithGoogle } = auth;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (currentUser) {
            return setError('A User Is Already Logged In')
        }
        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError('Passwords Do Not Match')
        }
        if (nameRef.current && emailRef.current && passwordRef.current) {
            try {
                setError('')
                setLoading(true)
                await register(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
                navigate('/')
            } catch (e) {
                let error = e as Error;
                console.error(error);
                if (error.message.includes('auth/email-already-in-use')) {
                    setError('User already registered');
                } else {
                    setError('Failed to register');
                }
            }


        }

        setLoading(false)
    }


    async function handleGoogleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (currentUser) {
            return setError('A User Is Already Logged In')
        }
        if (nameRef.current && emailRef.current && passwordRef.current) {
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
                    <h2 className='p-3'>Create an Account</h2>
                    <p className='p-3'>Enter Your Details Below</p>
                    {error && <Alert variant='danger' className='alert'>{error}</Alert>}
                    <Form onSubmit={handleSubmit} action="/submit_form" method="post">
                        <Form.Group controlId="formName" className='mb-3 p-3'>
                            <Form.Control ref={nameRef} className='form-input' type="text" placeholder="Full Name" required />
                        </Form.Group>

                        <Form.Group controlId="formEmailPhone" className='mb-3 p-3'>
                            <Form.Control ref={emailRef} className='form-input' type="email" placeholder="Email" required />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className='mb-3 p-3'>
                            <Form.Control ref={passwordRef} className='form-input' type="password" placeholder="Password" required />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword" className='mb-3 p-3'>
                            <Form.Control ref={passwordConfirmRef} className='form-input' type="password" placeholder="Confirm Password" required />
                        </Form.Group>

                        <Button disabled={loading} variant="danger" type="submit" className='form-btn mb-3 p-3'>
                            {loading ? (
                                <Bars width={"100%"} strokeWidth={"100%"} height={'100%'} stroke='none' />
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </Form>
                    <Button disabled={googleloading} variant="outline-secondary" className=' form-btn mb-3 p-3' onClick={handleGoogleSubmit}>
                        {!googleloading ? (
                            <Stack direction='horizontal' className="justify-content-center align-items-center">
                                <Google />
                                <h5 className='ml-3'>
                                    Go with Google
                                </h5>
                            </Stack>
                        ) : (
                            <Bars width={"100%"} strokeWidth={"100%"} height={'100%'} stroke='black' fill='black' />

                        )}

                    </Button>
                    <Row>
                        <Col lg={9} md={12} xs={12} className='form-text d-flex justify-content-center'>
                            <p className='login-btn'>Already have account? <Link to="/signin" className='login-btn2'>Log In</Link></p>
                        </Col>
                    </Row>
                </>
            ) : (
                <SignUpLoader />
            )}

        </Container>
    );
}
