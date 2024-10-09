// src/index.js
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './userContext'; // Import UserProvider
import Login from './login';
import Home from './Home';
import supabase from './config/supabaseClient';

const Root = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null); // Set user state based on the session
      setLoading(false); // Set loading to false after fetching
    };

    fetchSession(); // Fetch session on component mount

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null); // Update user state on auth state change
    });

    return () => {
      subscription.unsubscribe(); // Clean up the subscription on unmount
    };
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading indicator

  return user ? <Home /> : <Login />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <Root />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
