import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCallPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/medicines')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine);
    setSearchQuery(medicine);
  };

  const handleBackToProfile = () => {
    navigate('/DoctorProfile');
  };

  const handleNavigateToPatientCard = () => {
    fetch('/api/save-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes, selectedMedicine })
    })
      .then(response => response.json())
      .then(() => navigate('/PatientCard', { state: { notes, selectedMedicine } }))
      .catch(error => console.error('Error saving notes:', error));
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="flex-grow bg-gray-100 flex items-center justify-center relative">
        <div className="w-3/4 h-3/4 bg-gray-200 flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-gray-300 flex items-center justify-center">
            <img src="placeholder-icon.png" alt="Video Placeholder" className="w-1/4 h-1/4" />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 w-1/6 h-1/6 bg-gray-200 flex items-center justify-center">
          <img src="placeholder-icon.png" alt="Self View Placeholder" className="w-1/2 h-1/2" />
        </div>
        <button className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full" onClick={handleBackToProfile}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="w-1/4 bg-white p-4 border-l border-gray-300">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <ul className="w-full p-2 border border-gray-300 rounded max-h-40 overflow-y-auto">
              {filteredMedicines.map((medicine, index) => (
                <li
                  key={index}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleMedicineSelect(medicine)}
                >
                  {medicine}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Notes</h2>
          <textarea
            placeholder="Take notes during the call..."
            className="w-full p-2 border border-gray-300 rounded h-32"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-2 border border-gray-300 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleNavigateToPatientCard}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;
