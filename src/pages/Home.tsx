import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../css/Home.css';

const Separator = React.lazy(() => import('../component/GeneralComponents/seperator'));
const Ad = React.lazy(() => import('../component/HomeComponents/Ad'));
const Featured = React.lazy(() => import('../component/HomeComponents/Featured'));
const FlashSales = React.lazy(() => import('../component/HomeComponents/FlashSales'));
const ProductCategories = React.lazy(() => import('../component/HomeComponents/ProductCategories'));
const ProductsComponent = React.lazy(() => import('../component/HomeComponents/ProductsComponent'));
const Services = React.lazy(() => import('../component/HomeComponents/Services'));
const SwiperFile = React.lazy(() => import('../component/HomeComponents/Swiper'));
const ViewFlash = React.lazy(() => import('../component/HomeComponents/ViewFlash'));
const ViewProducts = React.lazy(() => import('../component/HomeComponents/ViewProducts'));

export default function Home() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showFlashModal, setShowFlashModal] = useState<boolean>(false);

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center">
                <Col xs={12} md={12} lg={8}>
                    <SwiperFile />
                </Col>
            </Row>
            <Row>
                <FlashSales onButtonClick={() => setShowFlashModal(true)} />
                <ViewFlash showModal={showFlashModal} onClose={() => setShowFlashModal(false)} />
            </Row>
            <Container fluid style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                <Separator />
            </Container>
            <ProductCategories />
            <Ad />
            <ProductsComponent onButtonClick={() => setShowModal(true)} />
            <ViewProducts showModal={showModal} onClose={() => setShowModal(false)} />
            <Featured />
            <Services />
        </Container>
    )
}
