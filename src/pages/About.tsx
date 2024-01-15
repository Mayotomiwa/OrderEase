import { Col, Container, Row } from 'react-bootstrap'
import AboutImage from '../component/AboutComponents/AboutImage'
import Stats from '../component/AboutComponents/Stats'
import Story from '../component/AboutComponents/Story'
import Team from '../component/AboutComponents/Team'
import Services from '../component/HomeComponents/Services'
import '../css/About.css'

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
