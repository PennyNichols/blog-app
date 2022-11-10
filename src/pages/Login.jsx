import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {login} from '../helpers/firebase'


const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleLogin = async(e) =>{
        if(!email || !password){
            setError('Invalid Entry')
            return;
        }
        const message = await login(email, password);
        if (message) {
            setError(message);
        }else {
            setError(null);
            navigate('')
        }
    }

	return (
		<div className="login p-5" >
			<Container className='container-fluid p-4' style={{backgroundColor: '#d3d3d3e2', width: '24rem'}}>
                {error && <p className='text-danger'>{error}</p>}
                <h2 className='pb-3' >Login</h2>
				<Form>
					<Form.Control
                        type='email'
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
                        className='my-2'
                        type='password'
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
                    <Form.Text style={{cursor: 'pointer'}} className='muted text-primary'>Forget Password?</Form.Text>
                    <br/>
                    <Button className='my-2 w-100' type='button' onClick={handleLogin}>Login</Button>
				</Form>
                <Button className='w-100' type='button'>Continue with Google</Button>
                <p className="mt-2">Need an Account? <span className='text-primary' style={{cursor: 'pointer'}} onClick={()=>navigate('/register')}>Sign Up.</span></p>
			</Container>
		</div>
	);
};

export default Login;
