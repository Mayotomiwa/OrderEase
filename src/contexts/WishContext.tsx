import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from "../data/firebase";

type WishContextProps = {
    wishItems: WishItems[],
    isInWishList: (id: number) => boolean,
    addToWishList: (id: number) => void,
    removeFromWishList: (id: number) => void,
    clearWishList: () => void
}

type WishItems = {
    id: number,
    quantity: number
}

const WishContext = createContext({} as WishContextProps);

type WishProviderProps = {
    children: ReactNode;
}

export function useWish() {
    return useContext(WishContext)
}

export default function WishProvider({ children }: WishProviderProps) {
    const [wishItems, setWishItems] = useState<WishItems[]>([])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userWishRef = doc(db, 'wishlists', user.uid);
                const userWishSnap = await getDoc(userWishRef);

                if (userWishSnap.exists()) {
                    setWishItems(userWishSnap.data().items);
                }
            } else {
                setWishItems([]);
            }
        });
        return () => unsubscribe();
    }, [auth])


    function addToWishList(id: number) {
        const user = auth.currentUser;

        if (!user) {
            console.error('No user is authenticated');
            return;
        }

        setWishItems(currentItems => {
            if (currentItems.find(item => item.id === id)) {
                console.error('Item is already in the wishlist');
                return currentItems;
            }

            const updatedItems = [...currentItems, { id, quantity: 1 }];

            const userWishListRef = doc(db, 'wishlists', user.uid);
            setDoc(userWishListRef, { items: updatedItems }, { merge: true });

            return updatedItems;
        });
    }


    function removeFromWishList(id: number) {
        const user = auth.currentUser;

        if (!user) {
            console.error('No user is authenticated');
            return;
        }

        setWishItems(currentItems => {
            const updatedItems = currentItems.filter(item => item.id !== id);

            const userWishListRef = doc(db, 'wishlists', user.uid);
            setDoc(userWishListRef, { items: updatedItems }, { merge: true });

            return updatedItems;
        });
    }
    function isInWishList(id: number) {
        return wishItems.some(item => item.id === id);
    }

    function clearWishList() {
        setWishItems([]);
    }

    const value = {
        wishItems,
        isInWishList,
        addToWishList,
        removeFromWishList,
        clearWishList
    }
    return (
        <WishContext.Provider value={value}>{children}</WishContext.Provider>
    )
}

