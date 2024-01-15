import { Col, Container, Row } from "react-bootstrap";
import '../../css/SignUp.css';
import SignUpImage from "../SignupComponents/SignUpImage";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {
    return (
        <Container fluid className="p-5">
            <Row>
                <Col xs={12} md={12} lg={5} className="d-flex justify-content-center align-items-center mt-4 mb-4">
                    <SignUpImage />
                </Col>
                <Col xs={12} md={12} lg={5} className="ms-auto">
                    <ForgotPasswordForm />
                </Col>
            </Row>
        </Container>
    )
}
