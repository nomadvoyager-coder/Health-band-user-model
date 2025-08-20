// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import VitalsPage from './pages/VitalsPage';
import RoomLogsPage from './pages/RoomLogsPage';
import ProfilePage from './pages/ProfilePage';

const Private = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route path="/" element={<Private><Dashboard /></Private>} />
        <Route path="/vitals" element={<Private><VitalsPage /></Private>} />
        <Route path="/room-logs" element={<Private><RoomLogsPage /></Private>} />
        <Route path="/profile" element={<Private><ProfilePage /></Private>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
