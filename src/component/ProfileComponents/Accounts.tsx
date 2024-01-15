import { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import ContactOptionsLoader from '../../loaders/ContactOptions';
import ProfileLoader from '../../loaders/ProfileLoader';
import AccountManagement from './AccountManagement';
import MyAccounts from './MyAccounts';
import Orders from './Orders';
import SignOut from './SignOut';



export default function Accounts() {
    const [selectedItem, setSelectedItem] = useState('My Account');
    const [loading, setLoading] = useState<boolean>(true)
    const auth = useAuth();

    if (!auth) {
        throw new Error("Auth is not available");
    }

    const { currentUser } = auth

    function handleItemClick(item: string) {
        setSelectedItem(item);
    }
    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
        }, 3000);
        return () => {
            clearTimeout(t);
        }
    }, []);

    return (
        <Container className='p-3 mt-4'>
            <Row>
                {!loading ? (
                    <Col md={4} lg={4} xs={4} className='side-bar me-auto'>
                        <ListGroup className=''>
                            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('My Account')}>My Account</ListGroup.Item>
                            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Orders')}>Orders</ListGroup.Item>
                            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Vouchers')}>Vouchers</ListGroup.Item>
                            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Saved Items')}>Saved Items</ListGroup.Item>
                            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Account Management')}>Account Management</ListGroup.Item>
                            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Address Book')}>Address Book</ListGroup.Item>
                            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Log Out')}>Log Out</ListGroup.Item>
                        </ListGroup>
                    </Col>
                ) : (
                    <Col md={4} lg={4} xs={4}>
                        <ContactOptionsLoader />
                    </Col>
                )}
                {!loading ? (
                    <Col md={7} className='main-bar'>

                        {selectedItem === 'My Account' ? (
                            <>
                                <h3>Account Overview</h3>
                                <MyAccounts name={currentUser?.displayName || 'Not Logged in'} email={currentUser?.email || ''} />
                            </>
                        ) : selectedItem === 'Orders' ? (
                            <>
                                <h3>Orders</h3>
                                <Orders />
                            </>
                        ) : selectedItem === 'Log Out' ? (
                            <SignOut name={currentUser?.displayName || 'Not Logged in'} email={currentUser?.email || ''} />
                        ) : selectedItem === 'Account Management' ? (
                            <AccountManagement />
                        ) : (
                            <div>Display content for other items here</div>
                        )}
                    </Col>

                ) : (
                    <Col md={7}>
                        <ProfileLoader />
                    </Col>
                )}
            </Row>
        </Container>
    );
};
