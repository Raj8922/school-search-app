import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Alert, Tabs, Tab, ListGroup, Modal } from 'react-bootstrap';
import { FaStar, FaHeart, FaMapMarkerAlt, FaRupeeSign, FaGraduationCap, FaUsers, FaClock, FaTrophy, FaCheckCircle, FaPhone, FaEnvelope, FaGlobe, FaBus, FaShieldAlt, FaBook, FaFlask, FaLaptop, FaFutbol, FaMusic, FaPalette, FaCalculator, FaLanguage, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const SchoolProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, favorites } = useAuth();
  const [school, setSchool] = useState(null);
  const [allSchools, setAllSchools] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Load school data
  useEffect(() => {
    import('../data/schools.js').then(module => {
      const schools = module.default || module.allSchools || [];
      setAllSchools(schools);
      const foundSchool = schools.find(s => s.id === parseInt(id));
      setSchool(foundSchool);
    });
  }, [id]);

  const getSchoolScore = (school) => {
    if (!school) return 0;
    
    let score = 70;
    if (school.fees < 3000) score += 15;
    else if (school.fees < 5000) score += 10;
    else if (school.fees < 7000) score += 5;
    
    if (school.affiliation === 'CBSE') score += 10;
    else if (school.affiliation === 'ICSE') score += 8;
    
    if (['Delhi', 'Mumbai', 'Bangalore'].includes(school.city)) score += 5;
    if (school.id <= 10) score += 10;
    
    if (school.rating) {
      score += (school.rating - 3.5) * 10;
    }
    
    return Math.min(100, Math.max(0, Math.round(score * 100) / 100));
  };

  const isFavorite = school ? favorites.includes(school.id) : false;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(school.id);
    } else {
      addFavorite(school.id);
    }
  };

  const getFacilityIcon = (facility) => {
    const iconMap = {
      'Smart Classrooms': FaLaptop,
      'Science Lab': FaFlask,
      'Computer Lab': FaLaptop,
      'Library': FaBook,
      'Sports Ground': FaFutbol,
      'Swimming Pool': FaFutbol,
      'Auditorium': FaMusic,
      'Art Room': FaPalette,
      'Math Lab': FaCalculator,
      'Language Lab': FaLanguage
    };
    return iconMap[facility] || FaCheckCircle;
  };

  if (!school) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <h4>School Not Found</h4>
          <p>The school you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/explore')}>
            <FaArrowLeft className="me-2" />
            Back to Explore
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh'}}>
      <Container className="py-5">
        {/* Back Button */}
        <Button 
          variant="outline-primary" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </Button>

        {/* Hero Section */}
        <Card className="shadow-lg border-0 mb-4">
          <div className="position-relative">
            <img 
              src={school.image} 
              alt={school.name}
              style={{height: '300px', width: '100%', objectFit: 'cover'}}
            />
            <div className="position-absolute top-0 end-0 m-3">
              <Button 
                variant={isFavorite ? "danger" : "outline-danger"}
                size="lg"
                onClick={handleFavoriteToggle}
                style={{borderRadius: '50%', width: '50px', height: '50px'}}
              >
                <FaHeart />
              </Button>
            </div>
            <div className="position-absolute bottom-0 start-0 w-100" style={{
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '2rem 1.5rem 1rem'
            }}>
              <h1 className="text-white fw-bold mb-2">{school.name}</h1>
              <p className="text-white-50 mb-0">
                <FaMapMarkerAlt className="me-2" />
                {school.location}
              </p>
            </div>
          </div>
        </Card>

        <Row className="g-4">
          {/* Main Content */}
          <Col lg={8}>
            <Tabs 
              activeKey={activeTab} 
              onSelect={(k) => setActiveTab(k)}
              className="mb-4"
            >
              <Tab eventKey="overview" title="Overview">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Row className="g-4">
                      <Col md={6}>
                        <div className="text-center p-3 bg-light rounded">
                          <FaRupeeSign size={32} className="text-success mb-2" />
                          <h4 className="fw-bold text-success">₹{school.fees}</h4>
                          <p className="text-muted mb-0">Monthly Fees</p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text-center p-3 bg-light rounded">
                          <FaGraduationCap size={32} className="text-primary mb-2" />
                          <h4 className="fw-bold text-primary">{school.affiliation}</h4>
                          <p className="text-muted mb-0">Board</p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text-center p-3 bg-light rounded">
                          <FaUsers size={32} className="text-info mb-2" />
                          <h4 className="fw-bold text-info">{school.classSize}</h4>
                          <p className="text-muted mb-0">Class Size</p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text-center p-3 bg-light rounded">
                          <FaClock size={32} className="text-warning mb-2" />
                          <h4 className="fw-bold text-warning">{school.established}</h4>
                          <p className="text-muted mb-0">Established</p>
                        </div>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <h5 className="fw-bold mb-3">AI Performance Score</h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="me-3">Overall Score</span>
                        <Badge bg="success" className="ms-auto">{getSchoolScore(school)}%</Badge>
                      </div>
                      <ProgressBar 
                        now={getSchoolScore(school)} 
                        variant={getSchoolScore(school) >= 80 ? 'success' : getSchoolScore(school) >= 60 ? 'warning' : 'danger'}
                        className="mb-3"
                      />
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning me-2" />
                        <span className="fw-bold">{school.rating}</span>
                        <span className="text-muted ms-2">out of 5</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="facilities" title="Facilities">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold mb-4">School Facilities</h5>
                    <Row className="g-3">
                      {school.facilities.map((facility, index) => {
                        const IconComponent = getFacilityIcon(facility);
                        return (
                          <Col md={6} key={index}>
                            <div className="d-flex align-items-center p-3 border rounded">
                              <IconComponent className="text-primary me-3" size={24} />
                              <span className="fw-semibold">{facility}</span>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="achievements" title="Achievements">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold mb-4">School Achievements</h5>
                    <ListGroup variant="flush">
                      {school.achievements.map((achievement, index) => (
                        <ListGroup.Item key={index} className="d-flex align-items-center">
                          <FaTrophy className="text-warning me-3" />
                          <span>{achievement}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="admission" title="Admission">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold mb-4">Admission Information</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <div className="text-center p-4 border rounded">
                          <div className={`badge ${school.admissionOpen ? 'bg-success' : 'bg-danger'} mb-3`}>
                            {school.admissionOpen ? 'Admissions Open' : 'Admissions Closed'}
                          </div>
                          <h6>Application Status</h6>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text-center p-4 border rounded">
                          <FaCalendarAlt className="text-primary mb-3" size={32} />
                          <h6>Last Date</h6>
                          <p className="fw-bold">{school.lastDate}</p>
                        </div>
                      </Col>
                    </Row>
                    
                    <div className="mt-4">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-100"
                        onClick={() => setShowContactModal(true)}
                        disabled={!school.admissionOpen}
                      >
                        <FaPhone className="me-2" />
                        Contact School for Admission
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-gradient-primary text-white">
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary">
                    <FaPhone className="me-2" />
                    Call School
                  </Button>
                  <Button variant="outline-success">
                    <FaEnvelope className="me-2" />
                    Send Email
                  </Button>
                  <Button variant="outline-info">
                    <FaGlobe className="me-2" />
                    Visit Website
                  </Button>
                  <Button variant="outline-warning">
                    <FaBus className="me-2" />
                    Check Transport
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Header>
                <h6 className="mb-0">School Highlights</h6>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaShieldAlt className="text-success me-2" />
                    <span>Safe & Secure Environment</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaGraduationCap className="text-primary me-2" />
                    <span>Experienced Faculty</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaFutbol className="text-warning me-2" />
                    <span>Sports & Activities</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaBook className="text-info me-2" />
                    <span>Modern Curriculum</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Header>
                <h6 className="mb-0">Similar Schools</h6>
              </Card.Header>
              <Card.Body>
                {allSchools
                  .filter(s => s.id !== school.id && s.affiliation === school.affiliation)
                  .slice(0, 3)
                  .map(similarSchool => (
                    <div key={similarSchool.id} className="d-flex align-items-center mb-3 p-2 border rounded">
                      <img 
                        src={similarSchool.image} 
                        alt={similarSchool.name}
                        style={{width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px'}}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">{similarSchool.name}</h6>
                        <p className="mb-0 small text-muted">₹{similarSchool.fees}/mo</p>
                      </div>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => navigate(`/school/${similarSchool.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Contact Modal */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact {school.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img 
              src={school.image} 
              alt={school.name}
              style={{width: '100px', height: '70px', objectFit: 'cover', borderRadius: '8px'}}
              className="mb-3"
            />
            <h5>{school.name}</h5>
            <p className="text-muted">{school.location}</p>
            
            <div className="d-grid gap-3">
              <Button variant="primary">
                <FaPhone className="me-2" />
                Call: +91 98765 43210
              </Button>
              <Button variant="success">
                <FaEnvelope className="me-2" />
                Email: info@{school.name.toLowerCase().replace(/\s+/g, '')}.edu.in
              </Button>
              <Button variant="info">
                <FaGlobe className="me-2" />
                Website: www.{school.name.toLowerCase().replace(/\s+/g, '')}.edu.in
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SchoolProfile;
