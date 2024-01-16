import React, { useEffect, useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import { useCart } from '../../contexts/CartContext'
import { fetchAllProducts } from '../../data/APIs'
import { Product } from '../../types/Products'
import currency from '../../utils/currency'

const CartLoader = React.lazy(() => import('../../loaders/CartLoader'));
const CartItem = React.lazy(() => import('./CartItem'));


export default function CheckOut() {
    const [confirm, setConfirm] = useState<boolean>(false)
    const { cartItems, removeFromCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchAllProducts();
            setProducts(data);
            setLoading(false);
        };

        getProducts();
    }, []);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const onSubmitOrder = () => {
        cartItems.forEach(item => removeFromCart(item.id));
        setConfirm(true);
    }

    return (
        <Container>
            {!loading ? (
                <main className="main main--cart">
                    {confirm ? (
                        <h2>Thanks For Your Order</h2>
                    ) : (
                        <>
                            <h2 className="cart">Check Out</h2>
                            <div className="cart">
                                {cartItems.map(item => (
                                    <CartItem key={item.id} {...item} />
                                ))}
                            </div>

                            <div className="cart__totals">
                                <p>Total Items: {totalItems}</p>
                                <Stack className='d-flex align-items-baseline' gap={3}>
                                    <p>*Delivery Fee {currency(300)}</p>
                                    <h5>Total Price:{' '}
                                        {currency(
                                            cartItems.reduce((total, cartItem) => {
                                                const item = products.find(i => i.id === cartItem.id)
                                                return total + ((item?.price || 0) * cartItem.quantity) + 300
                                            }, 0)
                                        )}
                                    </h5>
                                </Stack>
                                <Button variant='danger' className="cart__submit p-3" disabled={cartItems.length === 0} onClick={onSubmitOrder}>Place Order</Button>
                            </div>
                        </>
                    )}
                </main>

            ) : (
                <CartLoader />
            )}
        </Container>
    )

}
