import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaStar, FaHeart, FaSearch, FaChartLine, FaLightbulb, FaCog, FaUser, FaHistory, FaBookmark, FaEye, FaMapMarkerAlt, FaGraduationCap, FaClock, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRecommendedSchools, getPersonalizedInsights, generateSchoolComparison } from '../utils/recommendationEngine';
import SchoolCard from './SchoolCard';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { 
    user, 
    profile, 
    preferences, 
    savedSearches, 
    favorites, 
    searchHistory,
    updatePreferences,
    addSavedSearch,
    removeSavedSearch,
    addFavorite,
    removeFavorite
  } = useAuth();

  const [allSchools, setAllSchools] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Load school data
  useEffect(() => {
    // Import school data dynamically
    import('../data/schools.js').then(module => {
      setAllSchools(module.default || module.allSchools || []);
    });
  }, []);

  // Generate recommendations when preferences change
  useEffect(() => {
    if (allSchools.length > 0 && preferences) {
      const recs = getRecommendedSchools(allSchools, preferences, 6);
      setRecommendations(recs);
      
      const insightsData = getPersonalizedInsights(recs, preferences);
      setInsights(insightsData);
    }
  }, [allSchools, preferences]);

  const getCompletionPercentage = () => {
    let completed = 0;
    const total = 5;
    
    if (preferences.location) completed++;
    if (preferences.budget.min > 0 || preferences.budget.max < 10000) completed++;
    if (preferences.preferredAffiliations.length > 0) completed++;
    if (preferences.childAge) completed++;
    if (preferences.interests.length > 0) completed++;
    
    return (completed / total) * 100;
  };

  const handleSaveSearch = () => {
    const currentSearch = {
      city: preferences.location || 'All',
      affiliation: preferences.preferredAffiliations.join(', ') || 'All',
      budget: `${preferences.budget.min}-${preferences.budget.max}`,
      timestamp: new Date().toISOString()
    };
    addSavedSearch(currentSearch);
  };

  const getFavoriteSchools = () => {
    return allSchools.filter(school => favorites.includes(school.id));
  };

  const handleViewDetails = (schoolId) => {
    navigate(`/school/${schoolId}`);
  };

  const handleToggleFavorite = (schoolId) => {
    if (favorites.includes(schoolId)) {
      removeFavorite(schoolId);
    } else {
      addFavorite(schoolId);
    }
  };

  const renderOverview = () => (
    <Row className="g-4">
      {/* Welcome Card */}
      <Col lg={12}>
        <Card className="welcome-card shadow-lg border-0">
          <Card.Body className="p-5 text-center">
            <div className="welcome-icon mb-4">
              <FaUser size={60} className="text-white" />
            </div>
            <h2 className="text-white fw-bold mb-3">Welcome back, {user?.name || 'User'}!</h2>
            <p className="text-white-50 mb-0 fs-5">
              Your personalized dashboard is ready with AI-powered insights and recommendations.
            </p>
          </Card.Body>
        </Card>
      </Col>

      {/* Profile Completion */}
      <Col lg={4}>
        <Card className="h-100 shadow-sm border-0 profile-card">
          <Card.Body className="text-center p-4">
            <div className="profile-icon mb-3">
              <FaUser size={40} className="text-primary" />
            </div>
            <h5 className="fw-bold mb-3">Profile Completion</h5>
            <div className="progress-container mb-3">
              <ProgressBar 
                now={getCompletionPercentage()} 
                className="custom-progress"
                variant={getCompletionPercentage() >= 80 ? 'success' : getCompletionPercentage() >= 50 ? 'warning' : 'danger'}
              />
            </div>
            <p className="text-muted mb-3 fw-semibold">
              {getCompletionPercentage().toFixed(0)}% Complete
            </p>
            <Button variant="primary" size="sm" className="rounded-pill px-4">
              Complete Profile
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Quick Stats */}
      <Col lg={8}>
        <Row className="g-3">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 stats-card">
              <Card.Body className="p-4">
                <div className="stats-icon mb-3">
                  <FaHeart className="text-danger" size={32} />
                </div>
                <h3 className="fw-bold text-primary mb-2">{favorites.length}</h3>
                <p className="text-muted mb-0 fw-semibold">Favorite Schools</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 stats-card">
              <Card.Body className="p-4">
                <div className="stats-icon mb-3">
                  <FaSearch className="text-primary" size={32} />
                </div>
                <h3 className="fw-bold text-primary mb-2">{savedSearches.length}</h3>
                <p className="text-muted mb-0 fw-semibold">Saved Searches</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 stats-card">
              <Card.Body className="p-4">
                <div className="stats-icon mb-3">
                  <FaHistory className="text-info" size={32} />
                </div>
                <h3 className="fw-bold text-primary mb-2">{searchHistory.length}</h3>
                <p className="text-muted mb-0 fw-semibold">Recent Searches</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>

      {/* AI Insights */}
      {insights.length > 0 && (
        <Col lg={12}>
          <Card className="shadow-sm border-0 insights-card">
            <Card.Header className="insights-header">
              <FaLightbulb className="me-2" />
              AI Insights & Recommendations
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                {insights.map((insight, index) => (
                  <Col md={6} lg={4} key={index}>
                    <Alert variant="info" className="insight-alert border-0">
                      <FaLightbulb className="me-2" />
                      {insight}
                    </Alert>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );

  const renderRecommendations = () => (
    <div>
      <div className="recommendations-header mb-4">
        <div className="d-flex align-items-center">
          <div className="recommendations-icon me-3">
            <FaStar className="text-warning" size={24} />
          </div>
          <div>
            <h4 className="fw-bold mb-1">AI Recommendations</h4>
            <p className="text-muted mb-0">Personalized schools based on your preferences</p>
          </div>
        </div>
        <Button variant="primary" size="sm" className="rounded-pill px-4" onClick={handleSaveSearch}>
          <FaBookmark className="me-2" /> Save Current Search
        </Button>
      </div>
      
      {recommendations.length > 0 ? (
        <Row className="g-4">
          {recommendations.map((school, index) => (
            <Col lg={4} md={6} key={school.id}>
              <Card className="h-100 shadow-sm border-0 recommendation-card">
                {index < 3 && (
                  <div className="top-badge">
                    <Badge bg="warning" className="top-badge-content">
                      <FaTrophy className="me-1" />
                      Top {index + 1}
                    </Badge>
                  </div>
                )}
                <div className="score-badge">
                  <Badge bg="success" className="score-badge-content">
                    {Math.round(school.score * 100)}% Match
                  </Badge>
                </div>
                <div className="school-image-container">
                  <img 
                    src={school.image} 
                    alt={school.name}
                    className="school-image"
                  />
                  <div className="image-overlay">
                    <Button 
                      variant={favorites.includes(school.id) ? "danger" : "outline-light"} 
                      size="sm"
                      className="favorite-btn"
                      onClick={() => handleToggleFavorite(school.id)}
                    >
                      <FaHeart />
                    </Button>
                  </div>
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-2 school-title">{school.name}</Card.Title>
                  <div className="school-location mb-3">
                    <FaMapMarkerAlt className="text-muted me-2" />
                    <span className="text-muted">{school.location}</span>
                  </div>
                  <div className="school-badges mb-3">
                    <Badge bg="primary" className="me-2">
                      <FaGraduationCap className="me-1" />
                      {school.affiliation}
                    </Badge>
                    <Badge bg="success" className="fw-bold">
                      ₹{school.fees.toLocaleString()}/mo
                    </Badge>
                  </div>
                  {school.matchReasons && school.matchReasons.length > 0 && (
                    <div className="match-reasons mb-3">
                      <small className="text-muted fw-semibold">Why this school matches:</small>
                      <ul className="list-unstyled mt-2">
                        {school.matchReasons.slice(0, 2).map((reason, idx) => (
                          <li key={idx} className="match-reason-item">
                            <FaStar className="text-warning me-2" size={12} />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-100 rounded-pill"
                    onClick={() => handleViewDetails(school.id)}
                  >
                    <FaEye className="me-2" />
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center p-5">
            <FaLightbulb className="text-muted mb-3" size={48} />
            <h5 className="text-muted mb-2">No Recommendations Yet</h5>
            <p className="text-muted mb-3">
              Complete your preferences to get personalized school recommendations!
            </p>
            <Button variant="primary" className="rounded-pill px-4">
              Complete Profile
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );

  const renderFavorites = () => (
    <div>
      <div className="favorites-header mb-4">
        <div className="d-flex align-items-center">
          <div className="favorites-icon me-3">
            <FaHeart className="text-danger" size={24} />
          </div>
          <div>
            <h4 className="fw-bold mb-1">My Favorite Schools</h4>
            <p className="text-muted mb-0">{favorites.length} schools saved to your favorites</p>
          </div>
        </div>
      </div>
      
      {favorites.length > 0 ? (
        <Row className="g-4">
          {getFavoriteSchools().map(school => (
            <Col lg={4} md={6} key={school.id}>
              <SchoolCard school={school} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center p-5">
            <FaHeart className="text-muted mb-3" size={48} />
            <h5 className="text-muted mb-2">No Favorite Schools Yet</h5>
            <p className="text-muted mb-3">
              You haven't saved any schools to favorites yet. Start exploring schools and click the heart icon to save them!
            </p>
            <Button variant="primary" className="rounded-pill px-4" onClick={() => navigate('/explore')}>
              Explore Schools
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );

  const renderSavedSearches = () => (
    <div>
      <div className="searches-header mb-4">
        <div className="d-flex align-items-center">
          <div className="searches-icon me-3">
            <FaBookmark className="text-primary" size={24} />
          </div>
          <div>
            <h4 className="fw-bold mb-1">Saved Searches</h4>
            <p className="text-muted mb-0">{savedSearches.length} searches saved for quick access</p>
          </div>
        </div>
      </div>
      
      {savedSearches.length > 0 ? (
        <Row className="g-3">
          {savedSearches.map((search, index) => (
            <Col md={6} lg={4} key={search.id || index}>
              <Card className="shadow-sm border-0 search-card">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="search-number">
                      <Badge bg="primary" className="rounded-pill px-3 py-2">
                        Search #{index + 1}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      className="rounded-circle"
                      onClick={() => removeSavedSearch(search.id)}
                    >
                      ×
                    </Button>
                  </div>
                  <div className="search-details">
                    <div className="search-item mb-2">
                      <FaMapMarkerAlt className="text-muted me-2" />
                      <span className="fw-semibold">City:</span> {search.city}
                    </div>
                    <div className="search-item mb-2">
                      <FaGraduationCap className="text-muted me-2" />
                      <span className="fw-semibold">Board:</span> {search.affiliation}
                    </div>
                    <div className="search-item mb-3">
                      <FaChartLine className="text-muted me-2" />
                      <span className="fw-semibold">Budget:</span> ₹{search.budget}
                    </div>
                    <div className="search-timestamp">
                      <FaClock className="text-muted me-2" />
                      <small className="text-muted">{new Date(search.timestamp).toLocaleDateString()}</small>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="w-100 rounded-pill mt-3">
                    <FaSearch className="me-2" /> Run Search
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center p-5">
            <FaBookmark className="text-muted mb-3" size={48} />
            <h5 className="text-muted mb-2">No Saved Searches Yet</h5>
            <p className="text-muted mb-3">
              Save your search criteria for quick access later!
            </p>
            <Button variant="primary" className="rounded-pill px-4" onClick={() => navigate('/explore')}>
              Start Searching
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );

  return (
    <Container className="py-5 dashboard-container">
      <Tabs 
        activeKey={activeTab} 
        onSelect={(k) => setActiveTab(k)}
        className="mb-4 custom-tabs"
      >
        <Tab eventKey="overview" title={
          <span className="tab-title">
            <FaUser className="me-2" />
            Overview
          </span>
        }>
          {renderOverview()}
        </Tab>
        <Tab eventKey="recommendations" title={
          <span className="tab-title">
            <FaStar className="me-2" />
            AI Recommendations
          </span>
        }>
          {renderRecommendations()}
        </Tab>
        <Tab eventKey="favorites" title={
          <span className="tab-title">
            <FaHeart className="me-2" />
            Favorites
          </span>
        }>
          {renderFavorites()}
        </Tab>
        <Tab eventKey="searches" title={
          <span className="tab-title">
            <FaBookmark className="me-2" />
            Saved Searches
          </span>
        }>
          {renderSavedSearches()}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboard; 