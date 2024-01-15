import { Col, Container, Row } from "react-bootstrap";
import ContactForm from "../component/ContactComponents/Form";
import Info from "../component/ContactComponents/Info";
import '../css/Contact.css';

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
