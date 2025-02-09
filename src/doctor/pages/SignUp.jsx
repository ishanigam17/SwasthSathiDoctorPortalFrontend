import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [languagesKnown, setLanguagesKnown] = useState('');
  const [mciRegNo, setMciRegNo] = useState('');
  const [certificateNo, setCertificateNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (
      name === '' ||
      languagesKnown === '' ||
      mciRegNo === '' ||
      certificateNo === '' ||
      !languagesKnown.includes('English')
    ) {
      setError('All fields are required, and at least English must be known');
      return;
    }
    // Add your signup logic here
    navigate('/doctor-portal');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Languages Known (comma separated)"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={languagesKnown}
          onChange={(e) => setLanguagesKnown(e.target.value)}
        />
        <input
          type="text"
          placeholder="MCI Registration Number"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={mciRegNo}
          onChange={(e) => setMciRegNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Certificate Number"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={certificateNo}
          onChange={(e) => setCertificateNo(e.target.value)}
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
