


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUserAsync } from '../redux/userSlice';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons for edit and delete
import { IoMdSearch } from 'react-icons/io'; // Search icon

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserAsync(userToDelete));
    }
    setDeleteModal(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm)
  );

  const data = filteredUsers.map((user, ind) => ({
    id: ind + 1,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    role: user.role,
    status: user.status,
    userId: user.id
  }));

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role',
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
            <Link to={`/edit-user/${row.original.userId}`} className="bg-gray-500 text-white p-2 rounded mr-2">
              <FaEdit />
            </Link>
            <button
              className="bg-gray-500 text-white p-2 rounded"
              onClick={() => handleDelete(row.original.userId)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      {/* Flex container for USER, Search, and Add New */}
      <div className="flex justify-between items-center mb-6">
        <h1 className=" ">Users</h1>
        
        {/* Search Input */}
        <div className="flex items-center border rounded-md p-2 w-full max-w-lg">
  <IoMdSearch className="text-xl mr-2" />
  <input
    type="text"
    placeholder="Search by name, email, or mobile"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="flex-grow  outline-none" // Added flex-grow to make input take all available space
  />
</div>


        <Link to="/add-user" className="bg-[#662671] text-white px-4 py-2 rounded">Add New</Link>
      </div>

      <table
        {...getTableProps()}
        className="table-auto w-full border-collapse"
        style={{ backgroundColor: '#F2F2F2' }} // Background color applied to the table
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="border-b-4 border-white"
              style={{ backgroundColor: '#FFF8B7' }} // Background for the header row
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-2 text-left border-none" // Padding and text alignment
                  style={{ padding: '8px' }} // Additional styling if needed
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="border-b-4 border-white"
                style={{ height: '8px' }} // Row height
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-2 border-none" // Padding and no border
                    style={{ padding: '8px' }} // Additional styling for cell
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <div className="text-center py-4">No users found.</div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold text-purple-600">Delete User</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end">
              <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setDeleteModal(false)}>Cancel</button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
