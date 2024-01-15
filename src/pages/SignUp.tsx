import { Col, Container, Row } from "react-bootstrap";
import SignUpImage from "../component/SignupComponents/SignUpImage";
import SignupForm from "../component/SignupComponents/SignupForm";
import '../css/SignUp.css';

export default function SignUp() {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={12} lg={5} className="d-flex justify-content-center align-items-center mt-4 mb-4">
                    <SignUpImage />
                </Col>
                <Col xs={12} md={12} lg={5} className="ms-auto">
                    <SignupForm />
                </Col>
            </Row>
        </Container>
    )
}
