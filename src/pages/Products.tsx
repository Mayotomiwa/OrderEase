import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Separator from '../component/GeneralComponents/seperator';
import SizeSelector from '../component/ProductComponents/SizeSelector';
import { useCart } from '../contexts/CartContext';
import { useWish } from '../contexts/WishContext';
import '../css/Product.css';
import { fetchProduct, fetchProducts } from '../data/APIs';
import Delivery from '../icons/Delivery';
import Return from '../icons/Return';
import Wish from '../icons/wishlist';
import WishFill from '../icons/wishlistfill';
import ImageLoader from '../loaders/ImageLoader';
import ProductLoader from '../loaders/PorductLoader';
import { Product } from '../types/Products';
import currency from '../utils/currency';

export default function ProductDetails() {
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isWish, setIsWish] = useState<boolean>(false);
    const { id } = useParams();
    const { getItemQuantity, incItemQuantity, decItemQuantity } = useCart()
    const { addToWishList, isInWishList, removeFromWishList } = useWish();
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();


    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
        }, 3000);
        return () => {
            clearTimeout(t);
        }
    }, []);

    useEffect(() => {
        const getProduct = async () => {
            if (id) {
                const data = await fetchProduct(id);
                setProduct(data);
                setIsWish(isInWishList(Number(id)));
                setLoading(false)
            }
        };

        getProduct();
    }, [id]);
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (product && product.category) {
                const related = await fetchProducts(product.category);
                setRelatedProducts(related);
            }
        };

        fetchRelatedProducts();
    }, [product]);



    let quantity = 0;
    if (product) {
        quantity = getItemQuantity(product.id);
    }

    function handleWish() {
        if (product) {
            if (isWish) {
                removeFromWishList(product.id);
            } else {
                addToWishList(product.id);
            }
            setIsWish(!isWish);
        }
    }

    return product ? (
        <Container fluid>
            <Row className='mb-4 mt-4'>
                {!loading ? (
                    <Col lg={5} md={12} xs={12} >
                        <div className='product-item'>
                            <img src={product.image} alt={product.title} className='product-image' />
                        </div>
                    </Col>

                ) : (
                    <ImageLoader />
                )}
                {!loading ? (
                    <Col lg={5}>
                        <h2 className='product-name'>{product.title}</h2>
                        <p className='product-price mb-4'>{currency(product.price)}</p>
                        <p className='product-description'>{product.description}</p>
                        <Separator />
                        <SizeSelector />
                        <Stack className="mb-4">
                            <Stack direction='horizontal' gap={3} className='product-button' style={{ gap: '1rem' }}>
                                <Button variant='danger' className='p-3' onClick={() => { decItemQuantity(product.id) }}>-</Button>
                                <span className='quantity-text'>{quantity}</span>
                                <Button variant='danger' className='p-3' onClick={() => { incItemQuantity(product.id) }}>+</Button>
                                <Button variant='danger' className='p-3' onClick={() => { incItemQuantity(product.id) }}>Add to Cart</Button>
                                <Button variant='text' className='wish-button' onClick={() => { handleWish(); }}>
                                    {isWish ? <WishFill /> : <Wish />}
                                </Button>
                            </Stack>
                        </Stack>
                        <Col lg={8}>
                            <Stack className='w-60 form-text d-flex justify-content-center'>
                                <Card className='product-assurance p-1'>
                                    <Stack direction='horizontal' className='ms-4'>
                                        <Delivery />
                                        <Card.Body>
                                            <Card.Title className='textFont'>Free Delivery</Card.Title>
                                            <Card.Text>All orders above {currency(20000)}. availability: 7 Days Delivery</Card.Text>
                                        </Card.Body>
                                    </Stack>

                                </Card>
                                <Card className='product-assurance p-1'>
                                    <Stack direction='horizontal' className='ms-4'>
                                        <Return />
                                        <Card.Body>
                                            <Card.Title className='textFont'>Return Policy</Card.Title>
                                            <Card.Text>Return in 10 Days before return details</Card.Text>
                                        </Card.Body>
                                    </Stack>
                                </Card>
                            </Stack>
                        </Col>
                    </Col>
                ) : (
                    <ProductLoader />
                )}

            </Row>
            <Row>
                <h3>Related Items</h3>
                <Col lg={12} className="scroll-container">
                    {relatedProducts.map((relatedProduct, index) => (
                        <div key={index} className="item-container">
                            <div className="scroll-item" onClick={() => navigate(`/products/${relatedProduct.id}`)}>
                                <img src={relatedProduct.image} alt={relatedProduct.title} className="Api-image" />
                                <div className="hover-buttons">
                                    <Button variant='text' className='wishlist-button' onClick={(e) => { e.stopPropagation(); handleWish(); }}>
                                        {isWish ? <WishFill /> : <Wish />}
                                    </Button>
                                    {quantity === 0 ?
                                        <Button variant='secondary' className='cart-button addCart' onClick={(e) => { e.stopPropagation(); incItemQuantity(relatedProduct.id) }}>Add to Cart</Button>
                                        : (
                                            <Stack direction='horizontal' gap={5} className='cart-button' style={{ gap: '1rem' }}>
                                                <Button variant='secondary' className='cart-buttons' onClick={(e) => { e.stopPropagation(); decItemQuantity(relatedProduct.id) }}>-</Button>
                                                <span>{quantity}</span>
                                                <Button variant='secondary' className='cart-buttons' onClick={(e) => { e.stopPropagation(); incItemQuantity(relatedProduct.id) }}>+</Button>
                                            </Stack>
                                        )}
                                </div>
                            </div>
                            <h4 className="Api-title">{relatedProduct.title}</h4>
                            <h4 className="Api-price">{currency(relatedProduct.price)}</h4>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    ) : null;
}
