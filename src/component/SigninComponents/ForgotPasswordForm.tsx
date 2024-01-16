import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ResetLoader = React.lazy(() => import('../../loaders/ResetLoader'));

export default function ForgotPasswordForm() {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [pageloading, setPageLoading] = useState<boolean>(true)
    const auth = useAuth();
    const navigate = useNavigate()

    if (!auth) {
        throw new Error("Auth is required");
    }
    const { resetPassword } = auth;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (emailRef.current) {
            try {
                setError('')
                setLoading(true)
                await resetPassword(emailRef.current.value);
                setMessage('Check inbox for further information')
            } catch (e) {
                console.error(e);
                setError('Failed To Reset Password');
            }

        } else {
            setError('Email field is not available')
        }

        setLoading(false)
    }
    useEffect(() => {
        const t = setTimeout(() => {
            setPageLoading(false)
        }, 9000);
        return () => {
            clearTimeout(t);
        }
    }, []);

    return (
        <Container>
            {!pageloading ? (
                <>
                    <h2 className='p-3 mt-4'>Reset Password</h2>
                    <p className='p-4'>Enter Your Email Below</p>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form action="/submit_form" method="post">
                        <Form.Group controlId="formEmailPhone" className='mb-3 p-3'>
                            <Form.Control ref={emailRef} className='form-input' type="text" placeholder="Email" />
                        </Form.Group>

                        <Row style={{ paddingLeft: '2%', paddingRight: '5%' }}>
                            <Col lg={6} md={5} xs={5}>
                                <Button variant="danger" type="submit" className=' form-btn mb-3' onClick={handleSubmit}>
                                    Reset Password
                                </Button>
                            </Col>
                            <Col lg={6} md={7} xs={7}>
                                <Button variant="text" disabled={loading} type="submit" className='form-text-btn mb-3' onClick={() => navigate("/signin")}>
                                    Log In
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </>
            ) : (
                <ResetLoader />
            )}

        </Container>

    )
}
