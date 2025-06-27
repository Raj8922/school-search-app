import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Carousel, Form, InputGroup, Alert, ProgressBar } from 'react-bootstrap';
import { FaSearch, FaStar, FaHeart, FaMapMarkerAlt, FaGraduationCap, FaUsers, FaChartLine, FaAward, FaPlay, FaArrowRight, FaQuoteLeft, FaCheckCircle, FaRocket, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SchoolCard from '../components/SchoolCard';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [featuredSchools, setFeaturedSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Load schools data from the data file
    import('../data/schools.js').then(module => {
      const allSchools = module.default || module.allSchools || [];
      // Take the first 6 schools for the home page
      setSchools(allSchools.slice(0, 6));
      // Take schools 7-12 for featured section
      setFeaturedSchools(allSchools.slice(6, 12));
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        const results = schools.filter(school => 
          school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 1000);
    }
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    navigate(`/explore?search=${encodeURIComponent(query)}`);
  };

  const stats = [
    { icon: FaUsers, number: '500+', label: 'Schools Listed', color: 'primary' },
    { icon: FaStar, number: '10K+', label: 'Happy Parents', color: 'warning' },
    { icon: FaAward, number: '95%', label: 'Success Rate', color: 'success' },
    { icon: FaChartLine, number: '24/7', label: 'Support Available', color: 'info' }
  ];

  const features = [
    {
      icon: FaRocket,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized school suggestions based on your preferences and requirements.',
      color: 'primary'
    },
    {
      icon: FaLightbulb,
      title: 'Smart Comparison Tools',
      description: 'Compare multiple schools side-by-side with detailed insights and analytics.',
      color: 'warning'
    },
    {
      icon: FaShieldAlt,
      title: 'Verified Information',
      description: 'All school data is verified and updated regularly for accuracy.',
      color: 'success'
    },
    {
      icon: FaUsers,
      title: 'Community Reviews',
      description: 'Read authentic reviews from parents and students who know the schools.',
      color: 'info'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Parent',
      content: 'Found the perfect school for my daughter using the AI recommendations. The comparison tools made it so easy to make the right choice!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Parent',
      content: 'The detailed school profiles and community reviews helped us make an informed decision. Highly recommended!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Anita Patel',
      role: 'Parent',
      content: 'Amazing platform! The search filters and comparison features saved us hours of research.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const quickSearches = [
    { label: 'CBSE Schools', query: 'CBSE' },
    { label: 'International Schools', query: 'International' },
    { label: 'Montessori', query: 'Montessori' },
    { label: 'Boarding Schools', query: 'Boarding' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <Container className="hero-content">
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="text-center text-lg-start">
              <div className="hero-text">
                <Badge bg="primary" className="hero-badge mb-3">
                  <FaRocket className="me-2" />
                  AI-Powered School Search
                </Badge>
                <h1 className="hero-title mb-4">
                  Find the Perfect School for Your Child
                </h1>
                <p className="hero-subtitle mb-5">
                  Discover, compare, and choose from 500+ verified schools with our intelligent recommendation system.
                </p>
                
                {/* Search Form */}
                <Form onSubmit={handleSearch} className="search-form mb-4">
                  <InputGroup size="lg" className="search-input-group">
                    <InputGroup.Text className="search-icon">
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search schools by name, location, or board..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="search-button"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                          Searching...
                        </>
                      ) : (
                        <>
                          <FaSearch className="me-2" />
                          Search
                        </>
                      )}
                    </Button>
                  </InputGroup>
                </Form>

                {/* Quick Search Buttons */}
                <div className="quick-search-buttons">
                  <p className="text-white-50 mb-3">Popular searches:</p>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {quickSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline-light"
                        size="sm"
                        className="quick-search-btn"
                        onClick={() => handleQuickSearch(search.query)}
                      >
                        {search.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-visual">
                <div className="floating-card card-1">
                  <FaStar className="text-warning" />
                  <span>Top Rated</span>
                </div>
                <div className="floating-card card-2">
                  <FaHeart className="text-danger" />
                  <span>Most Loved</span>
                </div>
                <div className="floating-card card-3">
                  <FaAward className="text-success" />
                  <span>Best Choice</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col md={3} sm={6} key={index}>
                <Card className="stat-card text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className={`stat-icon stat-icon-${stat.color} mb-3`}>
                      <stat.icon size={32} />
                    </div>
                    <h3 className="stat-number mb-2">{stat.number}</h3>
                    <p className="stat-label text-muted mb-0">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="section-title mb-3">Why Choose Our Platform?</h2>
              <p className="section-subtitle text-muted">
                We provide the most comprehensive and intelligent school search experience
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col lg={3} md={6} key={index}>
                <Card className="feature-card h-100 border-0 shadow-sm">
                  <Card.Body className="p-4 text-center">
                    <div className={`feature-icon feature-icon-${feature.color} mb-3`}>
                      <feature.icon size={40} />
                    </div>
                    <h5 className="feature-title mb-3">{feature.title}</h5>
                    <p className="feature-description text-muted mb-0">
                      {feature.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Schools Section */}
      <section className="featured-schools-section py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="section-title mb-3">Featured Schools</h2>
              <p className="section-subtitle text-muted">
                Discover top-rated schools recommended by our AI system
              </p>
            </Col>
          </Row>
          
          <Carousel 
            activeIndex={activeIndex} 
            onSelect={setActiveIndex}
            className="featured-carousel"
            indicators={false}
          >
            {[0, 1].map((slideIndex) => (
              <Carousel.Item key={slideIndex}>
                <Row className="g-4">
                  {featuredSchools.slice(slideIndex * 3, (slideIndex + 1) * 3).map(school => (
                    <Col lg={4} md={6} key={school.id}>
                      <SchoolCard school={school} />
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
          
          <div className="text-center mt-4">
            <Button 
              variant="outline-primary" 
              size="lg" 
              className="rounded-pill px-4"
              onClick={() => navigate('/explore')}
            >
              View All Schools
              <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="section-title mb-3">What Parents Say</h2>
              <p className="section-subtitle text-muted">
                Real experiences from parents who found their perfect school
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="testimonial-card h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="testimonial-header mb-3">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="testimonial-avatar"
                      />
                      <div className="testimonial-info">
                        <h6 className="testimonial-name mb-1">{testimonial.name}</h6>
                        <p className="testimonial-role text-muted mb-2">{testimonial.role}</p>
                        <div className="testimonial-rating">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar key={i} className="text-warning" size={14} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-content">
                      <FaQuoteLeft className="testimonial-quote text-muted mb-2" />
                      <p className="testimonial-text">{testimonial.content}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <div className="cta-content">
                <h2 className="cta-title mb-4">Ready to Find Your Perfect School?</h2>
                <p className="cta-subtitle mb-4">
                  Join thousands of parents who have already found their ideal school with our platform.
                </p>
                <div className="cta-buttons">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="rounded-pill px-4 me-3 mb-2"
                    onClick={() => navigate('/explore')}
                  >
                    <FaSearch className="me-2" />
                    Start Searching
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="lg" 
                    className="rounded-pill px-4 mb-2"
                    onClick={() => navigate('/compare')}
                  >
                    <FaChartLine className="me-2" />
                    Compare Schools
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Results Modal */}
      {searchResults.length > 0 && (
        <div className="search-results-overlay">
          <div className="search-results-modal">
            <div className="search-results-header">
              <h5>Search Results</h5>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setSearchResults([])}
              >
                ×
              </Button>
            </div>
            <div className="search-results-content">
              {searchResults.map(school => (
                <Card key={school.id} className="search-result-card mb-3">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center">
                      <img 
                        src={school.image} 
                        alt={school.name}
                        className="search-result-image me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{school.name}</h6>
                        <p className="text-muted mb-1">
                          <FaMapMarkerAlt className="me-1" />
                          {school.location}
                        </p>
                        <Badge bg="primary" className="me-2">
                          {school.affiliation}
                        </Badge>
                        <span className="text-primary fw-bold">
                          ₹{school.fees.toLocaleString()}/mo
                        </span>
                      </div>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => navigate(`/school/${school.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;