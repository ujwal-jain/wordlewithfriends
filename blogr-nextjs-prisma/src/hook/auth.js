import { createContext, useContext, useState } from "react";
import { doc, setDoc, getDoc, addDoc, collection, initializeFirestore } from "firebase/firestore";
import 'firebase/firestore';
import AuthService from "../service/AuthService";
import db from "../../firebase/firebase"
const authContext = createContext();

export default function useAuth() {
	return useContext(authContext);
}

export function AuthProvider(props) {
	const [user, setUser] = useState(null);
	const [error, setError] = useState("");

	const loginWithGoogle = async () => {
		const { error, user } = await AuthService.loginWithGoogle();
		setUser(user ?? null);
		setError(error ?? "");

        const userRef = doc(db, "users", user.email);
        const docSnap = await getDoc(userRef);

        if(!docSnap.exists()) {
            await setDoc(doc(db, "users", user.email), {
                email: user.email,
                name: user.displayName,
                friends: [],
                points: 0,
                wordleResults: [],
            });
        }
	};

	const logout = async () => {
		await AuthService.logout();
		setUser(null);
	};

	const value = { user, error, loginWithGoogle, logout, setUser };

	return <authContext.Provider value={value} {...props} />;
}