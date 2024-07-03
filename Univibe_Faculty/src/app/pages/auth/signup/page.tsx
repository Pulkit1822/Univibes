"use client";
// SignupPage.js

import React, { useState } from 'react';
import './signup.css';
import { ToastContainer, toast } from 'react-toastify';

const SignupPage = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Admin registration successful', data);

        toast.success('Admin Registration Successful', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        console.error('Admin registration failed', response.statusText);
        toast.error('Admin Registration Failed', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error('An error occurred during registration');
      console.error('An error occurred during registration', error);
    }
  };

  return (
    <div className='formpage'>
      <h1>Signup</h1>

      <div className='form-container'>
        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className='redirect-text'>
          Already a user? <a href='/pages/auth/signin'>Login here</a>
        </p>

        <div className='button-container'>
          <button onClick={handleSignup}>Sign up</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
