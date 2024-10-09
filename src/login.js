import React, { useState } from 'react';
import supabase from './config/supabaseClient'; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      console.error('Login failed:', error.message);
      return;
    }

    console.log('Login successful:', data);
    // Redirect or handle successful login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-center text-blue-800">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-200`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        
      </div>
    </div>
  );
};

export default Login;
