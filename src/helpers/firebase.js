import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// .env variable assignment setup:
// REACT_APP_apiKey=
// REACT_APP_authDomain=
// REACT_APP_projectId=
// REACT_APP_storageBucket=
// REACT_APP_messagingSenderId=
// REACT_APP_appId=

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messageSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getDatabase(app);

// Register a user
export const registerUser = async (email, password, displayName) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, { displayName });
	} catch (err) {
		return err.message.replace("Firebase:", "");
	}
};

// login
export const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		return err.message.replace("Firebase:", "");
	}
};

// user observer
export const userObserver = (setCurrentUser) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			setCurrentUser(user);
		} else {
			setCurrentUser(null);
		}
	});
};

// signout
export const logout = () => {
	signOut(auth);
};

export const signUpProvider = async () => {
	const provider = new GoogleAuthProvider();
	await signInWithPopup(auth, provider);
};

export const forgetPassword = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		return "Please check your email !";
	} catch (err) {
		console.log(err);
		return err.message.replace("Firebase:", "");
	}
};
