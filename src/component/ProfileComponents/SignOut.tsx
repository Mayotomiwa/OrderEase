import { useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AccountProps } from '../../types/AccountProps';

export default function SignOut({ name, email, }: AccountProps) {
    const [error, setError] = useState<string>('')
    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth) {
        throw new Error("Auth is not available");
    }

    const { logOut, currentUser } = auth
    async function handleLogOut() {
        setError('')
        try {
            await logOut();
            navigate('/signin');
        } catch (error) {
            setError('Failed to log out');
        }
    }
    return (
        <>
            <div className='w-100 form-text d-flex justify-content-center'>
                {error && <Alert variant='danger' className='alert'>{error}</Alert>}
                <Card className='mb-4 p-3 w-100'>
                    <Card.Header style={{ backgroundColor: '#fff' }}>Log Out</Card.Header>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{email}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <Button variant='danger' onClick={handleLogOut} disabled={!currentUser}>
                Log Out
            </Button>

        </>)
}
