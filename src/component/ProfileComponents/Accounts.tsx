import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ListGroup, Offcanvas, Row } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import SavedItems from './SavedItems';

const ContactOptionsLoader = React.lazy(() => import('../../loaders/ContactOptions'));
const ProfileLoader = React.lazy(() => import('../../loaders/ProfileLoader'));
const Hamburger = React.lazy(() => import('../../icons/ProfileMenu'));
const AccountManagement = React.lazy(() => import('./AccountManagement'));
const MyAccounts = React.lazy(() => import('./MyAccounts'));
const Orders = React.lazy(() => import('./Orders'));
const SignOut = React.lazy(() => import('./SignOut'));

export default function Accounts() {
    const [selectedItem, setSelectedItem] = useState('My Account');
    const [loading, setLoading] = useState<boolean>(true)
    const [show, setShow] = useState(false);
    const auth = useAuth();

    if (!auth) {
        throw new Error("Auth is not available");
    }

    const { currentUser } = auth

    function handleItemClick(item: string) {
        setSelectedItem(item);
        setShow(false);
    }
    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
        }, 3000);
        return () => {
            clearTimeout(t);
        }
    }, []);

    const listGroup = (
        <ListGroup className=''>
            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('My Account')}>My Account</ListGroup.Item>
            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Orders')}>Orders</ListGroup.Item>
            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Vouchers')}>Vouchers</ListGroup.Item>
            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Saved Items')}>Saved Items</ListGroup.Item>
            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Account Management')}>Account Management</ListGroup.Item>
            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Address Book')}>Address Book</ListGroup.Item>
            <ListGroup.Item style={{ border: 'none' }} onClick={() => handleItemClick('Log Out')}>Log Out</ListGroup.Item>
        </ListGroup>
    );

    return (
        <Container className='p-3 mt-4'>
            <Row>
                {!loading ? (
                    <>
                        <Col md={4} lg={4} className='d-none d-md-block side-bar me-auto'>
                            {listGroup}
                        </Col>
                        <Col md={4} lg={4} xs={4} className='d-md-none'>
                            <Button variant="text" onClick={() => setShow(true)}>
                                <Hamburger />
                            </Button>
                            <Offcanvas show={show} onHide={() => setShow(false)}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Menu</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    {listGroup}
                                </Offcanvas.Body>
                            </Offcanvas>
                        </Col>
                    </>
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
                        ) :
                            selectedItem === 'Saved Items' ? (
                                <>
                                <h3>Saved Items</h3>
                                <SavedItems />
                                </>
                            ) : (
                                <div>Coming Soon</div>
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
