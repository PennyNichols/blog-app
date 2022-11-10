import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser, signUpProvider } from "../helpers/firebase";

const Register = () => {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState(null);

	const navigate = useNavigate();

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
			navigate("/login");
		}
	};

    const handleProvider = () =>{
        signUpProvider();
        navigate('/');
    }

	return (
		<div className="login p-5">
			<Container
				className="container-fluid p-4"
				style={{ backgroundColor: "#d3d3d3e2", width: "24rem" }}
			>
                { error && <p className='text-danger' >{error}</p>}
				<h2 className="pb-3">Sign Up</h2>
				<Form>
					<Form.Control
						className="mb-2"
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Form.Control
						className="mb-2"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
						className="mb-2"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button className="my-2 w-100" type="button" onClick={handleSignUp}>
						Sign Up
					</Button>
				</Form>
				<Button className="w-100" type="button" onClick={handleProvider}>
					Continue with Google
				</Button>
				<p className="mt-2">
					Have an Account? Login{" "}
					<span
						className="text-primary"
						style={{ cursor: "pointer" }}
						onClick={() => navigate("/login")}
					>
						here.
					</span>
				</p>
			</Container>
		</div>
	);
};

export default Register;
