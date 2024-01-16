import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWish } from '../../contexts/WishContext';
import { fetchAllProducts } from '../../data/APIs';
import { Product } from '../../types/Products';

const Wish = React.lazy(() => import('../../icons/wishlist'));
const WishFill = React.lazy(() => import('../../icons/wishlistfill'));
const ProductLoader2 = React.lazy(() => import('../../loaders/AllProductsLoader'));


type ViewProductProps = {
    showModal: boolean;
    onClose: () => void;
}
export default function ViewProducts({ showModal, onClose }: ViewProductProps) {
    const [wishStates, setWishStates] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState<boolean>(true)
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const { getItemQuantity, incItemQuantity, decItemQuantity } = useCart();
    const { addToWishList, isInWishList, removeFromWishList } = useWish();
    const navigate = useNavigate();

    useEffect(() => {
        const getAllProducts = async () => {
            const data = await fetchAllProducts();
            setRelatedProducts(data);
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
        <Container fluid className='w-100'>
            <Modal show={showModal} onHide={onClose} size='xl'>
                {!loading ? (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Products</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                {relatedProducts.slice(0, 20).map((product, index) => {
                                    const quantity = getItemQuantity(product.id)
                                    const isWish = wishStates[product.id];

                                    function handleWish() {
                                        if (isWish) {
                                            removeFromWishList(product.id);
                                        } else {
                                            addToWishList(product.id);
                                        }
                                        setWishStates({
                                            ...wishStates,
                                            [product.id]: !isWish
                                        });
                                    }
                                    return (
                                        <Col md={4} key={index} >
                                            <div className="item-container">
                                                <div className="scroll-item" onClick={() => navigate(`/products/${product.id}`)}>
                                                    <img src={product.image} alt={product.title} className="Api-image" />
                                                    <div className="hover-buttons">
                                                        <Button variant='text' className='wishlist-button' onClick={(e) => { e.stopPropagation(); handleWish(); }}>
                                                            {isWish ? <WishFill /> : <Wish />}
                                                        </Button>
                                                        {quantity === 0 ?
                                                            <Button variant='secondary' className='cart-button addCart' onClick={(e) => { e.stopPropagation(); incItemQuantity(product.id) }}>Add to Cart</Button>
                                                            : (
                                                                <Stack direction='horizontal' gap={5} className='cart-button' style={{ gap: '1rem' }}>
                                                                    <Button variant='secondary' className='cart-buttons' onClick={(e) => { e.stopPropagation(); decItemQuantity(product.id) }}>-</Button>
                                                                    <span>{quantity}</span>
                                                                    <Button variant='secondary' className='cart-buttons' onClick={(e) => { e.stopPropagation(); incItemQuantity(product.id) }}>+</Button>
                                                                </Stack>
                                                            )}
                                                    </div>
                                                </div>
                                                <h4 className="Api-title">{product.title}</h4>
                                                <h4 className="Api-price">{product.price}</h4>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Modal.Body>
                    </>
                ) : (
                <ProductLoader2 />
                )}
            </Modal>
        </Container>
    )
}
