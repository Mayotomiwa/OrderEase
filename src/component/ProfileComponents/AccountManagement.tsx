import { updateProfile } from 'firebase/auth';
import { useRef, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


export default function AccountManagement() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const auth = useAuth();

    if (!auth) {
        throw new Error("Auth is not available");
    }

    const { currentUser, updatepassword, updateMail } = auth

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const promises = [];
        setLoading(true);
        if (nameRef.current?.value !== currentUser?.displayName) {
            if (nameRef.current && currentUser) {
                promises.push(updateProfile(
                    currentUser, {
                    displayName: nameRef.current.value,
                }
                ))
            }
        }
        if (emailRef.current?.value !== currentUser?.email) {
            if (emailRef.current) {
                promises.push(updateMail(emailRef.current.value))
            }
        }
        if (passwordRef.current?.value) {
            if (passwordRef.current) {
                promises.push(updatepassword(passwordRef.current.value))
            }
        }

        Promise.all(promises).then(() => {
            navigate('/profile')
        }).catch(() => {
            setError('Failed to Update Account Information')
        }).finally(() => {
            setLoading(false)
        });

    }
    return (
        <>
            <div className='w-100 form-text d-flex justify-content-center'>
                <Card className='mb-4 p-3 w-100'>
                    <Card.Header style={{ backgroundColor: '#fff' }}>Profile Details</Card.Header>
                    <Card.Body>
                        <Form action="/submit_form" onSubmit={handleSubmit} method="post">
                            <Form.Group controlId="formName" className='mb-3 p-3'>
                                <Form.Control ref={nameRef} className='form-input' type="text" placeholder="Full Name" defaultValue={currentUser?.displayName || 'Not logged In'} />
                            </Form.Group>

                            <Form.Group controlId="formEmailPhone" className='mb-3 p-3'>
                                <Form.Control ref={emailRef} className='form-input' type="email" placeholder="Email" defaultValue={currentUser?.email || 'Not logged In'} />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className='mb-3 p-3'>
                                <Form.Control ref={passwordRef} className='form-input' type="password" placeholder="fill this field to update password" />
                            </Form.Group>
                            <Form.Group className='mb-3 p-3'>
                                <Button variant='danger' type="submit">
                                    Update Profile
                                </Button>
                            </Form.Group>

                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
