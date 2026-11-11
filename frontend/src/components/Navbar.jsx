import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
          SocialPulse
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span className="font-semibold">{user.username}</span>
                {user.role === 'admin' && (
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full font-medium">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="space-x-3">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                Log In
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}