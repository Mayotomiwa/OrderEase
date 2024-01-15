import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import TeamLoader from '../../loaders/TeamLoader';

export default function Team() {
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
        <Container className="swiper" style={{ justifyContent: 'center', }}>
            {!loading ? (
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    pagination={{ clickable: true }}
                    autoplay={true}
                    loop={true}
                    speed={2000}
                    spaceBetween={50}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                    }}
                    style={{ width: '100%', marginTop: '2%', backgroundColor: '#f5f5f5' }}
                >
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/Founder.png' className='img-fluid team-img' alt='' />
                                    <h3>Oluwamayotomiwa Ololade</h3>
                                    <p>Founder & Chairman</p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/COO.png' className='img-fluid team-img' alt='' />
                                    <h3>Fagbola Gift</h3>
                                    <p>Chief Operations Officer  </p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/ProductDesigner.png' className='img-fluid team-img' alt='' />
                                    <h3>Femi Bashiru</h3>
                                    <p>Product Designer</p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/UIDesigner1.png' className='img-fluid team-img' alt='' />
                                    <h3>Jeremy Cutter</h3>
                                    <p>UI Desginer 1</p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/UIDesigner2.png' className='img-fluid team-img' alt='' />
                                    <h3>Babatunde Adams</h3>
                                    <p>UI Designer 2</p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/Frontend1.png' className='img-fluid team-img' alt='' />
                                    <h3>Advik Aditi</h3>
                                    <p>Frontend Engineer 1</p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/Frontend2.png' className='img-fluid team-img' alt='' />
                                    <h3>Chibukwe John</h3>
                                    <p>Frontend Engineer 2</p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/Backend1.png' className='img-fluid team-img' alt='' />
                                    <h3>Benjamin Ifeoluwa</h3>
                                    <p>Backend Engineer 1</p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='team'>
                                    <img src='src/assets/Backend2.png' className='img-fluid team-img' alt='' />
                                    <h3>Jonas Karim</h3>
                                    <p>Backend Engineer 2</p>
                                    <div style={{ display: 'flex', marginLeft: 5, justifyContent: 'space-between', width: '120px' }}>
                                        <FaTwitter size={20} />
                                        <FaInstagram size={20} />
                                        <FaLinkedin size={20} />
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Col>
                    </Row>
                </Swiper>

            ) : (
                <TeamLoader />
            )}
        </Container>
    )
}

