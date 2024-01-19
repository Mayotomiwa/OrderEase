import { Button, Card, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/AddressContext';
import { AccountProps } from '../../types/AccountProps';


export default function MyAccounts({ name, email }: AccountProps) {
    const { data } = useData();
    const navigate = useNavigate();

    return (
        <>
            <Card className='mb-4 p-3 w-100'>
                <Card.Header style={{ backgroundColor: '#fff' }}>ACCOUNT DETAILS</Card.Header>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{email}</Card.Text>
                </Card.Body>
            </Card>
            <Card className='mt-4 p-3 w-100'>
                <Card.Header style={{ backgroundColor: '#fff' }}>
                    <Stack direction='horizontal' gap={5}>
                        <h5 className='mr-auto'>ADDRESS BOOK</h5>
                        {(data.street === '' && data.city === '' && data.state === '') ? (
                            <Button variant='text' className='ml-auto' style={{ color: '#db4444', marginLeft: 'auto' }} onClick={() => navigate('/address')} >Add</Button>
                        ) : (
                            <Button variant='text' className='ml-auto' style={{ color: '#db4444', marginLeft: 'auto' }} onClick={() => navigate('/edit')} >Edit</Button>
                        )}
                    </Stack>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Your Default Shipping Address</Card.Title>
                    <Card.Text>
                        {data?.street || 'No Available Address'}<br />
                        {data?.city || ''}<br />
                        {data?.state || ''}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
