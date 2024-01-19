import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../data/firebase';
import { AddressProps } from '../types/AddressProps';

type AddressContextProps = {
    data: AddressProps;
    setData: (value: AddressProps) => void;
    saveData: (value: AddressProps) => Promise<void>;
    updateData: (value: AddressProps) => Promise<void>;
}

const AddressContext = createContext<AddressContextProps | undefined>(undefined);

export function useData() {
    const context = useContext(AddressContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}

type AddressProviderProps = {
    children: ReactNode;
}

function AddressProvider({ children }: AddressProviderProps) {
    const [data, setData] = useState<AddressProps>({
        name: '',
        street: '',
        city: '',
        state: '',
    });


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "address", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data() as AddressProps);
                } else {
                    console.log("No such document!");
                }
            }
        });
        return () => unsubscribe();
    }, [auth]);

    async function saveData(newData: AddressProps) {
        const user = auth.currentUser;

        if (!user) {
            console.error('No user is authenticated');
            return;
        }
        setData(newData);
        if (user) {
            const docRef = doc(db, "address", user.uid);
            await setDoc(docRef, newData);
        }
    };


    async function updateData(newData: AddressProps) {
        const user = auth.currentUser;

        if (!user) {
            console.error('No user is authenticated');
            return;
        }
        setData(newData);
        if (user) {
            const docRef = doc(db, "address", user.uid);
            await updateDoc(docRef, newData as { [x: string]: any });
        }
    };

    const value = {
        data,
        setData,
        saveData,
        updateData
    }

    return (
        <AddressContext.Provider value={value}>
            {children}
        </AddressContext.Provider>
    );
}

export default AddressProvider;
