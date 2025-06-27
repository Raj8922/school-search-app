import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SchoolList from './components/SchoolList';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Explore from './pages/Explore';
import AdvancedCompare from './components/AdvancedCompare';
import Admissions from './pages/Admissions';
import SchoolProfile from './pages/SchoolProfile';
import AnimatedBackground from './components/AnimatedBackground';
import AboutSection from './components/AboutSection';
import Login from './pages/Login';
import UserDashboard from './components/UserDashboard';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import './styles/theme.css';

function Home() {
  return (
    <>
      <Hero />
      <SchoolList />
      <AboutSection />
      <Testimonials />
    </>
  );
}

const AppContent = () => {
  const { isDarkMode } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <>
      {!isLoginPage && <AnimatedBackground />}
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <ThemeToggle />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/compare" element={<AdvancedCompare />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/school/:id" element={<SchoolProfile />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;