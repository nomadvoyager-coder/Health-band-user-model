// src/pages/RoomLogsPage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchRoomLogs } from '../services/api';

const palette = {
  base: '#f0daa5',
  card: '#fbf2c4',
  border: '#c7522a',
  textDark: '#004343',
  label: '#008585',
};

const RoomLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchRoomLogs();
        setLogs(res.data || []);
      } catch (e) {
        setErr(e.response?.data?.message || 'Failed to load room logs');
      }
    })();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.base }}>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: palette.textDark }}>Room Logs</h2>
        {err && <p className="text-red-600 mb-4">{err}</p>}
        {logs.length === 0 ? (
          <p style={{ color: palette.label }}>No room logs found.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((r) => (
              <div key={r.id} className="p-4 rounded-lg shadow flex justify-between"
                   style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
                <div>
                  <div><strong style={{ color: palette.textDark }}>Room:</strong> {r.room || '-'}</div>
                  <div><strong style={{ color: palette.textDark }}>Alerts:</strong> {r.alerts || '-'}</div>
                </div>
                <div style={{ color: palette.label }}>
                  {new Date(r.last_checkup).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomLogsPage;
