import React from 'react';
import { useCart } from '../../contexts/CartContext';

const CartItem = React.lazy(() => import('../CartComponents/CartItem'));

export default function Orders() {
    const { cartItems } = useCart();
    return (
        <div className="cart">
        {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
        ))}
    </div>
    )
}
