import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {GiNotebook} from 'react-icons/gi'

const Navigation = () => {
	const [isAuth, setIsAuth] = useState(true);
	const navigate = useNavigate();

	const handleLogout = () => {
		setIsAuth(false);
	};
	const handleLogin = () => {
		setIsAuth(true);
		navigate("/login");
	};
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Link to="" >
					<GiNotebook className="nav-brand"/>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{isAuth ? (
							<>
								<Link className="nav-link" to="/profile">
									Profile
								</Link>
								<Link className="nav-link" to="/new-blog">
									New
								</Link>
								<Link className="nav-link" to="/login" onClick={handleLogout}>
									Logout
								</Link>
							</>
						) : (
							<>
								<Nav.Item className="nav-link" onClick={handleLogin}>
									Login
								</Nav.Item>
								<Nav.Item
									className="nav-link"
									onClick={() => navigate("/register")}
								>
									Register
								</Nav.Item>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
