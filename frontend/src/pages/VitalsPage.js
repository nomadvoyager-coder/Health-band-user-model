// src/pages/VitalsPage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchVitals } from '../services/api';

const palette = {
  base: '#f0daa5',
  card: '#fbf2c4',
  border: '#c7522a',
  textDark: '#004343',
  label: '#008585',
};

const VitalsPage = () => {
  const [vitals, setVitals] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchVitals();
        setVitals(res.data || []);
      } catch (e) {
        setErr(e.response?.data?.message || 'Failed to load vitals');
      }
    })();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.base }}>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: palette.textDark }}>Health Vitals</h2>
        {err && <p className="text-red-600 mb-4">{err}</p>}
        {vitals.length === 0 ? (
          <p style={{ color: palette.label }}>No vitals found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vitals.map((v) => (
              <div key={v.id} className="p-4 rounded-lg shadow"
                   style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
                <div><strong style={{ color: palette.textDark }}>Room:</strong> {v.room || '-'}</div>
                <div><strong style={{ color: palette.textDark }}>Temperature:</strong> {v.temperature} °C</div>
                <div><strong style={{ color: palette.textDark }}>Heart Rate:</strong> {v.heart_rate} bpm</div>
                <div><strong style={{ color: palette.textDark }}>SpO₂:</strong> {v.spo2} %</div>
                <div><strong style={{ color: palette.textDark }}>Status:</strong> {v.status}</div>
                <div><strong style={{ color: palette.textDark }}>Last Checkup:</strong> {new Date(v.last_checkup).toLocaleString()}</div>
                <div><strong style={{ color: palette.textDark }}>Alerts:</strong> {v.alerts || '-'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VitalsPage;
