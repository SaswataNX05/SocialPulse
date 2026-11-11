import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(username, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">Create Account</h2>
        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-4 border border-red-100">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
            >
              <option value="user">Standard User</option>
              <option value="admin">Platform Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-sm transition"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-xs text-slate-500 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}