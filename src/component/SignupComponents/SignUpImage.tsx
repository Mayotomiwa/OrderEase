import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SignupImg from '../../assets/signin.png';

const ImageLoader = React.lazy(() => import('../../loaders/ImageLoader'));

export default function SignUpImage() {
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
            {!loading ?
                <LazyLoadImage src={SignupImg} className='img-fluid' alt='' effect="blur" /> : <ImageLoader />
            }
        </>
    )
}
