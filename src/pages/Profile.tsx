import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Accounts.css';

const Accounts = React.lazy(() => import('../component/ProfileComponents/Accounts'));


export default function Profile() {
    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth) {
        throw new Error("Auth is required");
    }
    const { currentUser } = auth;

    function handleChange() {
        navigate("/signin")
    }
    return (
        <Container className='w-100'>
            {currentUser ?
                <Accounts /> :
                <Container className='p-5'>
                    <div className='w-70 form-text d-flex justify-content-center'>
                        <Card className='mb-4 p-5 w-100'>
                            <Card.Header style={{ backgroundColor: '#fff' }}>Not Yet Logged In</Card.Header>
                            <Card.Body>
                                <Card.Title>Click the button below to log in</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <Button variant='danger' className='p-3' onClick={handleChange}>
                        Log In
                    </Button>
                </Container>
            }

        </Container >
    )
}