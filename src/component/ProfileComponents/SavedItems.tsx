import React from 'react';
import { useWish } from '../../contexts/WishContext';
const WishItems = React.lazy(() => import('../WishListComponents/WishItems'));


export default function SavedItems() {
    const { wishItems } = useWish();
    return (
        <div className="cart">
        {wishItems && wishItems.map(item => (
            <WishItems key={item.id} {...item} />
        ))}
    </div>
    )
}
