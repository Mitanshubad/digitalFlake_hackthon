// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Define interface for Role
// interface Role {
//   id: string;
//   roleName: string;
//   status: 'Active' | 'Inactive';
// }

// // Define state interface
// interface RolesState {
//   roles: Role[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: RolesState = {
//   roles: [],
//   loading: false,
//   error: null,
// };

// // Async thunk to fetch roles
// export const fetchRoles = createAsyncThunk<Role[]>('roles/fetchRoles', async () => {
//   const response = await fetch('http://localhost:5000/api/roles');
//   if (!response.ok) throw new Error('Failed to fetch roles');
//   return await response.json();
// });

// // Async thunk to add a new role
// export const addRoleAsync = createAsyncThunk<Role, Omit<Role, 'id'>>(
//   'roles/addRole',
//   async (newRole, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/roles', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newRole),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         return rejectWithValue(errorData.message || 'Failed to add role');
//       }
//       return await response.json();
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to add role');
//     }
//   }
// );

// // Async thunk to update a role
// export const updateRoleAsync = createAsyncThunk<Role, Role>(
//   'roles/updateRole',
//   async (updatedRole) => {
//     const response = await fetch(`http://localhost:5000/api/roles/${updatedRole.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedRole),
//     });
//     if (!response.ok) throw new Error('Failed to update role');
//     return await response.json();
//   }
// );

// // Async thunk to delete a role
// export const deleteRoleAsync = createAsyncThunk<string, string>(
//   'roles/deleteRole',
//   async (roleId) => {
//     const response = await fetch(`http://localhost:5000/api/roles/${roleId}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) throw new Error('Failed to delete role');
//     return roleId;
//   }
// );

// // Create the slice
// const rolesSlice = createSlice({
//   name: 'roles',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRoles.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRoles.fulfilled, (state, action) => {
//         state.loading = false;
//         state.roles = action.payload;
//       })
//       .addCase(fetchRoles.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch roles';
//       })
//       .addCase(addRoleAsync.fulfilled, (state, action) => {
//         state.roles.push(action.payload);
//       })
//       .addCase(updateRoleAsync.fulfilled, (state, action) => {
//         const index = state.roles.findIndex((role) => role.id === action.payload.id);
//         if (index !== -1) {
//           state.roles[index] = action.payload;
//         }
//       })
//       .addCase(deleteRoleAsync.fulfilled, (state, action) => {
//         state.roles = state.roles.filter((role) => role.id !== action.payload);
//       });
//   },
// });

// // Export the reducer
// export default rolesSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define interface for Role
interface Role {
  id: string;
  roleName: string;
  status: 'Active' | 'Inactive';
}

// Define state interface
interface RolesState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null,
};

// Async thunk to fetch roles
export const fetchRoles = createAsyncThunk<Role[]>(
  'roles/fetchRoles',
  async () => {
    const response = await fetch('http://localhost:5000/api/roles');
    if (!response.ok) throw new Error('Failed to fetch roles');
    return await response.json();
  }
);

// Async thunk to add a new role
export const addRoleAsync = createAsyncThunk<Role, Omit<Role, 'id'>>(
  'roles/addRole',
  async (newRole, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to add role');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add role');
    }
  }
);

// Async thunk to update a role
export const updateRoleAsync = createAsyncThunk<Role, Role>(
  'roles/updateRole',
  async (updatedRole) => {
    const response = await fetch(`http://localhost:5000/api/roles/${updatedRole.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRole),
    });
    if (!response.ok) throw new Error('Failed to update role');
    return await response.json();
  }
);

// Async thunk to delete a role
export const deleteRoleAsync = createAsyncThunk<string, string>(
  'roles/deleteRole',
  async (roleId) => {
    const response = await fetch(`http://localhost:5000/api/roles/${roleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete role');
    return roleId; // Return the ID of the deleted role
  }
);

// Create the slice
const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch roles';
      })
      .addCase(addRoleAsync.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRoleAsync.fulfilled, (state, action) => {
        const index = state.roles.findIndex((role) => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(deleteRoleAsync.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      });
  },
});

// Export the reducer
export default rolesSlice.reducer;
