import { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useCart } from "../../contexts/CartContext";
import { fetchAllProducts } from "../../data/APIs";
import CartLoader from "../../loaders/CartLoader";
import { Product } from '../../types/Products';
import currency from "../../utils/currency";
import Separator from "../GeneralComponents/seperator";

type CartItemProps = {
    id: number
    quantity: number
}

export default function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useCart()
    const [item, setItem] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getItem = async () => {
            const products = await fetchAllProducts();
            const foundItem = products.find((i: Product) => i.id === id);
            setItem(foundItem || null);
            setLoading(false)
        };

        getItem();
    }, [id]);

    if (item == null) return null

    return (
        <Container>
            {!loading ? (
                <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
                    <img
                        src={item.image}
                        className="cart__img mb-3"
                    />
                    <div className="me-auto">
                        <div>
                            {item.title}
                            {quantity > 1 && (
                                <span className="text-muted" style={{ fontSize: ".65rem" }}>
                                    x{quantity}
                                </span>
                            )}
                        </div>
                        <div className="text-muted" style={{ fontSize: ".75rem" }}>
                            {currency(item.price)}
                        </div>
                    </div>
                    <div> {currency(item.price * quantity)}</div>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                    >
                        &times;
                    </Button>
                </Stack>

            ) : (
                <CartLoader />
            )}
            <Separator />
        </Container>
    )
}
