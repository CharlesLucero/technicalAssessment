// src/userContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from './config/supabaseClient';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null); // Set user state based on the session
    };

    fetchSession(); // Fetch session on component mount

    // Listen for changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null); // Update user state on auth state change
    });

    return () => {
      subscription.unsubscribe(); // Clean up the subscription on unmount
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
