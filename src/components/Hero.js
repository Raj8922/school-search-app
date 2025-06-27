import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SchoolCard from './SchoolCard';

const Hero = () => {
  const [search, setSearch] = useState('');
  const [allSchools, setAllSchools] = useState([]);

  // Load schools data
  useEffect(() => {
    import('../data/schools.js').then(module => {
      const schools = module.default || module.allSchools || [];
      setAllSchools(schools);
    });
  }, []);

  const filtered = allSchools.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
      color: '#fff',
      padding: '4rem 0 3rem 0',
      borderRadius: '0 0 2rem 2rem',
      boxShadow: '0 4px 24px 0 rgba(37,99,235,0.10)',
      marginBottom: '2rem',
    }}>
      <Container>
        <Row className="align-items-center">
          <Col md={7} className="mb-4 mb-md-0">
            <h1 className="display-4 fw-bold mb-3" style={{fontSize:'2.7rem'}}>Find the right School</h1>
            <p className="lead mb-4" style={{fontSize:'1.25rem'}}>Your admission, our responsibility. Discover, compare, and apply to the best schools in your city.</p>
            <Form className="d-flex shadow rounded bg-white p-2" style={{maxWidth: 500}} onSubmit={e => e.preventDefault()}>
              <Form.Control type="text" placeholder="Search schools near you..." className="me-2 border-0" style={{boxShadow:'none'}} value={search} onChange={e => setSearch(e.target.value)} />
              <Button variant="primary" style={{borderRadius:'0.5rem'}}>Search</Button>
            </Form>
            {search && (
              <div className="bg-white rounded shadow p-3 mt-3" style={{maxHeight:320, overflowY:'auto'}}>
                {filtered.length > 0 ? (
                  <Row className="g-3">
                    {filtered.map(school => (
                      <Col md={6} key={school.id}>
                        <SchoolCard school={school} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-muted">No schools found.</div>
                )}
              </div>
            )}
          </Col>
          <Col md={5} className="text-center">
            <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80" alt="Hero" style={{maxWidth:'90%', borderRadius:'1.5rem', boxShadow:'0 2px 12px rgba(37,99,235,0.10)'}} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero; 