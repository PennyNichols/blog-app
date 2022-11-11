import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {logout, userObserver} from '../helpers/firebase';
import { registerUser,login, signUpProvider, forgetPassword } from "../helpers/firebase";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = (props) => {
	const [currentUser, setCurrentUser] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState(null);
    const [userId, setUserId] = useState();

	const navigate = useNavigate();



	useEffect(() => userObserver(setCurrentUser), []);
	useEffect(() => userObserver(setUserId), []);



    const handleSignUp = async () => {
		if (!name || !email || !password) {
			setError("Invalid Entry");
			return;
		}
		const message = await registerUser(email, password, name);
		if (message) {
			setError(message);
		} else {
			setError(null);
            setName();
            setEmail();
            setPassword();
			navigate("/login");
		}
	};

    const handleProvider = () =>{
        signUpProvider();
        navigate('/');
    }
    const handleLogin = async (e) => {
		if (!email || !password) {
			setError("Invalid Entry");
			return;
		}
		const message = await login(email, password);
		if (message) {
			setError(message);
		} else {
			setError(null);
            setName();
            setEmail();
            setPassword();
			navigate("/");
            toast.success('Welcome Back!')
		}
	};



    const forgetPasswordHandler = async(email) => {
        const message = await forgetPassword(email);
        if(message) setError(message)
    }


    const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser,name, setName, email, setEmail, password, setPassword, error, setError, handleSignUp, handleProvider, navigate, handleLogin, forgetPasswordHandler, handleLogout, userId }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
