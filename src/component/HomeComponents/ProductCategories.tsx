import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWish } from '../../contexts/WishContext';
import { fetchCategories, fetchProducts } from '../../data/APIs';
import Icon1 from '../../icons/icon1';
import Icon2 from '../../icons/icon2';
import Icon3 from '../../icons/icon3';
import Icon4 from '../../icons/icon4';
import Wish from '../../icons/wishlist';
import WishFill from '../../icons/wishlistfill';
import ProductLoader1 from '../../loaders/FlashSalesLoader';
import TextLoader from '../../loaders/TextLoader';
import { Product } from '../../types/Products';
import Separator from '../GeneralComponents/seperator';

export default function ProductCategories() {
    const [wishListState, setWishListState] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>('electronics');
    const { getItemQuantity, incItemQuantity, decItemQuantity } = useCart()
    const { addToWishList, removeFromWishList, isInWishList } = useWish();
    const navigate = useNavigate();

    function handleClick(category: string) {
        return async (e: React.MouseEvent<HTMLDivElement>) => {
            const currentActive = document.querySelector('.category-item.active');

            if (currentActive) {
                currentActive.classList.remove('active');
            }

            e.currentTarget.classList.add('active');

            setSelectedCategory(category);

            const data = await fetchProducts(category);
            setProducts(data);
        };
    }
    const categoryIcons: { [key: string]: JSX.Element } = {
        "electronics": <Icon1 />,
        "jewelery": <Icon2 />,
        "men's clothing": <Icon3 />,
        "women's clothing": <Icon4 />,
    };
    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };

        getCategories();
    }, []);

    useEffect(() => {
        const fetchInitialProducts = async () => {
            if (selectedCategory) {
                const data = await fetchProducts(selectedCategory);
                setProducts(data);
                setLoading(false);
            }
        };

        fetchInitialProducts();
    }, [selectedCategory]);


    useEffect(() => {
        const newWishListState: Record<number, boolean> = {};
        products.forEach(product => {
            newWishListState[product.id] = isInWishList(product.id);
        });
        setWishListState(newWishListState);
    }, [products, isInWishList]);

    function handleWish(productId: number) {
        setWishListState(prevState => {
            const isWish = !prevState[productId];
            if (isWish) {
                addToWishList(productId);
            } else {
                removeFromWishList(productId);
            }
            return {
                ...prevState,
                [productId]: isWish,
            };
        });
    }

    return (
        <>
            <Container fluid className='px-lg-5 mb-5 mt-5'>
                {!loading ? (
                    <>
                        <Stack direction="horizontal" gap={5} style={{ marginBottom: 30 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                                <rect width="20" height="40" rx="4" fill="#DB4444" />
                            </svg>
                            <h3 style={{ color: '#db4444' }}>Categories</h3>
                        </Stack>
                        <Stack direction='horizontal'>
                            <h3 className='sales mb-4 me-auto'>Browse By Category</h3>
                        </Stack>
                    </>
                ) : (
                    <TextLoader />
                )}


                {!loading ? (
                    <div className='category-container'>
                        {categories.map((category: string, index: number) => {
                            const Icon = categoryIcons[category];
                            const isActive = selectedCategory === category ? 'active' : '';
                            return (
                                <div key={index} className={`item-container ${isActive}`}>
                                    <div className='category-item' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        onClick={handleClick(category)}>
                                        <div className="icons" style={{ marginBottom: 20 }}>
                                            {Icon ? Icon : `No icon for ${category}`}
                                        </div>
                                        {category}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                ) : (
                    <ProductLoader1 />
                )

                }
            </Container>
            <Container fluid className='mb-5' style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                <Separator />
            </Container>
            <Container fluid className='px-lg-5 mb-5'>
                {!loading ? (
                    <>
                        <Stack direction="horizontal" gap={5} style={{ marginBottom: 50 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                                <rect width="20" height="40" rx="4" fill="#DB4444" />
                            </svg>
                            <h3 style={{ color: '#db4444' }}>Selected Category</h3>

                        </Stack>
                        <Stack direction='horizontal'>
                            <h3 className='sales me-auto'>Items From {selectedCategory}</h3>
                        </Stack>
                    </>
                ) : (
                    <TextLoader />
                )}


                {!loading ? (
                    <div className="scroll-container mt-3">
                        {products.map((item, index) => {
                            const quantity = getItemQuantity(item.id)
                            const isWish = isInWishList(item.id);

                            return (

                                <div key={index} className="item-container">
                                    <div className="scroll-item" onClick={() => navigate(`/products/${item.id}`)}>
                                        <img src={item.image} alt={item.title} className="Api-image" />
                                        <div className="hover-buttons">
                                            <Button variant='text' className='wishlist-button' onClick={(e) => { e.stopPropagation(); handleWish(item.id); }}>
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
                                    <h4 className="Api-product-title">{item.title}</h4>
                                    <h4 className="Api-price">{item.price}</h4>
                                </div>)
                        })}

                    </div>
                ) : (
                    <ProductLoader1 />
                )}
            </Container>
        </>

    )
}
