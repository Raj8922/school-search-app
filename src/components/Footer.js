import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => (
  <footer style={{
    borderTop: '6px solid',
    borderImage: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%) 1',
    background: 'linear-gradient(180deg, #f7f9fb 60%, #e0e7ef 100%)',
    color: '#222',
    padding: '3rem 0 1.5rem 0',
    marginTop: '3rem',
    boxShadow: '0 -2px 24px 0 rgba(37,99,235,0.04)'
  }}>
    <Container>
      <Row className="mb-4">
        <Col md={4} className="mb-4 mb-md-0">
          <h5 style={{fontWeight:700, color:'#2563eb'}}>About Ezyschooling</h5>
          <p style={{fontSize:'1rem', color:'#555'}}>Ezyschooling is your trusted platform to discover, compare, and apply to the best schools in your city. We help parents make informed decisions with ease and transparency.</p>
        </Col>
        <Col md={3} className="mb-4 mb-md-0">
          <h5 style={{fontWeight:700, color:'#2563eb'}}>Quick Links</h5>
          <ul style={{listStyle:'none', padding:0, margin:0, fontSize:'1rem'}}>
            <li><a href="/" style={{color:'#2563eb', textDecoration:'none'}}>Home</a></li>
            <li><a href="/explore" style={{color:'#2563eb', textDecoration:'none'}}>Explore Schools</a></li>
            <li><a href="/compare" style={{color:'#2563eb', textDecoration:'none'}}>Compare Schools</a></li>
            <li><a href="/admissions" style={{color:'#2563eb', textDecoration:'none'}}>Admissions</a></li>
          </ul>
        </Col>
        <Col md={3} className="mb-4 mb-md-0">
          <h5 style={{fontWeight:700, color:'#2563eb'}}>Contact Us</h5>
          <p style={{fontSize:'1rem', color:'#555'}}><FaMapMarkerAlt style={{color:'#2563eb', marginRight:6}} /> 123 School Lane, New Delhi, India</p>
          <p style={{fontSize:'1rem', color:'#555'}}><FaPhone style={{color:'#2563eb', marginRight:6}} /> +91 98765 43210</p>
          <p style={{fontSize:'1rem', color:'#555'}}><FaEnvelope style={{color:'#2563eb', marginRight:6}} /> info@ezyschooling.com</p>
        </Col>
        <Col md={2} className="text-md-end text-center">
          <h5 style={{fontWeight:700, color:'#2563eb'}}>Follow Us</h5>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{color:'#2563eb', marginRight:'1rem', fontSize:'1.5rem'}}><FaFacebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{color:'#2563eb', marginRight:'1rem', fontSize:'1.5rem'}}><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{color:'#2563eb', fontSize:'1.5rem'}}><FaTwitter /></a>
        </Col>
      </Row>
      <hr style={{borderTop:'1px solid #e5e7eb', margin:'2rem 0'}} />
      <Row>
        <Col className="text-center">
          <span style={{fontSize:'1rem', color:'#888'}}>© {new Date().getFullYear()} Ezyschooling. All rights reserved.</span>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer; 