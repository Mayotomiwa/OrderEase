import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWish } from '../../contexts/WishContext';
import { fetchAllProducts } from '../../data/APIs';
import { Product } from '../../types/Products';

const Wish = React.lazy(() => import('../../icons/wishlist'));
const WishFill = React.lazy(() => import('../../icons/wishlistfill'));
const ProductLoader2 = React.lazy(() => import('../../loaders/AllProductsLoader'));
const TextLoader = React.lazy(() => import('../../loaders/TextLoader'));


type ProductsComponentProps = {
    onButtonClick: () => void;
}

export default function ProductsComponent({ onButtonClick }: ProductsComponentProps) {
    const [wishStates, setWishStates] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState<boolean>(true)
    const [allproducts, setAllproducts] = useState<Product[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { getItemQuantity, incItemQuantity, decItemQuantity } = useCart();
    const { addToWishList, isInWishList, removeFromWishList } = useWish();
    const navigate = useNavigate()


    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current && scrollContainerRef.current.firstChild) {
            const firstChild = scrollContainerRef.current.firstChild as HTMLElement;
            const itemWidth = firstChild.getBoundingClientRect().width;

            if (direction === 'right') {
                scrollContainerRef.current.scrollLeft += itemWidth;
            } else {
                scrollContainerRef.current.scrollLeft -= itemWidth;
            }
        }
    };
    useEffect(() => {
        const getAllProducts = async () => {
            const data = await fetchAllProducts();
            setAllproducts(data);
            const initialWishStates: Record<number, boolean> = {};
            data.forEach((product: Product) => {
                initialWishStates[product.id] = isInWishList(Number(product.id));
            });
            setWishStates(initialWishStates);
            setLoading(false)
        };

        getAllProducts();
    }, []);

    return (
        <Container fluid className='allProducts px-lg-5 mb-5 mt-5'>
            {!loading ? (
                <>
                    <Stack direction="horizontal" gap={5} style={{ marginBottom: 50 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                            <rect width="20" height="40" rx="4" fill="#DB4444" />
                        </svg>
                        <h3 style={{ color: '#db4444' }}>Our Products</h3>
                    </Stack>
                    <Stack direction='horizontal'>
                        <h3 className='sales me-auto'>Explore Our Products</h3>
                        <div className='scroll-buttons'>
                            <Button variant='danger' onClick={() => scroll('left')} className='scroll'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 5L4 12L11 19M4 12H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                            <Button variant='danger' onClick={() => scroll('right')} className='scroll'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M3.5 12H20M20 12L13 5M20 12L13 19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                        </div>
                    </Stack>
                </>
            ) : (
                <TextLoader />
            )}


            {!loading ? (
                <>
                    <div ref={scrollContainerRef} className="all-container" style={{ marginBottom: 50, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', overflowX: 'scroll', gridGap: '40px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {allproducts.slice(0, 20).map((item, index) => {
                            const quantity = getItemQuantity(item.id)
                            const isWish = wishStates[item.id];

                            function handleWish() {
                                if (isWish) {
                                    removeFromWishList(item.id);
                                } else {
                                    addToWishList(item.id);
                                }
                                setWishStates({
                                    ...wishStates,
                                    [item.id]: !isWish
                                });
                            }
                            return (
                                <div key={index} className="item-container">
                                    <div className="scroll-item" onClick={() => navigate(`/products/${item.id}`)}>
                                        <img src={item.image} alt={item.title} className="Api-image" />
                                        <div className="hover-buttons">
                                            <Button variant='text' className='wishlist-button' onClick={(e) => { e.stopPropagation(); handleWish(); }}>
                                                {isWish ? <WishFill /> : <Wish />}
                                            </Button>
                                            {quantity === 0 ?
                                                <Button variant='secondary' className='cart-button addCart' onClick={(e) => { e.stopPropagation(); incItemQuantity(item.id) }}>Add to Cart</Button>
                                                : (
                                                    <Stack direction='horizontal' gap={5} className='cart-button' style={{ gap: '1rem' }}>
                                                        <Button variant='secondary' className='cart-buttons' onClick={(e) => { e.stopPropagation(); decItemQuantity(item.id) }}>-</Button>
                                                        <span>{quantity}</span>
                                                        <Button variant='secondary' className='cart-buttons' onClick={(e) => { e.stopPropagation(); incItemQuantity(item.id) }}>+</Button>
                                                    </Stack>
                                                )}
                                        </div>
                                    </div>
                                    <h4 className="Api-title">{item.title}</h4>
                                    <h4 className="Api-price">{item.price}</h4>
                                </div>
                            )
                        })}
                    </div>
                    <div className="button-container">
                        <Button variant='danger' className='flash-btn' onClick={() => { onButtonClick() }}>View All Products</Button>
                    </div>
                </>
            ) : (
                <ProductLoader2 />
            )
            }

        </Container>
    )
}
