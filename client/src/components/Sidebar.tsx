import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserAlt, FaUserShield } from 'react-icons/fa';
import { FiChevronRight, FiMenu, FiX } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="p-4 text-gray-600 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 left-0 w-64 bg-gray-100 h-screen p-4 shadow-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <nav className="flex flex-col space-y-2">
          {/* Home link */}
          <Link
            to="/"
            className={`flex items-center space-x-4 p-3 rounded-md ${
              location.pathname === '/'
                ? 'bg-yellow-200 text-black'
                : 'text-gray-600 hover:bg-gray-200 hover:text-black'
            }`}
          >
            <FaHome className="text-xl" />
            <span className="text-lg font-medium">Home</span>
            <FiChevronRight className="ml-auto" />
          </Link>


        {/* Users link */}
          <Link
            to="/users"
            className={`flex items-center space-x-4 p-3 rounded-md ${
              location.pathname === '/users'
                ? 'bg-yellow-200 text-black'
                : 'text-gray-600 hover:bg-gray-200 hover:text-black'
            }`}
          >
            <FaUserAlt className="text-xl" />
            <span className="text-lg font-medium">Users</span>
            <FiChevronRight className="ml-auto" />
          </Link>
          {/* Roles link */}
          <Link
            to="/roles"
            className={`flex items-center space-x-4 p-3 rounded-md ${
              location.pathname === '/roles'
                ? 'bg-yellow-200 text-black'
                : 'text-gray-600 hover:bg-gray-200 hover:text-black'
            }`}
          >
            <FaUserShield className="text-xl" />
            <span className="text-lg font-medium">Roles</span>
            <FiChevronRight className="ml-auto" />
          </Link>

         
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
