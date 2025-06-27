import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Badge, Dropdown, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import SchoolCard from '../components/SchoolCard';
import { FaFilter, FaSearch, FaSortAmountDown, FaBuilding, FaRupeeSign, FaCheckCircle, FaMapMarkedAlt, FaThLarge, FaHeart } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const affiliations = ['All', 'CBSE', 'ICSE', 'State Board'];

const cities = ['All', 'Delhi', 'Bangalore', 'Pune', 'Noida', 'Kolkata', 'Chennai', 'Gurgaon', 'Hyderabad', 'Chandigarh'];

// Custom school marker SVG as data URI
const schoolMarkerSvg = encodeURIComponent(`
<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="19" cy="19" r="19" fill="#2563eb"/>
<path d="M19 10L27 14V16H11V14L19 10Z" fill="white"/>
<rect x="13" y="16" width="12" height="8" rx="2" fill="white"/>
<rect x="17" y="18" width="4" height="6" rx="1" fill="#2563eb"/>
</svg>
`);
const schoolIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,${schoolMarkerSvg}`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
  className: 'school-marker-animate'
});

const Explore = () => {
  const [allSchools, setAllSchools] = useState([]);
  const [city, setCity] = useState('All');
  const [search, setSearch] = useState('');
  const [minFees, setMinFees] = useState('');
  const [maxFees, setMaxFees] = useState('');
  const [affiliation, setAffiliation] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState('default');
  const [view, setView] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(12);
  const [favoritesModal, setFavoritesModal] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullStartY, setPullStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);

  // Load schools data
  useEffect(() => {
    import('../data/schools.js').then(module => {
      const schools = module.default || module.allSchools || [];
      setAllSchools(schools);
    });
  }, []);

  // Load favorites on mount
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favoriteSchools') || '[]');
    setFavoriteIds(favs);
  }, []);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const favs = JSON.parse(localStorage.getItem('favoriteSchools') || '[]');
      setFavoriteIds(favs);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Pull to refresh functionality
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setPullStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && pullStartY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - pullStartY);
      setPullDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 100) {
      handleRefresh();
    }
    setPullStartY(0);
    setPullDistance(0);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Reload schools data
    import('../data/schools.js').then(module => {
      const schools = module.default || module.allSchools || [];
      setAllSchools(schools);
    });
    setIsRefreshing(false);
  };

  // Force update when modal opens
  const openFavoritesModal = () => {
    const favs = JSON.parse(localStorage.getItem('favoriteSchools') || '[]');
    setFavoriteIds(favs);
    setFavoritesModal(true);
  };

  let filtered = allSchools.filter(s =>
    (city === 'All' || s.city === city) &&
    (affiliation === 'All' || s.affiliation === affiliation) &&
    (minFees === '' || s.fees >= Number(minFees)) &&
    (maxFees === '' || s.fees <= Number(maxFees)) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()))
  );

  // Ensure minFees and maxFees are always numbers for comparison
  if (minFees !== '' && !isNaN(Number(minFees))) {
    filtered = filtered.filter(s => s.fees >= Number(minFees));
  }
  if (maxFees !== '' && !isNaN(Number(maxFees))) {
    filtered = filtered.filter(s => s.fees <= Number(maxFees));
  }

  // Sort logic
  if (sort === 'feesLowHigh') filtered = filtered.slice().sort((a, b) => a.fees - b.fees);
  if (sort === 'feesHighLow') filtered = filtered.slice().sort((a, b) => b.fees - a.fees);
  if (sort === 'az') filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  // Active filter badges
  const filterBadges = [];
  if (city !== 'All') filterBadges.push(<Badge bg="primary" className="me-2" key="city"><FaBuilding /> {city}</Badge>);
  if (affiliation !== 'All') filterBadges.push(<Badge bg="info" className="me-2" key="aff"><FaCheckCircle /> {affiliation}</Badge>);
  if (minFees) filterBadges.push(<Badge bg="success" className="me-2" key="minf"><FaRupeeSign /> Min ₹{minFees}</Badge>);
  if (maxFees) filterBadges.push(<Badge bg="danger" className="me-2" key="maxf"><FaRupeeSign /> Max ₹{maxFees}</Badge>);

  // Default map center (Delhi)
  const mapCenter = filtered.length > 0 ? [filtered[0].lat, filtered[0].lng] : [28.6139, 77.2090];

  // Get favorite schools
  const favoriteSchools = allSchools.filter(s => favoriteIds.includes(s.id));

  return (
    <div 
      style={{background:'linear-gradient(90deg, #f1f5f9 60%, #e0e7ef 100%)', minHeight:'100vh'}}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      {pullDistance > 0 && (
        <div 
          className="position-fixed top-0 start-50 translate-middle-x text-center p-3"
          style={{zIndex: 1050}}
        >
          <div className="bg-white rounded-pill px-3 py-2 shadow">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
            <span className="text-muted">
              {pullDistance > 100 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}

      {/* Refresh Loading Indicator */}
      {isRefreshing && (
        <div className="position-fixed top-0 start-0 w-100 text-center p-3" style={{zIndex: 1050}}>
          <div className="bg-success text-white rounded-pill px-3 py-2 d-inline-block">
            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
            Refreshing schools...
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Container className="pt-5 pb-2">
        <Row className="align-items-center mb-4 flex-column-reverse flex-md-row">
          <Col md={7} className="mb-4 mb-md-0">
            <h1 style={{fontWeight:800, color:'#2563eb', fontSize:'2.3rem', letterSpacing:'0.5px'}}>Explore Schools</h1>
            <p style={{fontSize:'1.18rem', color:'#444', margin:'1.2rem 0 0.5rem 0'}}>Find, filter, and compare the best schools in your city. Use smart filters and sorting to discover your perfect match.</p>
          </Col>
          <Col md={5} className="text-center">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80" alt="Explore Schools" style={{maxWidth:'70%', minWidth:180, borderRadius:'1.5rem', boxShadow:'0 4px 24px 0 rgba(37,99,235,0.10)', marginBottom:'1.5rem', marginTop:0}} />
          </Col>
        </Row>
        {/* Floating Filter/Search Bar */}
        <div className="shadow-lg p-3 mb-4 bg-white rounded-4 d-flex flex-wrap align-items-center justify-content-between" style={{position:'relative', top:'-32px', zIndex:2, boxShadow:'0 6px 32px 0 rgba(37,99,235,0.10)'}}>
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <Button variant="outline-primary" className="me-2" onClick={() => setShowModal(true)}><FaFilter /> Filter</Button>
            <Form className="d-flex" style={{maxWidth: 320}} onSubmit={e => e.preventDefault()}>
              <Form.Control type="text" placeholder="Search by name or location" value={search} onChange={e => setSearch(e.target.value)} style={{borderTopRightRadius:0, borderBottomRightRadius:0}} />
              <Button variant="primary" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0}}><FaSearch /></Button>
            </Form>
            {filterBadges.length > 0 && <div className="ms-3 d-flex flex-wrap">{filterBadges}</div>}
          </div>
          <div className="d-flex align-items-center">
            <ToggleButtonGroup type="radio" name="view" value={view} onChange={val => setView(val)} className="me-3">
              <ToggleButton id="tbg-grid" value="grid" variant={view==='grid'?'primary':'outline-primary'} size="sm"><FaThLarge /> Grid</ToggleButton>
              <ToggleButton id="tbg-map" value="map" variant={view==='map'?'primary':'outline-primary'} size="sm"><FaMapMarkedAlt /> Map</ToggleButton>
            </ToggleButtonGroup>
            <span className="me-2 text-muted" style={{fontSize:'1.05rem'}}><FaSortAmountDown /> Sort by:</span>
            <Dropdown onSelect={setSort}>
              <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown" size="sm">
                {sort === 'default' && 'Default'}
                {sort === 'feesLowHigh' && 'Fees: Low to High'}
                {sort === 'feesHighLow' && 'Fees: High to Low'}
                {sort === 'az' && 'A-Z'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="default">Default</Dropdown.Item>
                <Dropdown.Item eventKey="feesLowHigh">Fees: Low to High</Dropdown.Item>
                <Dropdown.Item eventKey="feesHighLow">Fees: High to Low</Dropdown.Item>
                <Dropdown.Item eventKey="az">A-Z</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div />
          <Button variant="outline-danger" onClick={openFavoritesModal} style={{fontWeight:600, borderRadius:'0.7rem', position:'relative', boxShadow:'0 2px 8px rgba(220,38,38,0.15)'}}>
            <FaHeart style={{marginRight:6}} /> Favorites
            {favoriteIds.length > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle" style={{fontSize:'0.85em', animation:'pulse 2s infinite'}}>{favoriteIds.length}</span>}
          </Button>
        </div>
        <div className="mb-3 ms-1" style={{fontSize:'1.08rem', color:'#2563eb', fontWeight:600}}>
          {filtered.length} schools found
        </div>
        {/* School Grid or Map View */}
        {view === 'grid' ? (
          <>
            <Row xs={1} md={2} lg={4} className="g-4">
              {filtered.slice(0, visibleCount).map((school, idx) => (
                <Col key={school.id} className="fade-in">
                  <div style={{position:'relative'}}>
                    {idx < 3 && <span className="badge bg-warning text-dark position-absolute" style={{top:10, left:10, zIndex:2, fontWeight:600}}>Top Rated</span>}
                    <SchoolCard school={school} />
                  </div>
                </Col>
              ))}
              {filtered.length === 0 && <Col><p>No schools found.</p></Col>}
            </Row>
            {visibleCount < filtered.length && (
              <div className="text-center mt-4">
                <Button variant="outline-primary" size="lg" onClick={() => setVisibleCount(c => c + 12)} style={{borderRadius:'0.7rem', fontWeight:600, padding:'0.7rem 2.5rem', marginRight:12}}>View More</Button>
                {visibleCount > 12 && (
                  <Button variant="outline-secondary" size="lg" onClick={() => setVisibleCount(12)} style={{borderRadius:'0.7rem', fontWeight:600, padding:'0.7rem 2.5rem'}}>View Less</Button>
                )}
              </div>
            )}
            {visibleCount >= filtered.length && visibleCount > 12 && (
              <div className="text-center mt-4">
                <Button variant="outline-secondary" size="lg" onClick={() => setVisibleCount(12)} style={{borderRadius:'0.7rem', fontWeight:600, padding:'0.7rem 2.5rem'}}>View Less</Button>
              </div>
            )}
          </>
        ) : (
          <div className="fade-in" style={{height: 'min(60vw, 480px)', minHeight:320, width: '100%', borderRadius:'1.2rem', overflow:'hidden', boxShadow:'0 2px 12px 0 rgba(37,99,235,0.10)', border:'2px solid #e0e7ef', padding:'0.5rem', background:'#f7f9fb'}}>
            <MapContainer center={mapCenter} zoom={11} style={{height:'100%', width:'100%'}} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              {filtered.map(school => (
                <Marker key={school.id} position={[school.lat, school.lng]} icon={schoolIcon}>
                  <Popup>
                    <div style={{textAlign:'center', minWidth:200, borderRadius:16, boxShadow:'0 2px 16px rgba(37,99,235,0.10)', background:'#fff', padding:'1rem 1rem 0.7rem 1rem'}}>
                      <img src={school.image} alt={school.name} style={{width:90, height:64, objectFit:'cover', borderRadius:10, marginBottom:8, boxShadow:'0 1px 6px #e0e7ef'}} /><br/>
                      <b style={{fontSize:'1.08em', color:'#2563eb'}}>{school.name}</b><br/>
                      <span style={{fontSize:'0.97em', color:'#555'}}>{school.location}</span><br/>
                      <span className="badge bg-primary bg-opacity-10 text-primary mt-2 mb-1">{school.affiliation}</span><br/>
                      <span className="fw-semibold">₹{school.fees}/mo</span><br/>
                      <Button variant="outline-primary" size="sm" className="mt-2 mb-1">Save</Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </Container>
      {/* Filter Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="filter-modal">
        <Modal.Header style={{background:'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)', color:'white', borderBottom:'none', borderRadius:'1rem 1rem 0 0'}}>
          <div className="d-flex align-items-center justify-content-between w-100">
            <Modal.Title style={{fontWeight:700, fontSize:'1.3rem', margin:0}}>
              <FaFilter style={{marginRight:8}} /> Filter Schools
            </Modal.Title>
            <Button variant="light" size="sm" onClick={() => setShowModal(false)} style={{borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'auto'}}>×</Button>
          </div>
        </Modal.Header>
        <Modal.Body style={{padding:'1.5rem', background:'#f8fafc'}}>
          <Form onSubmit={handleApplyFilters}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:600, color:'#374151', marginBottom:'0.5rem'}}>
                    <FaBuilding style={{marginRight:6, color:'#2563eb'}} /> City
                  </Form.Label>
                  <Form.Select 
                    value={city} 
                    onChange={e => setCity(e.target.value)}
                    style={{borderRadius:'0.7rem', border:'2px solid #e5e7eb', padding:'0.75rem', background:'white'}}
                  >
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:600, color:'#374151', marginBottom:'0.5rem'}}>
                    <FaCheckCircle style={{marginRight:6, color:'#2563eb'}} /> Affiliation
                  </Form.Label>
                  <Form.Select 
                    value={affiliation} 
                    onChange={e => setAffiliation(e.target.value)}
                    style={{borderRadius:'0.7rem', border:'2px solid #e5e7eb', padding:'0.75rem', background:'white'}}
                  >
                    {affiliations.map(a => <option key={a}>{a}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:600, color:'#374151', marginBottom:'0.5rem'}}>
                    <FaRupeeSign style={{marginRight:6, color:'#2563eb'}} /> Min Fees (₹/month)
                  </Form.Label>
                  <Form.Control 
                    type="number" 
                    value={minFees} 
                    onChange={e => setMinFees(e.target.value)} 
                    placeholder="Min" 
                    style={{borderRadius:'0.7rem', border:'2px solid #e5e7eb', padding:'0.75rem', background:'white'}}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:600, color:'#374151', marginBottom:'0.5rem'}}>
                    <FaRupeeSign style={{marginRight:6, color:'#2563eb'}} /> Max Fees (₹/month)
                  </Form.Label>
                  <Form.Control 
                    type="number" 
                    value={maxFees} 
                    onChange={e => setMaxFees(e.target.value)} 
                    placeholder="Max" 
                    style={{borderRadius:'0.7rem', border:'2px solid #e5e7eb', padding:'0.75rem', background:'white'}}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex gap-2 mt-4">
              <Button 
                variant="primary" 
                type="submit" 
                className="flex-fill" 
                style={{borderRadius:'0.7rem', fontWeight:600, padding:'0.75rem', background:'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)', border:'none', boxShadow:'0 2px 8px rgba(37,99,235,0.15)'}}
              >
                Apply Filters
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => { setCity('All'); setAffiliation('All'); setMinFees(''); setMaxFees(''); }}
                style={{borderRadius:'0.7rem', fontWeight:600, padding:'0.75rem'}}
              >
                Reset
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={favoritesModal} onHide={() => setFavoritesModal(false)} centered size="lg" className="favorites-modal">
        <Modal.Header style={{background:'linear-gradient(90deg, #e11d48 0%, #f43f5e 100%)', color:'white', borderBottom:'none', borderRadius:'1rem 1rem 0 0'}}>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center gap-3">
              {favoriteSchools.length > 0 && (
                <Button variant="light" size="sm" onClick={() => { localStorage.removeItem('favoriteSchools'); setFavoriteIds([]); setFavoritesModal(false); }} style={{fontWeight:600, borderRadius:'0.5rem'}}>
                  Clear All
                </Button>
              )}
              <Modal.Title style={{fontWeight:700, fontSize:'1.3rem', margin:0}}>
                <FaHeart style={{marginRight:8}} /> My Favorite Schools ({favoriteSchools.length})
              </Modal.Title>
            </div>
            <Button variant="light" size="sm" onClick={() => setFavoritesModal(false)} style={{borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center'}}>×</Button>
          </div>
        </Modal.Header>
        <Modal.Body style={{padding:'1.5rem', background:'#f8fafc'}}>
          {favoriteSchools.length === 0 ? (
            <div className="text-center py-5">
              <FaHeart style={{fontSize:'3rem', color:'#e5e7eb', marginBottom:'1rem'}} />
              <h5 style={{color:'#6b7280', fontWeight:600}}>No favorite schools yet</h5>
              <p style={{color:'#9ca3af'}}>Click the heart icon on any school to save it here!</p>
            </div>
          ) : (
            <Row className="g-4">
              {favoriteSchools.map(school => (
                <Col md={6} key={school.id} className="fade-in">
                  <div style={{position:'relative'}}>
                    <SchoolCard school={school} />
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Explore;
