import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const TextContentLoader = React.lazy(() => import('../../loaders/AboutLoader'));


export default function Story() {
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
        <Container fluid className='story-container mt-4'>
            {!loading ? (
                <Row>
                    <Col xs={12} md={12}>
                        <h3 className='story mb-4 mt-4'>Our Story</h3>
                        <div className='storyline'>
                            <p className='line1'>
                                Launched in 2023, OrderEase is one of West Africa's premier online shopping marketplace with an active presence in Nigeria. Supported by wide range of tailored marketing, data and service solutions, OrderEase has seller, brands and serves its customers across the region.
                            </p>
                            <p className='line2'>
                                OrderEase has a lot of products to offer, growing at a very fast pace. OrderEase offers a diverse assortment in categories ranging  from consumer to consumer.
                            </p>
                        </div>
                    </Col>
                </Row>

            ) : (
                <TextContentLoader />
            )}
        </Container>
    )
}
