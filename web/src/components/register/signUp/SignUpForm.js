import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import TextField from '@mui/material/TextField';
import 'react-toastify/ReactToastify.css'

const SignUpForm = ({ toggleForm }) => {
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        const response = await fetch('http://localhost:5000/api/reg/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name, password }),
        });

        if (response.ok) {
            toast.success("Signup successful!");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            toast.success("Signup failed!");
        }
    };


    return (
        <React.Fragment>
            <ToastContainer />
            <div className='sign_up_container'>
                <form
                    className='box'
                    onSubmit={handleSubmit}>
                    <h2>
                        Sign Up
                    </h2>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        className='input_failed__text'
                        value={user_name}
                        type='password'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        className='input_failed__text'
                        value={password}
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Confirm Password"
                        variant="outlined"
                        className='input_failed__text'
                        value={confirmPassword}
                        type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className='btn__submit'>
                        Sign Up
                    </button>

                    <p className='sing_up_p'>
                        Already signed up?
                        <Link
                            to={'/login'}
                            className='sign_up_link'>
                            Go to sign in.
                        </Link>
                    </p>
                </form>
            </div>
        </React.Fragment>
    );
};

export default SignUpForm;