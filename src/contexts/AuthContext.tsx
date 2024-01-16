import { User, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../data/firebase";
import { useCart } from "./CartContext";
import { useWish } from "./WishContext";

type AuthContextProps = {
    currentUser: User | null;
    register: (name: string, email: string, password: string) => Promise<User>;
    login: (email: string, password: string) => Promise<User>;
    loginWithGoogle: () => Promise<User>;
    resetPassword: (email: string) => Promise<void>;
    updateMail: (email: string) => Promise<void>;
    updatepassword: (password: string) => Promise<void>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
}

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<Boolean | null>(true)
    const { clearCart } = useCart()
    const { clearWishList } = useWish();

    async function register(name: string, email: string, password: string) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
            await updateProfile(user, {
                displayName: name,
            });
        }
        return user;
    }
    async function login(email: string, password: string) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }

    async function loginWithGoogle() {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    }

    async function resetPassword(email: string) {
        return await sendPasswordResetEmail(auth, email)
    }
    async function updateMail(email: string) {
        if (auth.currentUser !== null) {
            return await updateEmail(auth.currentUser, email);
        }
    }
    async function updatepassword(password: string) {
        if (auth.currentUser !== null) {
            return await updatePassword(auth.currentUser, password);
        }
    }
    async function logout() {
        clearCart();
        clearWishList();
        return await signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        register,
        login,
        loginWithGoogle,
        resetPassword,
        updatepassword,
        updateMail,
        logOut: logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;