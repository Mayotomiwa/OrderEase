import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperLoader from '../../loaders/Adloader';

export default function SwiperFile() {
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
        <Container>
            {!loading ? (
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={12}>
                        <Swiper
                            modules={[Pagination, Autoplay, EffectFade]}
                            pagination={{ clickable: true }}
                            autoplay={true}
                            loop={true}
                            speed={2000}
                            spaceBetween={50}
                            slidesPerView={1}
                            style={{ width: '100%', marginTop: '2%', backgroundColor: 'black' }}
                        >
                            <SwiperSlide>
                                <img src='src/assets/Slide1.png' className='img-fluid' alt='' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src='src/assets/Slide2.png' className='img-fluid' alt='' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src='src/assets/Slide3.png' className='img-fluid' alt='' />
                            </SwiperSlide>
                        </Swiper>
                    </Col>
                </Row>

            ) : (
                <SwiperLoader />
            )}
        </Container>
    )
}
