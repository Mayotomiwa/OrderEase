import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Mail from "../../icons/mail";
import Phone from "../../icons/phone";
import ContactOptionsLoader from "../../loaders/ContactOptions";

export default function Info() {
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
        }, 9000);
        return () => {
            clearTimeout(t);
        }
    }, []);
    return (
        <Container className="info" style={{ marginTop: '25%' }}>
            {!loading ? (
                <Card style={{ border: 'none', height: '100%' }}>
                    <Card.Body className="p-4">
                        <Row className="d-flex align-items-center align-content-center mb-4 mt-4">
                            <Col xs={2} md={2} lg={2} className="me-3">
                                <Phone />
                            </Col>
                            <Col>
                                <Card.Title>Call To Us</Card.Title>
                            </Col>
                        </Row>
                        <Card.Text >
                            We are available 24/7, 7 days a week.
                        </Card.Text>
                        <Card.Text>
                            Phone: +2349088222519
                        </Card.Text>
                        <div style={{ padding: 30 }}>
                            <hr />
                        </div>
                        <Row className="d-flex align-items-center align-content-center mb-4 mt-4">
                            <Col xs={2} md={2} lg={2} className="me-3">
                                <Mail />
                            </Col>
                            <Col>
                                <Card.Title>Write To Us</Card.Title>
                            </Col>
                        </Row>
                        <Card.Text>
                            Fill out our form and we will contact you within 24 hours.
                        </Card.Text>
                        <Card.Text>
                            Emails: customer@orderease.com
                        </Card.Text>
                        <Card.Text>
                            Emails: support@orderease.com
                        </Card.Text>
                    </Card.Body>
                </Card>

            ) : (
                <ContactOptionsLoader />
            )}
        </Container>
    )
}
