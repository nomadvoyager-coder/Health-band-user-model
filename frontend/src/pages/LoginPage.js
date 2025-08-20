// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginStaff } from '../services/api';

const palette = {
  base: '#f0daa5',
  card: '#fbf2c4',
  border: '#c7522a',
  label: '#008585',
  inputBg: '#e5c185',
  textDark: '#004343',
  btnBg: '#74a892',
  btnBorder: '#008585',
  link: '#c7522a',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginStaff(staffId, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('staffName', res.data.full_name || '');
      navigate('/'); // to Dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: palette.base }}>
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm"
           style={{ backgroundColor: palette.card, border: `2px solid ${palette.border}` }}>
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: palette.textDark }}>
          Staff Login
        </h2>

        {error ? <p className="text-red-600 text-center mb-3">{error}</p> : null}

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label htmlFor="staffId" className="block mb-1" style={{ color: palette.label }}>Staff ID</label>
            <input
              id="staffId"
              type="text"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              placeholder="Enter your Staff ID"
              className="w-full px-4 py-2 rounded-lg focus:outline-none"
              style={{
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.inputBg,
                color: palette.textDark,
              }}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1" style={{ color: palette.label }}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg focus:outline-none"
              style={{
                border: `1px solid ${palette.border}`,
                backgroundColor: palette.inputBg,
                color: palette.textDark,
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-medium"
            style={{ backgroundColor: palette.btnBg, color: palette.card, border: `1px solid ${palette.btnBorder}` }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4" style={{ color: palette.textDark }}>
          Forgot password?{' '}
          <a href="/forgotpassword" style={{ color: palette.link, fontWeight: 'bold' }}>Connect to Admin</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
