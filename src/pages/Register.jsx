import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	return (
		<div className="login p-5">
			<Container
				className="container-fluid p-4"
				style={{ backgroundColor: "#d3d3d3e2", width: "24rem" }}
			>
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
					
					<Button className="my-2 w-100" type="button">
						Sign Up
					</Button>
				</Form>
				<Button className="w-100" type="button">
					Continue with Google
				</Button>
				<p className="mt-2">
					Have an Account?{" "}Login{" "}
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
