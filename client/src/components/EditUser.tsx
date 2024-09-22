



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../redux/userSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.users.singleUser);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin');
  const [status, setStatus] = useState('Active');

  // Fetch single user data on load
  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (response.ok) {
          const user = await response.json();
          setName(user.name);
          setMobile(user.mobile);
          setEmail(user.email);
          setRole(user.role);
          setStatus(user.status);
        } else {
          console.error('Failed to fetch user');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    console.log("id ",id);
    if (id) {
      fetchUserById();
    }
  }, [id]);

  // Update local state when user data is fetched
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setMobile(user.mobile || '');
      setEmail(user.email || '');
      setRole(user.role || 'Admin');
      setStatus(user.status || 'Active');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
        console.log( id, name, mobile, email, role, status);
      dispatch(updateUserAsync({ id, name, mobile, email, role, status }));
      navigate('/users');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile"
          className="border p-2 mr-2"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mr-2"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 mr-2" required>
          <option value="Admin">Admin</option>
          <option value="Superadmin">Superadmin</option>
          <option value="Caller">Caller</option>
          <option value="Account">Account</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 mr-2" required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="bg-purple-900 text-white px-4 py-2">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
