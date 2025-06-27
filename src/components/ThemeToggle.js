import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useAuth();

  const handleToggle = () => {
    toggleDarkMode();
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
    // Add transition animation
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
  };

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle; 