import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";


const Login = () => {
	const [email, setEmail] = useState("");

	return (
		<div className="login" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url('../assets/login-bg.jpg')'}}>
            <h2>Login</h2>
			<Container>
				<Form>
					<Form.Control
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form>
			</Container>
		</div>
	);
};

export default Login;
