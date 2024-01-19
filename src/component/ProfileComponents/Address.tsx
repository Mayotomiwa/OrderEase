import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import '../../css/SignUp.css';

const AddressForm = React.lazy(() => import('./AddressBook'));
const SignUpImage = React.lazy(() => import('../SignupComponents/SignUpImage'));


export default function Address() {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={12} lg={5} className="d-flex justify-content-center align-items-center mt-4 mb-4">
                    <SignUpImage />
                </Col>
                <Col xs={12} md={12} lg={5} className="ms-auto">
                    <AddressForm />
                </Col>
            </Row>
        </Container>
    )
}
