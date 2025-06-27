import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaBalanceScale, FaSchool, FaSignInAlt, FaUser, FaCog, FaSignOutAlt, FaTachometerAlt, FaTrophy, FaComments, FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import GamificationSystem from './GamificationSystem';
import SocialFeatures from './SocialFeatures';
import './NavbarPopout.css';

const AppNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, favorites } = useAuth();
  const [showGamification, setShowGamification] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock user stats for gamification
  const userStats = {
    schoolsViewed: 15,
    favoritesCount: favorites.length,
    bookmarksCount: 8,
    sharesCount: 3,
    comparisonsCount: 5,
    ratingsCount: 7,
    consecutiveDays: 5,
    helpfulReviews: 2
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4 sticky-top shadow-sm" style={{zIndex: 1030}}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <span style={{fontWeight: 'bold'}}>Ezyschooling</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-popout">
                <FaHome style={{color:'#2563eb'}} /> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/explore" className="nav-popout">
                <FaSearch style={{color:'#2563eb'}} /> Explore
              </Nav.Link>
              <Nav.Link as={Link} to="/compare" className="nav-popout">
                <FaBalanceScale style={{color:'#2563eb'}} /> Compare
              </Nav.Link>
              <Nav.Link as={Link} to="/admissions" className="nav-popout">
                <FaSchool style={{color:'#2563eb'}} /> Admissions
              </Nav.Link>
              {isAuthenticated && (
                <Nav.Link as={Link} to="/dashboard" className="nav-popout">
                  <FaTachometerAlt style={{color:'#2563eb'}} /> Dashboard
                </Nav.Link>
              )}
            </Nav>
            
            <Nav className="ms-auto d-flex align-items-center gap-2">
              {/* Gamification Button */}
              {isAuthenticated && (
                <Button 
                  variant="outline-warning" 
                  size="sm"
                  onClick={() => setShowGamification(true)}
                  className="d-flex align-items-center"
                >
                  <FaTrophy className="me-1" />
                  <span className="d-none d-md-inline">Achievements</span>
                </Button>
              )}

              {/* Social Features Button */}
              {isAuthenticated && (
                <Button 
                  variant="outline-info" 
                  size="sm"
                  onClick={() => setShowSocial(true)}
                  className="d-flex align-items-center"
                >
                  <FaComments className="me-1" />
                  <span className="d-none d-md-inline">Community</span>
                </Button>
              )}

              {/* Favorites Badge */}
              {isAuthenticated && favorites.length > 0 && (
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  className="position-relative"
                >
                  <FaHeart className="me-1" />
                  <span className="d-none d-md-inline">Favorites</span>
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{fontSize: '0.7rem'}}
                  >
                    {favorites.length}
                  </Badge>
                </Button>
              )}
              
              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="user-dropdown">
                    <FaUser className="me-1" />
                    {user?.name || 'User'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/dashboard">
                      <FaTachometerAlt className="me-2" />
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/profile">
                      <FaUser className="me-2" />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/settings">
                      <FaCog className="me-2" />
                      Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="outline-primary" onClick={() => navigate('/login')}>
                  <FaSignInAlt /> Log in
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Gamification Modal */}
      <GamificationSystem 
        show={showGamification}
        onHide={() => setShowGamification(false)}
        userStats={userStats}
      />

      {/* Social Features Modal */}
      <SocialFeatures 
        show={showSocial}
        onHide={() => setShowSocial(false)}
        schoolId={1}
        schoolName="Sample School"
      />
    </>
  );
};

export default AppNavbar;
