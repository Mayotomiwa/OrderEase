import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from "../data/firebase";
type CartContextProps = {
    cartQuantity: number,
    cartItems: CartItem[],
    getItemQuantity: (id: number) => number,
    incItemQuantity: (id: number) => void,
    decItemQuantity: (id: number) => void,
    setItemQuantity: (id: number, quantity: number) => void
    removeFromCart: (id: number) => void,
    clearCart: () => void
}
type CartItem = {
    id: number,
    quantity: number
}
const CartContext = createContext({} as CartContextProps);

type CartProviderProps = {
    children: ReactNode;
}

export function useCart() {
    return useContext(CartContext)
}

export default function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userCartRef = doc(db, 'carts', user.uid);
                const userCartSnap = await getDoc(userCartRef);

                if (userCartSnap.exists()) {
                    setCartItems(userCartSnap.data().items);
                }
            } else {
                setCartItems([]);
            }
        });

        return () => unsubscribe();
    }, [auth])


    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function incItemQuantity(id: number) {
        const user = auth.currentUser;

        if (!user) {
            console.error('No user is authenticated');
            return;
        }
        setCartItems(currentItems => {
            let updatedItems;
            if (currentItems.find(item => item.id === id) == null) {
                updatedItems = [...currentItems, { id, quantity: 1 }];
            } else {
                updatedItems = currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }

            const userCartRef = doc(db, 'carts', user.uid);
            setDoc(userCartRef, { items: updatedItems }, { merge: true });

            return updatedItems;
        });
    }

    function decItemQuantity(id: number) {
        const user = auth.currentUser;

        if (!user) {
            console.error('No user is authenticated');
            return;
        }

        setCartItems(currentItems => {
            let updatedItems;
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                updatedItems = currentItems.filter(item => item.id !== id);
            } else {
                updatedItems = currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }

            const userCartRef = doc(db, 'carts', user.uid);
            setDoc(userCartRef, { items: updatedItems }, { merge: true });

            return updatedItems;
        });
    }
    function removeFromCart(id: number) {
        const user = auth.currentUser;

        if (!user) {
            console.error('No user is authenticated');
            return;
        }

        setCartItems(currentItems => {
            const updatedItems = currentItems.filter(item => item.id !== id);

            const userCartRef = doc(db, 'carts', user.uid);
            setDoc(userCartRef, { items: updatedItems }, { merge: true });

            return updatedItems;
        });
    }

    function setItemQuantity(id: number, quantity: number) {
        const user = auth.currentUser;

        if (!user) {
            console.error('No user is authenticated');
            return;
        }

        setCartItems(currentItems => {
            const updatedItems = currentItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: quantity };
                } else {
                    return item;
                }
            });

            const userCartRef = doc(db, 'carts', user.uid);
            setDoc(userCartRef, { items: updatedItems }, { merge: true });

            return updatedItems;
        });
    }

    function clearCart() {
        setCartItems([]);
    }

    const value = {
        cartQuantity,
        cartItems,
        getItemQuantity,
        incItemQuantity,
        decItemQuantity,
        removeFromCart,
        setItemQuantity,
        clearCart
    }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

