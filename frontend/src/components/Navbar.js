// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const colors = {
  dark: '#004343',
  light: '#fbf2c4',
  accent: '#c7522a',
  hover: '#b8cdab',
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('staffName');
    navigate('/login');
  };

  return (
    <nav
      className="flex items-center justify-between px-6 py-4"
      style={{ backgroundColor: colors.dark, color: colors.light }}
    >
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')} >
        Staff Dashboard
      </h1>
      <ul className="flex space-x-6">
        <li className="cursor-pointer hover:opacity-80" onClick={() => navigate('/profile')}>Profile</li>
        <li className="cursor-pointer hover:opacity-80" onClick={() => navigate('/vitals')}>Health Vitals</li>
        <li className="cursor-pointer hover:opacity-80" onClick={() => navigate('/room-logs')}>Room Logs</li>
        <li className="cursor-pointer hover:text-[#c7522a]" onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
