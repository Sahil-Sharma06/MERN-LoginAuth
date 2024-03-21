import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });
            if (res.data.status) {
                navigate('/'); // Redirect to dashboard after successful login
            } else {
                // Handle login failure (incorrect credentials, etc.)
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error (display error message, etc.)
        }
    }

    return (
        <div className="mainContainer">
            <div className='sign-up-container'>
                <h2>Login</h2>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor='password'>Password:</label>
                    <input type='password' placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>Login</button>
                    <Link to="/forgot-password">Forgot Password</Link>
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
