import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    languagesKnown: '',
    mciRegNo: '',
    certificateNo: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (
      formData.name === '' ||
      formData.languagesKnown === '' ||
      formData.mciRegNo === '' ||
      formData.certificateNo === '' ||
      !formData.languagesKnown.includes('English')
    ) {
      setError('All fields are required, and at least English must be known');
      return;
    }

    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate('/doctor-portal');
        } else {
          setError(data.message || 'Signup failed');
        }
      })
      .catch(error => setError('Error during signup'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="languagesKnown"
          placeholder="Languages Known (comma separated)"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.languagesKnown}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mciRegNo"
          placeholder="MCI Registration Number"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.mciRegNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="certificateNo"
          placeholder="Certificate Number"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.certificateNo}
          onChange={handleChange}
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
