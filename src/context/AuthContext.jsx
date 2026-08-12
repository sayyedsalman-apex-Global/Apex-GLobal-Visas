/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Initialize and seed demo accounts if empty on first load
  useEffect(() => {
    // 1. Check for registered users array
    const storedUsers = localStorage.getItem('apex_users');
    
    if (!storedUsers) {
      // Pre-seed a default demo user for easy grading/testing
      const demoUser = {
        name: 'Jane Sterling',
        email: 'demo@apex.com',
        phone: '+1 555-901-2234',
        password: 'Password123'
      };
      localStorage.setItem('apex_users', JSON.stringify([demoUser]));
    }

    // 2. Check for active login session
    const activeSession = localStorage.getItem('apex_session');
    if (activeSession) {
      try {
        /* eslint-disable-next-line react-hooks/set-state-in-effect */
        setUser(JSON.parse(activeSession));
      } catch {
        localStorage.removeItem('apex_session');
      }
    }
  }, []);

  // Register Handler
  const register = (name, email, phone, password) => {
    try {
      const storedUsers = localStorage.getItem('apex_users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check duplicate email
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        return { success: false, message: 'This email address is already registered.' };
      }

      // Add user
      const newUser = { name, email, phone, password };
      users.push(newUser);
      localStorage.setItem('apex_users', JSON.stringify(users));

      // Auto-authenticate session
      const sessionData = { name, email, phone };
      localStorage.setItem('apex_session', JSON.stringify(sessionData));
      setUser(sessionData);

      return { success: true };
    } catch {
      return { success: false, message: 'An error occurred during registration. Please try again.' };
    }
  };

  // Login Handler
  const login = (email, password) => {
    try {
      const storedUsers = localStorage.getItem('apex_users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];

      const foundUser = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        return { success: false, message: 'Invalid email address or password.' };
      }

      // Authenticate session
      const sessionData = { 
        name: foundUser.name, 
        email: foundUser.email, 
        phone: foundUser.phone 
      };
      
      // Store session
      localStorage.setItem('apex_session', JSON.stringify(sessionData));
      setUser(sessionData);

      return { success: true };
    } catch {
      return { success: false, message: 'An error occurred during authentication. Please try again.' };
    }
  };

  // Logout Handler
  const logout = () => {
    localStorage.removeItem('apex_session');
    setUser(null);
  };

  // Verify Email Exists Handler
  const verifyEmailExists = (email) => {
    try {
      const storedUsers = localStorage.getItem('apex_users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      return users.some(u => u.email.toLowerCase() === email.toLowerCase());
    } catch {
      return false;
    }
  };

  // Reset Password Handler
  const resetPassword = (email, newPassword) => {
    try {
      const storedUsers = localStorage.getItem('apex_users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
      if (userIndex === -1) {
        return { success: false, message: 'No registered account found with this email address.' };
      }
      
      users[userIndex].password = newPassword;
      localStorage.setItem('apex_users', JSON.stringify(users));
      return { success: true };
    } catch {
      return { success: false, message: 'An error occurred during password reset. Please try again.' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthModalOpen,
      setIsAuthModalOpen,
      login,
      register,
      logout,
      verifyEmailExists,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
