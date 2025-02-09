import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DoctorPortal = () => {
  const [doctorInfo, setDoctorInfo] = useState({ name: '', degree: '' });
  const [onlinePatients, setOnlinePatients] = useState([]);
  const [meetingHistory, setMeetingHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctor details
    fetch('/api/doctor')
      .then(response => response.json())
      .then(data => setDoctorInfo(data))
      .catch(error => console.error('Error fetching doctor info:', error));

    // Fetch previous meetings
    fetch('/api/meetings')
      .then(response => response.json())
      .then(data => setMeetingHistory(data))
      .catch(error => console.error('Error fetching meetings:', error));
  }, []);

  const handleToggleOnline = () => {
    fetch('/api/toggle-online', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isOnline: !isOnline })
    })
      .then(response => response.json())
      .then(data => {
        setIsOnline(data.isOnline);
        if (data.isOnline) {
          fetch('/api/online-patients')
            .then(response => response.json())
            .then(data => setOnlinePatients(data))
            .catch(error => console.error('Error fetching online patients:', error));
        } else {
          setOnlinePatients([]);
        }
      })
      .catch(error => console.error('Error toggling online status:', error));
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handlePatientClick = () => {
    navigate('/VideoCall');
  };

  const pieData = {
    labels: ['Consultations', 'Follow-ups', 'Surgeries'],
    datasets: [
      {
        data: [150, 80, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Appointments',
        data: [12, 19, 25, 30, 22, 18],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 bg-gray-100 p-4 flex flex-col justify-between fixed h-full shadow-lg">
        <div className="flex-grow">
          <button
            className={`${isOnline ? 'bg-red-500' : 'bg-green-500'} text-white py-2 px-4 rounded mb-4 w-full`}
            onClick={handleToggleOnline}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
          {onlinePatients.length > 0 && (
            <div className="bg-white p-4 rounded shadow-md mb-4">
              <h2 className="text-lg font-bold mb-2">Online Patients</h2>
              <ul>
                {onlinePatients.map((patient, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                    onClick={handlePatientClick}
                  >
                    {patient.name} - {patient.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded w-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="w-1/4"></div>
      <div className="w-3/4 p-4 ml-1/4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Doctor Information</h1>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Edit</button>
        </div>
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <div className="text-lg font-bold">Name: {doctorInfo.name}</div>
          <div className="text-gray-600">Degree: {doctorInfo.degree}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-md flex items-center justify-center h-64">
            <Pie data={pieData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
          <div className="bg-white p-4 rounded shadow-md flex items-center justify-center h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-md mt-4">
          <div className="text-lg font-bold mb-4">Previous Meetings</div>
          <ul>
            {meetingHistory.map((meeting, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-bold">{meeting.patientName}</div>
                  <div className="text-gray-600">{meeting.type}</div>
                </div>
                <div className="text-gray-600">{meeting.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
