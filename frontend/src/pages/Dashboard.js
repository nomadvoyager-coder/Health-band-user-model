import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchProfile, fetchVitals } from '../services/api';

const palette = {
  base: '#f0daa5',
  card: '#fbf2c4',
  border: '#c7522a',
  textDark: '#004343',
  label: '#008585',
};

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [vitals, setVitals] = useState(null);

  useEffect(() => {
    // Fetch profile
    fetchProfile()
      .then((res) => setProfile(res.data))
      .catch((err) => console.error('Profile fetch error:', err));

    // Fetch latest vitals
    fetchVitals()
      .then((res) => setVitals(res.data))
      .catch((err) => console.error('Vitals fetch error:', err));
  }, []);

  if (!profile || !vitals) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: palette.base }}>
      <Navbar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: palette.textDark }}>
          Welcome, {profile.full_name}!
        </h2>
        <p style={{ color: palette.label }}>
          Role: {profile.role} | Department: {profile.department} | Band: {profile.band_id}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          

          <div className="p-4 rounded-lg shadow" style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
            <h3 className="font-bold" style={{ color: palette.textDark }}>Latest Health Vitals</h3>
            <p style={{ color: palette.label }}>Temperature: {vitals.temperature}°F</p>
            <p style={{ color: palette.label }}>Heart Rate: {vitals.heart_rate} bpm</p>
            <p style={{ color: palette.label }}>SpO2: {vitals.spo2}%</p>
            <p style={{ color: palette.label }}>Status: {vitals.status}</p>
            <p style={{ color: palette.label }}>Room: {vitals.room}</p>
            {vitals.alerts && <p style={{ color: 'red' }}>Alerts: {vitals.alerts}</p>}
          </div>

          <div className="p-4 rounded-lg shadow" style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
            <h3 className="font-bold" style={{ color: palette.textDark }}>Last Checkup</h3>
            <p style={{ color: palette.label }}>{new Date(vitals.last_checkup).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
