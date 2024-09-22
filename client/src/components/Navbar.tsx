import React, { useState } from 'react';
import { FaUser, FaExclamationTriangle } from 'react-icons/fa'; // Importing the red alert icon

const Navbar: React.FC = () => {
  const [logoutModal, setLogoutModal] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirects to login page after logout
  };

  return (
    <div className="w-full bg-[#662671] text-white py-2 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cce1529effe5d03a0229e9bd9d2268c134cfef430fae3727ec5231f0776fa1b4?placeholderIfAbsent=true&apiKey=abac2ec54bba43e4b308d7b16cc976ef"
          alt="Digitalflake logo"
          className="h-10 rounded opacity-90 mr-2"
        />
        <h1 className="text-2xl font-semibold">Digitalflake</h1>
      </div>

      <div className="flex items-center">
        <button onClick={() => setLogoutModal(true)} className="text-lg flex flex-row">
          <span>logout</span>
          <FaUser className="h-8 w-8 ml-2" />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {logoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-600 h-6 w-6 mr-2" />
              <h2 className="text-lg font-bold text-purple-900">Logout</h2>
            </div>
            <p className="mt-2 text-black">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end">
              <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setLogoutModal(false)}>Cancel</button>
              <button className="bg-purple-900 text-white px-4 py-2 rounded" onClick={confirmLogout}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
