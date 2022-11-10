import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


const Navigation = () => {
    const [isAuth, setIsAuth] = useState(true)
    const navigate = useNavigate()

    const handleLogout = () => {
        setIsAuth(false)
    }
    const handleLogin = () => {
        setIsAuth(true)
    }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to='' className='nav-brand'>Penny Blog</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            { isAuth ? (
                <>
                    <Link className='nav-link' to='/profile' >Profile</Link>
                    <Link className='nav-link' to='/new-blog' >New</Link>
                    <Link className='nav-link' to='/login' onClick={handleLogout}>Logout</Link>
                </>

            ) : (
               <Link className='nav-link' to='' onClick={handleLogin}>Login</Link> 
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
