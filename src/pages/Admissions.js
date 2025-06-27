import React from 'react';
import { Container, Row, Col, Card, Button, Accordion, ProgressBar, Carousel } from 'react-bootstrap';
import { FaWhatsapp, FaChartLine, FaMapMarkerAlt, FaCheckCircle, FaUserPlus, FaUserEdit, FaShoppingCart, FaWpforms, FaRegEye } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'Ezyschooling made the admission process so easy! I applied to 5 schools in minutes and got real-time updates.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Amit Verma',
    text: 'The live tracking and WhatsApp notifications were a game changer. Highly recommend to all parents!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Sunita Rao',
    text: 'I loved the one-click application for multiple schools. Saved me so much time and stress.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const steps = [
  { icon: <FaUserPlus size={28} color="#2563eb" />, label: "Register Yourself" },
  { icon: <FaUserEdit size={28} color="#2563eb" />, label: "Create Child's Profile" },
  { icon: <FaShoppingCart size={28} color="#2563eb" />, label: "Add Schools to Cart" },
  { icon: <FaWpforms size={28} color="#2563eb" />, label: "Fill Application Form" },
  { icon: <FaRegEye size={28} color="#2563eb" />, label: "Track Applications" },
];

const faqs = [
  { q: "Can I apply to multiple schools at once?", a: "Yes! With Ezyschooling, you can apply to as many schools as you like with a single application form." },
  { q: "How do I track my application?", a: "You get real-time updates via WhatsApp, SMS, and email. You can also track status on your dashboard." },
  { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption and never share your data without your consent." },
  { q: "What if I need help?", a: "Our support team is available via chat, email, and phone to assist you at every step." },
];

const Admissions = () => (
  <div style={{background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)', minHeight: '100vh', paddingBottom: '3rem'}}>
    <Container className="pt-5 pb-4">
      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <h1 style={{fontWeight:800, color:'#fff', fontSize:'2.5rem', letterSpacing:'0.5px'}}>Admissions Made Effortless</h1>
          <p style={{fontSize:'1.25rem', color:'#e0e7ef', margin:'1.2rem 0 2rem 0'}}>Apply to multiple schools, track your applications, and get real-time updates—all in one place.</p>
          <Button variant="light" size="lg" style={{color:'#2563eb', fontWeight:700, borderRadius:'0.7rem', boxShadow:'0 2px 12px rgba(37,99,235,0.10)'}}>Start Your Application Now</Button>
        </Col>
        <Col md={6} className="text-center">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80" alt="Admissions" style={{maxWidth:'90%', borderRadius:'1.5rem', boxShadow:'0 4px 24px 0 rgba(37,99,235,0.10)'}} />
        </Col>
      </Row>
      {/* Feature Highlights */}
      <Row className="mb-5 g-4">
        <Col md={3} xs={6}>
          <Card className="h-100 shadow border-0 text-center" style={{borderRadius:'1.2rem', background:'#fff'}}>
            <Card.Body>
              <FaWhatsapp size={32} style={{color:'#25d366', marginBottom:8}} />
              <div className="fw-bold mb-1">Real-Time Updates</div>
              <div className="text-muted" style={{fontSize:'1.01rem'}}>Get notifications on WhatsApp, SMS, and email.</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} xs={6}>
          <Card className="h-100 shadow border-0 text-center" style={{borderRadius:'1.2rem', background:'#fff'}}>
            <Card.Body>
              <FaChartLine size={32} style={{color:'#2563eb', marginBottom:8}} />
              <div className="fw-bold mb-1">Live Application Tracking</div>
              <div className="text-muted" style={{fontSize:'1.01rem'}}>Track every step of your application process.</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} xs={6}>
          <Card className="h-100 shadow border-0 text-center" style={{borderRadius:'1.2rem', background:'#fff'}}>
            <Card.Body>
              <FaMapMarkerAlt size={32} style={{color:'#ff7043', marginBottom:8}} />
              <div className="fw-bold mb-1">No Physical Visits</div>
              <div className="text-muted" style={{fontSize:'1.01rem'}}>Apply and track from the comfort of your home.</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} xs={6}>
          <Card className="h-100 shadow border-0 text-center" style={{borderRadius:'1.2rem', background:'#fff'}}>
            <Card.Body>
              <FaCheckCircle size={32} style={{color:'#81c784', marginBottom:8}} />
              <div className="fw-bold mb-1">One-Click Application</div>
              <div className="text-muted" style={{fontSize:'1.01rem'}}>Apply to multiple schools with a single form.</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Step-by-Step Guide */}
      <Card className="shadow-lg border-0 mb-5" style={{borderRadius:'1.5rem', background:'#fff'}}>
        <Card.Body>
          <h4 className="mb-4 text-center" style={{fontWeight:700, color:'#2563eb'}}>How to Apply with Ezyschooling?</h4>
          <ProgressBar now={100} style={{height:8, marginBottom:32, background:'#e0e7ef'}} variant="primary" />
          <div className="d-flex flex-wrap justify-content-center align-items-stretch gap-3">
            {steps.map((step, idx) => (
              <div key={idx} style={{background:'#f1f5f9', borderRadius:'1rem', padding:'1.2rem', minWidth:150, minHeight:140, maxWidth:180, flex:'1 1 150px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                {step.icon}
                <div style={{marginTop:8, fontWeight:600, color:'#2563eb', fontSize:'1.05rem', textAlign:'center'}}>{step.label}</div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      {/* FAQ Accordion */}
      <Row className="mb-5">
        <Col md={8} className="mx-auto">
          <h4 className="mb-3 text-center" style={{fontWeight:700, color:'#2563eb'}}>Frequently Asked Questions</h4>
          <Accordion defaultActiveKey="0" flush>
            {faqs.map((faq, idx) => (
              <Accordion.Item eventKey={String(idx)} key={idx}>
                <Accordion.Header>{faq.q}</Accordion.Header>
                <Accordion.Body>{faq.a}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
      {/* Testimonials Carousel */}
      <Row className="mb-5">
        <Col md={8} className="mx-auto">
          <h4 className="mb-4 text-center" style={{fontWeight:700, color:'#2563eb'}}>What Parents Say</h4>
          <Carousel indicators={false} interval={6000}>
            {testimonials.map((t, idx) => (
              <Carousel.Item key={idx}>
                <Card className="shadow border-0 text-center" style={{borderRadius:'1.2rem', background:'#f7f9fb', padding:'2rem 1.5rem'}}>
                  <div className="d-flex flex-column align-items-center">
                    <img src={t.avatar} alt={t.name} style={{width:64, height:64, borderRadius:'50%', border:'4px solid #fff', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', marginBottom:16}} />
                    <Card.Text style={{fontSize:'1.15rem', color:'#333', minHeight:80}}>&quot;{t.text}&quot;</Card.Text>
                    <Card.Footer className="bg-transparent border-0 mt-3" style={{fontWeight:600, color:'#2563eb'}}>{t.name}</Card.Footer>
                  </div>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Admissions; 