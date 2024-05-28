import React, { useState } from 'react';
// import { useAppDispatch } from '../redux/store';
import { register } from '../services/authService';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const dispatch = useAppDispatch();

    const handleRegister = async () => {
        try {
            await register({ email, username, password });
            alert('Register successfully');
        } catch (error) {
            alert('Register failed');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
