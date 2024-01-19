import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Slide2 from '../../assets/Slide2.png';
import '../../css/Home.css';

const SwiperLoader = React.lazy(() => import('../../loaders/Adloader'));

export default function Ad() {
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
        <Container className="d-flex justify-content-center align-items-center Ad" style={{ marginTop: 100, marginBottom: 100}}>
            {!loading ?
                <LazyLoadImage src={Slide2} className='img-fluid' alt='' effect="blur" /> : <SwiperLoader />
            }
        </Container>
    )
}
