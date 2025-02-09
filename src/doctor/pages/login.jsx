import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setError('Both email and password are required');
      return;
    }
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        navigate('/DoctorProfile');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('Error logging in. Please try again later.');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
