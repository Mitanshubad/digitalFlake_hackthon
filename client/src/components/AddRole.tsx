import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoleAsync } from "../redux/rolesSlice";

interface AddRoleProps {
  setShowAddRole: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRole: React.FC<AddRoleProps> = ({ setShowAddRole }) => {
  const [roleName, setRoleName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addRoleAsync({ roleName, status }));
    setShowAddRole(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Role Name</label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="border p-2"
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
          className="border p-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-[#662671] text-white px-4 py-2 mt-4 rounded" // Using Tailwind CSS with inline color
      >
        Add Role
      </button>
    </form>
  );
};

export default AddRole;
