import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserAsync } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const AddUser: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin');
  const [status, setStatus] = useState('Active');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, mobile, email, role, status);
    dispatch(addUserAsync({ name, mobile, email, role, status }));
    navigate('/users');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 mr-2">
          <option value="Admin">Admin</option>
          <option value="Superadmin">Superadmin</option>
          <option value="Caller">Caller</option>
          <option value="Account">Account</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 mr-2">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="bg-purple-900 text-white px-4 py-2">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
