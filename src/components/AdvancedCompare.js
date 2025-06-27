import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Alert, Table, Modal, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FaStar, FaHeart, FaChartBar, FaBalanceScale, FaTrophy, FaRupeeSign, FaMapMarkerAlt, FaGraduationCap, FaUsers, FaClock, FaPlus, FaTrash } from 'react-icons/fa';
import { generateSchoolComparison } from '../utils/recommendationEngine';

const AdvancedCompare = () => {
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [showSchoolSelector, setShowSchoolSelector] = useState(false);
  const [comparison, setComparison] = useState(null);
  const [mode, setMode] = useState('simple'); // 'simple' or 'advanced'

  // Load school data
  useEffect(() => {
    import('../data/schools.js').then(module => {
      setAllSchools(module.default || module.allSchools || []);
    });
  }, []);

  // Generate comparison when selected schools change
  useEffect(() => {
    if (selectedSchools.length >= 2) {
      const comparisonData = generateSchoolComparison(selectedSchools);
      setComparison(comparisonData);
      
      // Auto-switch to advanced mode if more than 2 schools
      if (selectedSchools.length > 2 && mode === 'simple') {
        setMode('advanced');
      }
    }
  }, [selectedSchools, mode]);

  // Auto-switch mode based on number of schools
  useEffect(() => {
    if (selectedSchools.length > 2 && mode === 'simple') {
      setMode('advanced');
    } else if (selectedSchools.length === 2 && mode === 'advanced') {
      setMode('simple');
    }
  }, [selectedSchools.length, mode]);

  const handleAddSchool = (school) => {
    if (selectedSchools.length < 5 && !selectedSchools.find(s => s.id === school.id)) {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  const handleRemoveSchool = (schoolId) => {
    setSelectedSchools(selectedSchools.filter(s => s.id !== schoolId));
  };

  const getSchoolScore = (school) => {
    // If school already has a score, use it
    if (school.score) {
      return Math.round(school.score * 100) / 100;
    }
    
    // Calculate score based on various factors
    let score = 70; // Base score
    
    // Fee factor (lower fees = higher score for affordability)
    if (school.fees < 3000) score += 15;
    else if (school.fees < 5000) score += 10;
    else if (school.fees < 7000) score += 5;
    
    // Affiliation factor
    if (school.affiliation === 'CBSE') score += 10;
    else if (school.affiliation === 'ICSE') score += 8;
    
    // Location factor (premium locations)
    if (['Delhi', 'Mumbai', 'Bangalore'].includes(school.city)) score += 5;
    
    // Top schools bonus
    if (school.id <= 10) score += 10;
    
    // Rating factor
    if (school.rating) {
      score += (school.rating - 3.5) * 10; // Convert rating to score points
    }
    
    return Math.min(100, Math.max(0, Math.round(score * 100) / 100));
  };

  // Simple Mode (2 schools side by side)
  const renderSimpleMode = () => (
    <div>
      <Alert variant="info" className="mb-4">
        <FaBalanceScale className="me-2" />
        <strong>Simple Compare Mode</strong> - Quick side-by-side comparison of 2 schools
      </Alert>

      <Row className="g-4">
        {selectedSchools.map((school, index) => (
          <Col md={6} key={school.id}>
            <Card className="h-100 shadow-sm position-relative">
              <div className="position-absolute top-0 end-0 m-2" style={{zIndex: 2}}>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleRemoveSchool(school.id)}
                >
                  <FaTrash />
                </Button>
              </div>
              
              <img 
                src={school.image} 
                alt={school.name}
                className="card-img-top"
                style={{height: '250px', objectFit: 'cover'}}
              />
              
              <Card.Body>
                <Card.Title className="fw-bold h5">{school.name}</Card.Title>
                <Card.Text className="text-muted mb-3">
                  <FaMapMarkerAlt className="me-1" />
                  {school.location}
                </Card.Text>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-muted">AI Score</span>
                    <Badge bg="success">{getSchoolScore(school)}%</Badge>
                  </div>
                  <ProgressBar 
                    now={getSchoolScore(school)} 
                    variant={getSchoolScore(school) >= 80 ? 'success' : getSchoolScore(school) >= 60 ? 'warning' : 'danger'}
                  />
                </div>

                <Row className="text-center mb-3">
                  <Col>
                    <div className="small text-muted">Fees</div>
                    <div className="fw-bold text-primary">₹{school.fees}</div>
                  </Col>
                  <Col>
                    <div className="small text-muted">Board</div>
                    <div className="fw-bold">{school.affiliation}</div>
                  </Col>
                  <Col>
                    <div className="small text-muted">Rating</div>
                    <div className="fw-bold">
                      <FaStar className="text-warning" />
                      {school.rating}
                    </div>
                  </Col>
                </Row>

                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" className="flex-fill">
                    View Details
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    <FaHeart />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {comparison && selectedSchools.length === 2 && (
        <Card className="mt-4 shadow-sm">
          <Card.Header className="bg-gradient-primary text-white">
            <FaChartBar className="me-2" />
            AI Comparison Summary
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={4}>
                <div className="text-center">
                  <FaRupeeSign size={24} className="text-success mb-2" />
                  <h6>Fee Difference</h6>
                  <p className="mb-0">
                    ₹{Math.abs(selectedSchools[0].fees - selectedSchools[1].fees)}
                  </p>
                  <small className="text-muted">
                    {selectedSchools[0].fees > selectedSchools[1].fees ? 
                      `${selectedSchools[1].name} is cheaper` : 
                      `${selectedSchools[0].name} is cheaper`}
                  </small>
                </div>
              </Col>
              <Col md={4}>
                <div className="text-center">
                  <FaGraduationCap size={24} className="text-primary mb-2" />
                  <h6>Board Comparison</h6>
                  <p className="mb-0">
                    {selectedSchools[0].affiliation} vs {selectedSchools[1].affiliation}
                  </p>
                  <small className="text-muted">
                    {selectedSchools[0].affiliation === selectedSchools[1].affiliation ? 
                      'Same board' : 'Different boards'}
                  </small>
                </div>
              </Col>
              <Col md={4}>
                <div className="text-center">
                  <FaTrophy size={24} className="text-warning mb-2" />
                  <h6>AI Recommendation</h6>
                  <p className="mb-0">
                    {getSchoolScore(selectedSchools[0]) > getSchoolScore(selectedSchools[1]) ? 
                      selectedSchools[0].name : selectedSchools[1].name}
                  </p>
                  <small className="text-muted">
                    Better overall score
                  </small>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>
  );

  // Advanced Mode (3+ schools with detailed analysis)
  const renderAdvancedMode = () => (
    <div>
      <Alert variant="warning" className="mb-4">
        <FaChartBar className="me-2" />
        <strong>Advanced AI Analysis</strong> - Comprehensive comparison of {selectedSchools.length} schools with detailed insights
      </Alert>

      <Row className="g-4 mb-5">
        {selectedSchools.map((school, index) => (
          <Col lg={4} md={6} key={school.id}>
            <Card className="h-100 shadow-sm position-relative">
              <div className="position-absolute top-0 end-0 m-2" style={{zIndex: 2}}>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleRemoveSchool(school.id)}
                >
                  <FaTrash />
                </Button>
              </div>
              <img 
                src={school.image} 
                alt={school.name}
                className="card-img-top"
                style={{height: '200px', objectFit: 'cover'}}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{school.name}</Card.Title>
                <Card.Text className="text-muted mb-2">
                  <FaMapMarkerAlt className="me-1" />
                  {school.location}
                </Card.Text>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-muted">AI Score</span>
                    <Badge bg="success">{getSchoolScore(school)}%</Badge>
                  </div>
                  <ProgressBar 
                    now={getSchoolScore(school)} 
                    variant={getSchoolScore(school) >= 80 ? 'success' : getSchoolScore(school) >= 60 ? 'warning' : 'danger'}
                  />
                </div>

                <div className="row text-center mb-3">
                  <div className="col-4">
                    <div className="small text-muted">Fees</div>
                    <div className="fw-bold text-primary">₹{school.fees}</div>
                  </div>
                  <div className="col-4">
                    <div className="small text-muted">Board</div>
                    <div className="fw-bold">{school.affiliation}</div>
                  </div>
                  <div className="col-4">
                    <div className="small text-muted">City</div>
                    <div className="fw-bold">{school.city}</div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" className="flex-fill">
                    View Details
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    <FaHeart />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        
        {selectedSchools.length < 5 && (
          <Col lg={4} md={6}>
            <Card className="h-100 shadow-sm border-dashed d-flex align-items-center justify-content-center" 
                  style={{minHeight: '400px', border: '2px dashed #dee2e6'}}>
              <Card.Body className="text-center">
                <FaPlus size={48} className="text-muted mb-3" />
                <h5 className="text-muted">Add More Schools</h5>
                <p className="text-muted small mb-3">
                  Compare up to 5 schools with AI analysis
                </p>
                <Button 
                  variant="outline-primary"
                  onClick={() => setShowSchoolSelector(true)}
                >
                  Select School
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {comparison && (
        <div className="mt-5">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-gradient-primary text-white">
              <FaChartBar className="me-2" />
              AI Analysis Summary
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={3}>
                  <div className="text-center">
                    <FaRupeeSign size={24} className="text-success mb-2" />
                    <h6>Fee Range</h6>
                    <p className="mb-0">
                      ₹{comparison.feeRange.min} - ₹{comparison.feeRange.max}
                    </p>
                    <small className="text-muted">Avg: ₹{comparison.feeRange.avg}</small>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <FaGraduationCap size={24} className="text-primary mb-2" />
                    <h6>Boards Available</h6>
                    <p className="mb-0">{comparison.affiliations.join(', ')}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <FaMapMarkerAlt size={24} className="text-info mb-2" />
                    <h6>Cities</h6>
                    <p className="mb-0">{comparison.cities.join(', ')}</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <FaTrophy size={24} className="text-warning mb-2" />
                    <h6>Best Value</h6>
                    <p className="mb-0">{comparison.bestValue.name}</p>
                    <small className="text-muted">Score: {getSchoolScore(comparison.bestValue)}%</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row className="g-4">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">
                  <FaTrophy className="me-2" />
                  AI Top Pick
                </Card.Header>
                <Card.Body>
                  <h6>{comparison.bestValue.name}</h6>
                  <p className="text-muted small mb-2">
                    Highest AI score among selected schools
                  </p>
                  <div className="d-flex justify-content-between">
                    <span>Score: {getSchoolScore(comparison.bestValue)}%</span>
                    <span>Fees: ₹{comparison.bestValue.fees}/mo</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-warning text-dark">
                  <FaRupeeSign className="me-2" />
                  Most Affordable
                </Card.Header>
                <Card.Body>
                  <h6>{comparison.mostAffordable.name}</h6>
                  <p className="text-muted small mb-2">
                    Best value for money option
                  </p>
                  <div className="d-flex justify-content-between">
                    <span>Score: {getSchoolScore(comparison.mostAffordable)}%</span>
                    <span>Fees: ₹{comparison.mostAffordable.fees}/mo</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1 className="fw-bold text-primary mb-2">
          <FaBalanceScale className="me-2" />
          AI School Comparison
        </h1>
        <p className="text-muted">
          Compare schools with AI-powered insights and recommendations
        </p>
      </div>

      {selectedSchools.length === 0 ? (
        <Card className="shadow-sm text-center py-5">
          <Card.Body>
            <FaBalanceScale size={64} className="text-muted mb-3" />
            <h4 className="text-muted mb-3">No Schools Selected</h4>
            <p className="text-muted mb-4">
              Select schools to start comparing them with AI analysis
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setShowSchoolSelector(true)}
            >
              <FaBalanceScale className="me-2" />
              Select Schools to Compare
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4>Comparing {selectedSchools.length} Schools</h4>
              <small className="text-muted">
                {mode === 'advanced' ? 'Advanced AI Analysis' : 'Simple Compare Mode'}
              </small>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <ToggleButtonGroup type="radio" name="mode" value={mode} onChange={setMode}>
                <ToggleButton value="simple" variant={mode === 'simple' ? 'primary' : 'outline-primary'} size="sm">
                  <FaBalanceScale className="me-1" /> Simple
                </ToggleButton>
                <ToggleButton value="advanced" variant={mode === 'advanced' ? 'primary' : 'outline-primary'} size="sm">
                  <FaChartBar className="me-1" /> Advanced
                </ToggleButton>
              </ToggleButtonGroup>
              <Button 
                variant="outline-primary"
                onClick={() => setShowSchoolSelector(true)}
                disabled={selectedSchools.length >= 5}
              >
                <FaPlus className="me-1" />
                Add School
              </Button>
              <Button 
                variant="outline-danger"
                onClick={() => setSelectedSchools([])}
              >
                <FaTrash className="me-1" />
                Clear All
              </Button>
            </div>
          </div>

          {mode === 'simple' ? renderSimpleMode() : renderAdvancedMode()}
        </>
      )}

      {/* School Selector Modal */}
      <Modal 
        show={showSchoolSelector} 
        onHide={() => setShowSchoolSelector(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Schools to Compare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            {allSchools.slice(0, 12).map(school => (
              <Col md={6} key={school.id}>
                <Card 
                  className={`cursor-pointer ${selectedSchools.find(s => s.id === school.id) ? 'border-primary' : ''}`}
                  onClick={() => handleAddSchool(school)}
                >
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center">
                      <img 
                        src={school.image} 
                        alt={school.name}
                        style={{width: '60px', height: '45px', objectFit: 'cover', borderRadius: '8px'}}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{school.name}</h6>
                        <p className="text-muted small mb-1">{school.location}</p>
                        <div className="d-flex justify-content-between">
                          <Badge bg="primary" className="small">{school.affiliation}</Badge>
                          <span className="fw-bold text-primary">₹{school.fees}</span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSchoolSelector(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdvancedCompare; 