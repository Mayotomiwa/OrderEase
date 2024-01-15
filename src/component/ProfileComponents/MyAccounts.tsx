import { Card } from 'react-bootstrap';
import { AccountProps } from '../../types/AccountProps';

export default function MyAccounts({ name, email, }: AccountProps) {
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
                <Card.Header style={{ backgroundColor: '#fff' }}>ADDRESS BOOK</Card.Header>
                <Card.Body>
                    <Card.Title>Your Default Shipping Address</Card.Title>
                    <Card.Text>No Default Shipping Address Available</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

