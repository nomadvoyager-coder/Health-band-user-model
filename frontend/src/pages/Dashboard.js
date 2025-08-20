// src/pages/Dashboard.js
import React from 'react';
import Navbar from '../components/Navbar';

const palette = {
  base: '#f0daa5',
  card: '#fbf2c4',
  border: '#c7522a',
  textDark: '#004343',
  label: '#008585',
};

const Dashboard = () => {
  const staffName = localStorage.getItem('staffName') || 'Staff';

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: palette.base }}>
      <Navbar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: palette.textDark }}>
          Welcome, {staffName}!
        </h2>
        <p style={{ color: palette.label }}>
          Select an option from the navbar to view your profile, health vitals, or room logs.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg shadow" style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
            <h3 className="font-bold" style={{ color: palette.textDark }}>Profile Summary</h3>
            <p style={{ color: palette.label }}>View and update your profile information.</p>
          </div>

          <div className="p-4 rounded-lg shadow" style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
            <h3 className="font-bold" style={{ color: palette.textDark }}>Health Vitals</h3>
            <p style={{ color: palette.label }}>Check your assigned patients’ health vitals.</p>
          </div>

          <div className="p-4 rounded-lg shadow" style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
            <h3 className="font-bold" style={{ color: palette.textDark }}>Room Logs</h3>
            <p style={{ color: palette.label }}>See the logs for patient rooms and activities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
