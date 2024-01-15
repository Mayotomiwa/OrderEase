import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

interface User {
    name: string;
    email: string;
}

interface AddressBookProps {
    user: User;
}

export default function AddressBook({ user }: AddressBookProps)  {
    const [address, setAddress] = useState<string | null>(null);

    return (
        <Container className="account-overview">
            <Row className="account-details">
                <Col><p>{user.name}</p></Col>
                <Col><p>{user.email}</p></Col>
            </Row>

            <Row className="address-book">
                <Col>
                    <h3>ADDRESS BOOK</h3>
                    {address ? (
                        <p>Your default shipping address: {address}</p>
                    ) : (
                        <>
                            <p>No default shipping address available.</p>
                            <Button onClick={() => setAddress('123 Main St, Cityville')}>Add Default Address</Button>
                        </>
                    )}
                </Col>

                {/* ... other sections like Jumia Store Credit and Newsletter Preferences */}
            </Row>
        </Container>
    );
};