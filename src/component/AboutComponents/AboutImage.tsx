import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AboutImg from '../../assets/About.png';

const ImageLoader = React.lazy(() => import('../../loaders/ImageLoader'));

export default function AboutImage() {
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
        <>
            {!loading ?
                <LazyLoadImage src={AboutImg} className='img-fluid' alt='' effect="blur" /> : <ImageLoader />
            }
        </>
    )
}
