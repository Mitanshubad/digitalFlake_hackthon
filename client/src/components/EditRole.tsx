import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateRoleAsync } from '../redux/rolesSlice';

interface EditRoleProps {
  roleId: string;
  setEditingRoleId: (id: string | null) => void;
}

const EditRole: React.FC<EditRoleProps> = ({ roleId, setEditingRoleId }) => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) =>
    state.roles.roles.find((r) => r.id === roleId)
  );

  const [roleName, setRoleName] = useState('');
  const [status, setStatus] = useState('Active');

  // Fetch role data on load
  useEffect(() => {
    const fetchRoleById = async () => {
      if (roleId) {
        try {
          const response = await fetch(`http://localhost:5000/api/roles/${roleId}`);
          if (response.ok) {
            const fetchedRole = await response.json();
            setRoleName(fetchedRole.roleName);
            setStatus(fetchedRole.status);
          } else {
            console.error('Failed to fetch role');
          }
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      }
    };

    fetchRoleById();
  }, [roleId]);

  // Update local state when role data is fetched
  useEffect(() => {
    if (role) {
      setRoleName(role.roleName || '');
      setStatus(role.status || 'Active');
    }
  }, [role]);

  const handleSave = () => {
    if (role) {
      dispatch(updateRoleAsync({ ...role, roleName, status }));
      setEditingRoleId(null); // Close the editing mode
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Edit Role</h3>
      <input
        type="text"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        placeholder="Role Name"
        className="border p-2 mb-2 w-full"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 mb-2 w-full" required>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button onClick={handleSave} className="bg-purple-900 text-white px-4 py-2">
        Save
      </button>
    </div>
  );
};

export default EditRole;
