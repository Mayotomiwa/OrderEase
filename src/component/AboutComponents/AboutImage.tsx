import { useEffect, useState } from "react";
import ImageLoader from "../../loaders/ImageLoader";

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
                <img src='src/assets/About.png' className='img-fluid' alt='' /> : <ImageLoader />
            }
        </>
    )
}
