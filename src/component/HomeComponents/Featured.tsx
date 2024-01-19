import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Featured1 from '../../assets/Featured1.png';
import Featured2 from '../../assets/Featured2.png';
import Featured3 from '../../assets/Featured3.png';
import Featured4 from '../../assets/Featured4.png';

const ProductAdLoader = React.lazy(() => import('../../loaders/FeaturedLoader'));
const TextLoader = React.lazy(() => import('../../loaders/TextLoader'));

export default function Featured() {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
        }, 3000);
        return () => {
            clearTimeout(t);
        }
    }, []);

    return (
        <>
            {!loading ? (
                <Container fluid className="px-lg-5 mb-5 mt-5">
                    <Row className="mb-5 align-items-center">
                        <Col xs="auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                                <rect width="20" height="40" rx="4" fill="#DB4444" />
                            </svg>
                        </Col>
                        <Col xs="auto">
                            <h5 style={{ color: '#db4444' }}>Featured</h5>
                        </Col>
                    </Row>
                    <Stack direction='horizontal'>
                        <h5 className='sales'>Products Coming Soon</h5>
                    </Stack>
                </Container>
            ) : (
                <TextLoader />
            )}

            {!loading ? (
                <Container>
                    <Row className="featured">
                        <Container fluid className="d-flex justify-content-center align-items-center my-5">
                            <Row className='justify-content-center'>
                                <Col lg={5} md={12} className='mb-4'>
                                    <LazyLoadImage src={Featured1} className='img-fluid' alt='' effect="blur" />
                                </Col>
                                <Col lg={6} md={12}>
                                    <Row>
                                        <Col xs={12} lg={10} className='mb-4'>
                                            <LazyLoadImage src={Featured2} className='img-fluid w-70' alt='' effect="blur" />
                                        </Col>
                                        <Col xs={6} lg={5} className='mb-4'>
                                            <LazyLoadImage src={Featured3} className='img-fluid w-70' alt='' effect="blur" />
                                        </Col>
                                        <Col xs={6} lg={5} className='mb-4'>
                                            <LazyLoadImage src={Featured4} className='img-fluid w-70' alt='' effect="blur" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Container className="button-container">
                        <Button variant='danger' className='flash-btn' onClick={() => { }}>Pre Order Now</Button>
                    </Container>
                </Container>

            ) : (
                <ProductAdLoader />
            )}
        </>
    )
}
