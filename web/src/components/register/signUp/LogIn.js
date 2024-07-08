import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import TextField from '@mui/material/TextField';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/reg/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_name, password }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result && result.token) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('username', user_name);


                    const userId = result.userId;

                    toast.success('Login successful!');

                    setTimeout(() => {
                        navigate('/books', { state: { userId } });
                    }, 2000);
                } else {
                    toast.error('Login failed!');
                }
            } else {
                toast.error('Login failed!');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed!');
        }
    };

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="sign_up_container">
                <form className="box" onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        className="input_failed__text"
                        value={user_name}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type='password'
                        className="input_failed__text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn__submit">
                        Sign In
                    </button>

                    <p className="sing_up_p">
                        Already signed up?{' '}
                        <Link to={'/'} className="sign_up_link">
                            Go to sign up.
                        </Link>
                    </p>
                </form>
            </div>
        </React.Fragment>
    );
};

export default LogIn;