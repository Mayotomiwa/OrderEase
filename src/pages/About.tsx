import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../css/About.css';

const Services = React.lazy(() => import('../component/HomeComponents/Services'));
const Team = React.lazy(() => import('../component/AboutComponents/Team'));
const Story = React.lazy(() => import('../component/AboutComponents/Story'));
const Stats = React.lazy(() => import('../component/AboutComponents/Stats'));
const AboutImage = React.lazy(() => import('../component/AboutComponents/AboutImage'));

export default function About() {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={12} lg={5}>
                    <Story />
                </Col>
                <Col xs={12} md={12} lg={7} className="d-flex justify-content-center align-items-center mt-4 mb-4">
                    <AboutImage />
                </Col>
            </Row>
            <Stats />
            <Team />
            <Services />
        </Container>
    )
}
