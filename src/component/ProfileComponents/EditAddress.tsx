import { ChangeEvent, FormEvent, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Bars } from 'react-loading-icons';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/AddressContext';
import { useAuth } from '../../contexts/AuthContext';
import '../../css/SignUp.css';

export default function EditAddress() {
    const { data, setData, updateData } = useData();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const auth = useAuth()
    if (!auth) {
        throw new Error("Auth context is undefined");
    }

    const { currentUser } = auth;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (data.city && data.state && data.street) {
            try {
                setError('')
                setLoading(true)
                await updateData(data);
                navigate('/profile')
            } catch (e) {
                setError('Failed To Update Address')
            }
        }
    };

    return (
        <Container fluid>
            <h2 className='p-3'>Change Address</h2>
            <p className='p-3'>Enter Your New Address Below</p>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form action="/submit_form" method="post">
                <Form.Group controlId="formName" className='mb-3 p-3'>
                    <Form.Control type="text" className='form-input' name="name" disabled value={currentUser?.displayName || 'No User'} />
                </Form.Group>

                <Form.Group controlId="formStreet" className='mb-3 p-3'>
                    <Form.Control type="text" className='form-input' placeholder='Street' name="street" value={data.street} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formCity" className='mb-3 p-3'>
                    <Form.Control type="text" className='form-input' placeholder='City' name="city" value={data.city} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formState" className='mb-3 p-3'>
                    <Form.Control type="text" className='form-input' placeholder='State' name="state" value={data.state} onChange={handleChange} />
                </Form.Group>

                <Button disabled={loading} variant="danger" type="submit" className='form-btn mb-3 p-3' onClick={handleSubmit}>
                    {loading ? (
                        <Bars width={"100%"} strokeWidth={"100%"} height={'100%'} stroke='none' />
                    ) : (
                        "Update"
                    )}
                </Button>
            </Form>
        </Container>
    );
}
