import React, { useEffect, useState } from "react";
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
                <img src= {SignupImg} className='img-fluid' alt='' /> : <ImageLoader />
            }
        </>
    )
}
