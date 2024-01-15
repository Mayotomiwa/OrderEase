import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ContactFormLoader from '../../loaders/ContactFormLoader';

export default function ContactForm() {
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
        <Container className='form' style={{ marginTop: '17%' }}>
            {!loading ? (
                <Form>
                    <Row className='mb-4 p-3'>
                        <Col xs={12} sm={12} md={6} lg={4}>
                            <Form.Group controlId="formName" className='mb-3'>
                                <Form.Control type="text" placeholder="Your name" required className='form-inputs p-3' />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4}>
                            <Form.Group controlId="formEmail" className='mb-3'>
                                <Form.Control type="email" placeholder="Your email" required className='form-inputs p-3' />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4}>
                            <Form.Group controlId="formPhone" className='mb-3'>
                                <Form.Control type="tel" placeholder="Your phone number" required className='form-inputs p-3' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formMessage" className='p-3'>
                        <Form.Control as="textarea" placeholder='Your Message' rows={8} className='form-inputs' />
                    </Form.Group>

                    <Container fluid style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="danger" type="submit" className='mt-4 p-3'>
                            Send Message
                        </Button>
                    </Container>

                </Form>

            ) : (
                <ContactFormLoader />
            )}

        </Container>
    )
}