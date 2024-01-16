import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import '../css/Contact.css';

const ContactForm = React.lazy(() => import('../component/ContactComponents/Form'));
const Info = React.lazy(() => import('../component/ContactComponents/Info'));


export default function Contact() {
    return (
        <Container className="mb-4">
            <Row>
                <Col xs={12} md={12} lg={4}>
                    <Info />
                </Col>
                <Col xs={12} md={12} lg={8}>
                    <ContactForm />
                </Col>
            </Row>
        </Container>
    )
}
