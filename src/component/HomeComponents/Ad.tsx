import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SwiperLoader from '../../loaders/Adloader';
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
        <Container className="d-flex justify-content-center align-items-center" style={{ marginTop: 100, marginBottom: 100 }}>
            {!loading ?
                <img src='src/assets/Slide2.png' className='img-fluid' alt='' /> : <SwiperLoader />
            }
        </Container>
    )
}
