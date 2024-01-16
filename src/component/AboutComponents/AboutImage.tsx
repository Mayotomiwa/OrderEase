import React, { useEffect, useState } from "react";
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
                <img src= {AboutImg} className='img-fluid' alt='' /> : <ImageLoader />
            }
        </>
    )
}
