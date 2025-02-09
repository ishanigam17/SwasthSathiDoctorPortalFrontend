import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DoctorPortal = () => {
  const doctorInfo = {
    name: 'Dr. Jane Doe',
    degree: 'MD, Cardiology'
  };

  const [onlinePatients, setOnlinePatients] = useState([]);
  const navigate = useNavigate();

  const handleToggleOnline = () => {
    if (onlinePatients.length > 0) {
      setOnlinePatients([]); // Go offline
    } else {
      // Simulate fetching online patients
      const patients = [
        { name: 'Patient 1', status: 'Online' },
        { name: 'Patient 2', status: 'Online' },
        { name: 'Patient 3', status: 'Online' },
      ];
      setOnlinePatients(patients); // Go online
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handlePatientClick = () => {
    navigate('/VideoCall');
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const barData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 bg-gray-100 p-4 flex flex-col justify-between fixed h-full">
        <div className="flex-grow">
          <button
            className={`${onlinePatients.length > 0 ? 'bg-red-500' : 'bg-green-500'} text-white py-2 px-4 rounded mb-4 w-full`}
            onClick={handleToggleOnline}
          >
            {onlinePatients.length > 0 ? 'Go Offline' : 'Go Online'}
          </button>
          {onlinePatients.length > 0 && (
            <div className="bg-white p-4 rounded shadow-md mb-4">
              <h2 className="text-lg font-bold mb-2">Online Patients</h2>
              <ul>
                {onlinePatients.map((patient, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-300 cursor-pointer"
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
          <div className="bg-white p-4 rounded shadow-md">
            <div className="text-center text-lg font-bold mb-4">Pie Chart</div>
            <Pie data={pieData} />
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <div className="text-center text-lg font-bold mb-4">Bar Chart</div>
            <Bar data={barData} />
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-md mt-4">
          <div className="text-lg font-bold mb-4">Previous Meetings</div>
          <ul>
            <li className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-bold">John Doe</div>
                <div className="text-gray-600">Check-up</div>
              </div>
              <div className="text-gray-600">2023-05-15 10:00 AM</div>
            </li>
            <li className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-bold">Jane Smith</div>
                <div className="text-gray-600">Consultation</div>
              </div>
              <div className="text-gray-600">2023-05-14 2:30 PM</div>
            </li>
            <li className="flex justify-between items-center py-2">
              <div>
                <div className="font-bold">Bob Johnson</div>
                <div className="text-gray-600">Follow-up</div>
              </div>
              <div className="text-gray-600">2023-05-13 11:15 AM</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
