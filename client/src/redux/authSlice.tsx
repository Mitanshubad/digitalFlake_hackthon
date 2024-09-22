// // import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// // // Interface for user authentication data
// // interface AuthState {
// //   user: {
// //     email: string;
// //     token: string;
// //   } | null;
// //   loading: boolean;
// //   error: string | null;
// // }

// // // Initial state
// // const initialState: AuthState = {
// //   user: null,
// //   loading: false,
// //   error: null,
// // };

// // // Async thunk for login
// // export const loginAsync = createAsyncThunk(
// //   'auth/login',
// //   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(credentials),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Login failed');
// //       }

// //       const data = await response.json();
// //       // Store token in localStorage
    
// //       return data;
// //     } catch (error) {
// //       return rejectWithValue('Login failed');
// //     }
// //   }
// // );


// // // Async thunk for signup
// // export const signupAsync = createAsyncThunk(
// //   'auth/signup',
// //   async (newUser: { email: string; password: string }, { rejectWithValue }) => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/auth/signup', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(newUser),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         return rejectWithValue(errorData.message || 'Signup failed');
// //       }

// //       return (await response.json()) as { email: string; token: string };
// //     } catch (error: any) {
// //       return rejectWithValue(error.message || 'Signup failed');
// //     }
// //   }
// // );

// // // Auth slice
// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     logout: (state) => {
// //       state.user = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     // Handle login
// //     builder.addCase(loginAsync.pending, (state) => {
// //       state.loading = true;
// //     });
// //     builder.addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ email: string; token: string }>) => {
// //       state.user = action.payload;
// //       state.loading = false;
// //     });
// //     builder.addCase(loginAsync.rejected, (state, action) => {
// //       state.loading = false;
// //       state.error = action.error.message || 'Login failed';
// //     });

// //     // Handle signup
// //     builder.addCase(signupAsync.pending, (state) => {
// //       state.loading = true;
// //     });
// //     builder.addCase(signupAsync.fulfilled, (state, action: PayloadAction<{ email: string; token: string }>) => {
// //       state.user = action.payload;
// //       state.loading = false;
// //     });
// //     builder.addCase(signupAsync.rejected, (state, action) => {
// //       state.loading = false;
// //       state.error = action.error.message || 'Signup failed';
// //     });
// //   },
// // });

// // export const { logout } = authSlice.actions;
// // export default authSlice.reducer;


// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// // Interface for user authentication data
// interface AuthState {
//   user: {
//     email: string;
//     token: string;
//   } | null;
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: AuthState = {
//   user: localStorage.getItem('token')
//     ? { email: '', token: localStorage.getItem('token') as string }
//     : null,
//   loading: false,
//   error: null,
// };

// // Async thunk for login
// export const loginAsync = createAsyncThunk(
//   'auth/login',
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('token', data.token); // Store token in localStorage
//       return data;
//     } catch (error) {
//       return rejectWithValue('Login failed');
//     }
//   }
// );

// // Async thunk for signup
// export const signupAsync = createAsyncThunk(
//   'auth/signup',
//   async (newUser: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newUser),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         return rejectWithValue(errorData.message || 'Signup failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('token', data.token); // Store token in localStorage
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Signup failed');
//     }
//   }
// );

// // Auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem('token'); // Clear token from localStorage
//     },
//   },
//   extraReducers: (builder) => {
//     // Handle login
//     builder.addCase(loginAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ email: string; token: string }>) => {
//       state.user = action.payload;
//       state.loading = false;
//       state.error = null;
//     });
//     builder.addCase(loginAsync.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message || 'Login failed';
//     });

//     // Handle signup
//     builder.addCase(signupAsync.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(signupAsync.fulfilled, (state, action: PayloadAction<{ email: string; token: string }>) => {
//       state.user = action.payload;
//       state.loading = false;
//       state.error = null;
//     });
//     builder.addCase(signupAsync.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message || 'Signup failed';
//     });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Interface for user authentication data
interface AuthState {
  user: {
    email: string;
    token: string;
  } | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: localStorage.getItem('token')
    ? { 
        email: localStorage.getItem('email') || '', 
        token: localStorage.getItem('token') as string 
      }
    : null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email); // Store email along with token
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for signup
export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (newUser: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous error on new request
    });
    builder.addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle signup
    builder.addCase(signupAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupAsync.fulfilled, (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(signupAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
