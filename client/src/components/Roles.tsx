import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchRoles, deleteRoleAsync, updateRoleAsync } from '../redux/rolesSlice';
import AddRole from './AddRole';
import { useTable } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io'; // New icon

const Roles: React.FC = () => {
  const [showAddRole, setShowAddRole] = useState<boolean>(false);
  const [editingRole, setEditingRole] = useState<{ id: string; roleName: string; status: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.roles.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleEditClick = (role: any) => {
    setEditingRole({ id: role.roleId, roleName: role.roleName, status: role.status });
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      dispatch(deleteRoleAsync(id));
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      dispatch(updateRoleAsync(editingRole));
      setEditingRole(null);
    }
  };

  const filteredRoles = roles.filter(role => 
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = filteredRoles.map((role, index) => ({
    id: index + 1,
    roleName: role.roleName,
    status: role.status,
    roleId: role.id,
  }));

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Role Name',
        accessor: 'roleName',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell }: any) => (
          <span className={cell.value === 'Active' ? 'text-green-500' : 'text-red-500'}>
            {cell.value}
          </span>
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }: any) => (
          <div className="flex items-center">
            <button
              className="bg-gray-500 text-white p-2 rounded mr-2"
              onClick={() => handleEditClick(row.original)}
            >
              <FaEdit />
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded"
              onClick={() => handleDeleteClick(row.original.roleId)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="p-4">
      {showAddRole ? (
        <>
          <button
            className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
            onClick={() => setShowAddRole(false)}
          >
            Back to Roles
          </button>
          <AddRole setShowAddRole={setShowAddRole} />
        </>
      ) : editingRole ? (
        <form onSubmit={handleEditSubmit} className="mb-4">
          <input
            type="text"
            value={editingRole.roleName}
            onChange={(e) => setEditingRole({ ...editingRole, roleName: e.target.value })}
            placeholder="Role Name"
            required
            className="border p-2 mr-2"
          />
          <select
            value={editingRole.status}
            onChange={(e) => setEditingRole({ ...editingRole, status: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Role</button>
          <button
            type="button"
            onClick={() => setEditingRole(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <span className="mr-2 flex items-center">
              <IoMdSearch className="text-gray-500" />
              <span className="ml-1">Roles</span>
            </span>
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" p-2 rounded border border-gray-500 flex-grow" // Full remaining width
            />
            <button
              className="bg-[#662671] text-white px-4 py-2 rounded ml-2"
              onClick={() => setShowAddRole(true)}
            >
              Add Role
            </button>
          </div>
          <table
            {...getTableProps()}
            className="table-auto w-full"
            style={{ backgroundColor: '#F2F2F2', borderCollapse: 'collapse' }}
          >
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b-4 border-white" style={{ backgroundColor: '#FFF8B7' }}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="p-2 text-left border-none">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-b-4 border-white" style={{ height: '8px' }}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="p-2 border-none">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Roles;
