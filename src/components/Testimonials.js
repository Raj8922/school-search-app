import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Mr. Hemant',
    text: 'I was looking for International schools for Class 5 in Delhi. Ezyschooling helped me find and apply to the right schools.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    color: '#e0e7ef',
  },
  {
    name: 'Ms. Isha',
    text: 'I got my child\'s admission done via Ezyschooling. Ezyschooling helped me with all the admission process and made applying easy.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    color: '#f1f5f9',
  },
  {
    name: 'Mr. Sudipta',
    text: 'I found Ezyschooling when I was surfing the net to find schools for my child in grade 2. At Ezyschooling I found all the details and made my admission journey easy.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    color: '#e0f2fe',
  },
];

const Testimonials = () => (
  <Container className="mb-5">
    <h2 className="mb-4 text-center" style={{fontWeight:700}}>What our parents have to say?</h2>
    <Row className="justify-content-center g-4">
      {testimonials.map((t, idx) => (
        <Col md={4} key={idx}>
          <Card className="h-100 shadow-lg border-0" style={{background:t.color, borderRadius:'1.5rem', position:'relative', paddingTop:'2.5rem'}}>
            <div style={{position:'absolute', top:'-32px', left:'50%', transform:'translateX(-50%)'}}>
              <img src={t.avatar} alt={t.name} style={{width:64, height:64, borderRadius:'50%', border:'4px solid #fff', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}} />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between align-items-center text-center">
              <FaQuoteLeft style={{fontSize:'2rem', color:'#2563eb', marginBottom:'0.5rem'}} />
              <Card.Text style={{fontSize:'1.1rem', color:'#333', minHeight:100}}>&quot;{t.text}&quot;</Card.Text>
              <Card.Footer className="bg-transparent border-0 mt-3" style={{fontWeight:600, color:'#2563eb'}}>{t.name}</Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default Testimonials; 