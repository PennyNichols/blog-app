import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GiNotebook } from "react-icons/gi";
import { AuthContext } from "../contexts/AuthContext";

const Navigation = () => {
	let { currentUser, handleLogout } = useContext(AuthContext);
	const navigate = useNavigate()
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Link to="/">
					<GiNotebook className="nav-brand" />
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{currentUser ? (
							<>
								<Link className="nav-link" to="/profile">
									{currentUser ? currentUser.displayName : "Profile"}
								</Link>
								<Link className="nav-link" to="/new-blog">
									New
								</Link>
								<Nav.Item className="nav-link" onClick={handleLogout}>
									Logout
								</Nav.Item>
							</>
						) : (
							<>
								<Nav.Item
									className="nav-link"
									onClick={() => navigate("/login")}
								>
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
