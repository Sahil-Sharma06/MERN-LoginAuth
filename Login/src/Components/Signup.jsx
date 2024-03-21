import React, {useState} from 'react'
import '../App.css'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Added email state
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/signup', {
            username,
            email,
            password
        }).then(res => {
            if(res.data.status){ // Changed Response to res
                navigate('/login');
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="mainContainer">
            <div className='sign-up-container'>
                <h2>Sign Up</h2>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input type='text' placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor='email'>Email:</label> {/* Updated label */}
                    <input type='text' placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} // Updated input field
                    />

                    <label htmlFor='password'>Password:</label>
                    <input type='password' placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>Sign Up</button>
                    <p>Have an account?<Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
