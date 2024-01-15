import { useEffect, useState } from "react";
import ImageLoader from "../../loaders/ImageLoader";

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
                <img src='src/assets/signin.png' className='img-fluid' alt='' /> : <ImageLoader />
            }
        </>
    )
}
