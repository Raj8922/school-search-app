import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const AboutSection = () => (
  <section style={{background:'#f1f5f9', padding:'3rem 0', borderRadius:'1.5rem', margin:'2rem 0'}}>
    <Container>
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <h2 style={{fontWeight:700, color:'#2563eb'}}>About Ezyschooling</h2>
          <p style={{fontSize:'1.15rem', color:'#444'}}>Ezyschooling is dedicated to making school search and admissions easy for parents. Discover, compare, and apply to the best schools in your city—all in one place. Our mission is to empower parents with transparent information and a seamless application process.</p>
          <Button variant="primary" href="/explore">Explore Schools</Button>
        </Col>
        <Col md={6} className="text-center">
          <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=500&q=80" alt="About Ezyschooling" style={{maxWidth:'100%', borderRadius:'1rem', boxShadow:'0 2px 12px rgba(37,99,235,0.10)'}} />
        </Col>
      </Row>
    </Container>
  </section>
);

export default AboutSection; 