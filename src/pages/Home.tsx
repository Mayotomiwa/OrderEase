import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Separator from '../component/GeneralComponents/seperator';
import Ad from '../component/HomeComponents/Ad';
import Categories from '../component/HomeComponents/Categories';
import Featured from '../component/HomeComponents/Featured';
import FlashSales from '../component/HomeComponents/FlashSales';
import ProductCategories from '../component/HomeComponents/ProductCategories';
import ProductsComponent from '../component/HomeComponents/ProductsComponent';
import Services from '../component/HomeComponents/Services';
import SwiperFile from '../component/HomeComponents/Swiper';
import ViewFlash from '../component/HomeComponents/ViewFlash';
import ViewProducts from '../component/HomeComponents/ViewProducts';
import VerticalSeparator from '../component/HomeComponents/verticalSeparator';
import '../css/Home.css';

export default function Home() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showFlashModal, setShowFlashModal] = useState<boolean>(false);


    return (
        <Container fluid>
            <Row className="g-0">
                <Col className="d-none d-lg-block" lg={2}>
                    <Categories />
                </Col>
                <Col xs={0} md={0} lg={2} className='d-none d-lg-block'>
                    <VerticalSeparator />
                </Col>
                <Col xs={12} md={12} lg={8}>
                    <SwiperFile />
                </Col>
            </Row>
            <Row>
                <FlashSales onButtonClick={() => setShowFlashModal(true)}/>
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
