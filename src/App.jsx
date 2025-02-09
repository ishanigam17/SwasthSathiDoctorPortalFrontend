import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoCallPage from './doctor/pages/VideoCall.jsx';
import LoginPage from './doctor/pages/login.jsx';
import DoctorPortal from './doctor/pages/DoctorProfile.jsx';
import SignupPage from './doctor/pages/SignUp.jsx';
import PatientCard from './doctor/pages/patientCard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/doctorprofile" element={<DoctorPortal />} />
        <Route path="/videocall" element={<VideoCallPage />} />  
        <Route path="/patientcard" element={<PatientCard />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
