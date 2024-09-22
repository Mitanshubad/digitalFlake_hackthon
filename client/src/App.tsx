// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Roles from './components/Roles';
// import Users from "./components/Users";
// import Welcomepage from "./components/Welcomepage";
// import { Provider } from 'react-redux';
// import { store } from './redux/store'; 
// import Login from "./components/Login";
// import PrivateRoute from './components/PrivateRoute';

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   // Check localStorage for token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token); // If token exists, set as authenticated
//   },[localStorage.getItem('token')]); // Empty dependency to run once when the component mounts

//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

//           {/* Private routes for authenticated users */}
//           <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
//             <Route
//               path="/"
//               element={
//                 <div className="flex flex-col h-screen">
//                   <Navbar />
//                   <div className="flex flex-1">
//                     <Sidebar />
//                     <div className="flex-1 p-6 overflow-auto">
//                       <Routes>
//                         <Route path="/" element={<Welcomepage />} />
//                         <Route path="/roles" element={<Roles />} />
//                         <Route path="/users" element={<Users />} />
//                       </Routes>
//                     </div>
//                   </div>
//                 </div>
//               }
//             />
//           </Route>

//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Roles from './components/Roles';
// import Users from "./components/Users";
// import Welcomepage from "./components/Welcomepage";
// import { Provider, useSelector, useDispatch } from 'react-redux';
// import { store, RootState } from './redux/store'; 
// import Login from "./components/Login";
// import PrivateRoute from './components/PrivateRoute';
// import { logout } from './redux/authSlice';

// const App: React.FC = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     // If the token is not valid, ensure the user is logged out
//     if (!localStorage.getItem('token')) {
//       dispatch(logout());
//     }
//   }, [dispatch]);

//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           {/* Public route for login */}
//           <Route path="/login" element={<Login />} />

//           {/* Private routes for authenticated users */}
//           <Route element={<PrivateRoute isAuthenticated={!!user?.token} />}>
//             <Route
//               path="/"
//               element={
//                 <div className="flex flex-col h-screen">
//                   <Navbar />
//                   <div className="flex flex-1">
//                     <Sidebar />
//                     <div className="flex-1 p-6 overflow-auto">
//                       <Routes>
//                         <Route path="/" element={<Welcomepage />} />
//                         <Route path="/roles" element={<Roles />} />
//                         <Route path="/users" element={<Users />} />
//                       </Routes>
//                     </div>
//                   </div>
//                 </div>
//               }
//             />
//           </Route>

//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Roles from './components/Roles';
// import Users from "./components/Users";
// import Welcomepage from "./components/Welcomepage";
// import Login from "./components/Login";
// import PrivateRoute from './components/PrivateRoute';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public route for login */}
      

//         {/* Private routes for authenticated users */}
//         <Route element={<PrivateRoute />}>
//           <Route
//             path="/"
//             element={
//               <div className="flex flex-col h-screen">
//                 <Navbar />
//                 <div className="flex flex-1">
//                   <Sidebar />
//                   <div className="flex-1 p-6 overflow-auto">
//                     <Routes>
//                       <Route path="/" element={<Welcomepage />} />
//                       <Route path="/roles" element={<Roles />} />
//                       <Route path="/users" element={<Users />} />
//                     </Routes>
//                   </div>
//                 </div>
//               </div>
//             }
//           />
//         </Route>
//         <Route path="/login" element={<Login />} />
//         {/* <Route path="*" element={<Navigate to="/login" />} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Roles from './components/Roles';
// import Users from "./components/Users";
// import Welcomepage from "./components/Welcomepage";
// import Login from "./components/Login";
// import PrivateRoute from './components/PrivateRoute';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public route for login */}
//         <Route path="/login" element={<Login />} />

//         {/* Private routes for authenticated users */}
//         <Route element={<PrivateRoute />}>
//           <Route path="/dashboard" element={<Welcomepage />} />
//           <Route
//             path="/dashboard"
//             element={
//               <div className="flex flex-col h-screen">
//                 <Navbar />
//                 <div className="flex flex-1">
//                   <Sidebar />
//                   <div className="flex-1 p-6 overflow-auto">
//                     <Routes>
//                       <Route path="roles" element={<Roles />} />
//                       <Route path="users" element={<Users />} />
//                     </Routes>
//                   </div>
//                 </div>
//               </div>
//             }
//           />
//         </Route>

//         {/* Catch-all route */}
//         {/* <Route path="*" element={<Navigate to="/login" />} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Roles from './components/Roles';
// import Users from "./components/Users";
// import Welcomepage from "./components/Welcomepage";
// import Login from "./components/Login";
// import AddUser from "./components/AddUser";
// import EditUser from "./components/EditUser";

// const MainLayout: React.FC = () => (
//   <div className="flex flex-col h-screen">
//     <Navbar />
//     <div className="flex flex-1">
//       <Sidebar />
//       <div className="flex-1 p-6 overflow-auto">
//         <Routes>
//           <Route path="/" element={<Welcomepage />} />
//           <Route path="/roles" element={<Roles />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/add-user" element={<AddUser />} />
//           <Route path="/edit-user/:id" element={<EditUser />} />
//         </Routes>
//       </div>
//     </div>
//   </div>
// );

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, [localStorage.getItem('token')]);

//   return (
//     <Router>
//       <Routes>
//         {/* Public route for login */}
//         <Route path="/login" element={<Login />} />

//         {/* Conditional rendering based on authentication */}
//         {isAuthenticated && (
//           <Route path="/*" element={<MainLayout />} />)
//         }
       
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Roles from './components/Roles';
import Users from "./components/Users";
import Welcomepage from "./components/Welcomepage";
import Login from "./components/Login";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

const MainLayout: React.FC = () => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Welcomepage />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<Login />} />

        {/* Private routes: Redirect to login if not authenticated */}
        {isAuthenticated ? (
          <Route path="/*" element={<MainLayout />} />
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
