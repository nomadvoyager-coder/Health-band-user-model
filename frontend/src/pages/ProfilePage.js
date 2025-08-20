// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchProfile } from '../services/api';

const palette = {
  base: '#f0daa5',
  card: '#fbf2c4',
  border: '#c7522a',
  textDark: '#004343',
  label: '#008585',
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchProfile();
        setProfile(res.data);
      } catch (e) {
        setErr(e.response?.data?.message || 'Failed to load profile');
      }
    })();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.base }}>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: palette.textDark }}>Profile</h2>
        {err && <p className="text-red-600 mb-4">{err}</p>}
        {!profile ? (
          <p style={{ color: palette.label }}>Loading...</p>
        ) : (
          <div className="p-4 rounded-lg shadow space-y-2"
               style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
            <div><strong style={{ color: palette.textDark }}>Staff ID:</strong> {profile.staff_id}</div>
            <div><strong style={{ color: palette.textDark }}>Name:</strong> {profile.full_name}</div>
            <div><strong style={{ color: palette.textDark }}>Phone:</strong> {profile.phone_number}</div>
            <div><strong style={{ color: palette.textDark }}>Role:</strong> {profile.role}</div>
            <div><strong style={{ color: palette.textDark }}>Department:</strong> {profile.department}</div>
            <div><strong style={{ color: palette.textDark }}>Band ID:</strong> {profile.band_id || '-'}</div>
            <div><strong style={{ color: palette.textDark }}>Notes:</strong> {profile.medical_notes || '-'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
