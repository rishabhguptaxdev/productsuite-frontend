import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/authSlice';
import '../css/auth.css';
const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the signup API
        const response = await fetch(`${backendbaseurl}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const { jwtToken } = await response.json();
            localStorage.setItem('token', jwtToken);
            dispatch(login(jwtToken))
            navigate('/dashboard');
        } else {
            // Handle signup error
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Signup</button>
                <Link to="/login">Already have an account? Login</Link>
            </form>
        </div>
    );
};

export default Signup;
