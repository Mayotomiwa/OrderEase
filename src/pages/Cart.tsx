import { useEffect, useState } from 'react'
import { Button, Card, Container, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CartItem from '../component/CartComponents/CartItem'
import CheckOut from '../component/CartComponents/CheckOut'
import { useCart } from '../contexts/CartContext'
import '../css/Cart.css'
import { fetchAllProducts } from '../data/APIs'
import { Product } from '../types/Products'
import currency from '../utils/currency'

export default function Cart() {
    const [confirm, setConfirm] = useState<boolean>(false)
    const { cartItems } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchAllProducts(); // fetch all products
            setProducts(data);
        };

        getProducts();
    }, []);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const onSubmitOrder = () => {
        navigate("/checkout");
        setConfirm(true);
    }

    function handleChange() {
        navigate("/")
    }
    return (
        <Container>
            <main className="main main--cart">
                {confirm ? (
                    <CheckOut />
                ) : (
                    <>
                        <h2 className="cart">Cart</h2>
                        {cartItems.length === 0 ? (
                            <>
                                <div className='w-70 form-text d-flex justify-content-center'>
                                    <Card className='mb-4 p-5 w-100'>
                                        <Card.Header className='textFont' style={{ backgroundColor: '#fff' }}>No Items In Cart Yet</Card.Header>
                                        <Card.Body>
                                            <Card.Title className='textFont'>Click the button below to Order</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <Button variant='danger' style={{ width: '20%' }} className='p-3' onClick={handleChange}>
                                    Home
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="cart">
                                    {cartItems.map(item => (
                                        <CartItem key={item.id} {...item} />
                                    ))}
                                </div>
                                <div className="cart__totals">
                                    <p>Total Items: {totalItems}</p>
                                    <Stack direction='horizontal' className='d-flex align-items-baseline' gap={3}>
                                        <h5>SubTotal Price:{' '}
                                            {currency(
                                                cartItems.reduce((total, cartItem) => {
                                                    const item = products.find(i => i.id === cartItem.id)
                                                    return total + (item?.price || 0) * cartItem.quantity
                                                }, 0)
                                            )}
                                        </h5>
                                        <p>*Delivery Fee Not Included</p>
                                    </Stack>
                                    <Button variant='danger' className="cart__submit p-3" disabled={cartItems.length === 0} onClick={onSubmitOrder}>Go To Checkout</Button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>
        </Container>
    )

}
