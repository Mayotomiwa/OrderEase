import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import '../css/SignUp.css';

const SigninForm = React.lazy(() => import('../component/SigninComponents/SigninForm'));
const SignUpImage = React.lazy(() => import('../component/SignupComponents/SignUpImage'));


export default function SignIn() {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={12} lg={5} className="d-flex justify-content-center align-items-center mt-4 mb-4">
                    <SignUpImage />
                </Col>
                <Col xs={12} md={12} lg={5} className="ms-auto">
                    <SigninForm />
                </Col>
            </Row>
        </Container>
    )
}
