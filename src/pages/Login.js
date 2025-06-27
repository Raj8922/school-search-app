import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSignInAlt, FaUser, FaLock, FaGoogle, FaFacebook, FaBrain, FaRocket, FaShieldAlt, FaLightbulb } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password
      const userData = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?name=${formData.email.split('@')[0]}&background=2563eb&color=fff`
      };
      
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demo123'
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '2rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '80px',
        height: '80px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite'
      }}></div>

      <Container>
        <Row className="justify-content-center align-items-center">
          {/* Left Side - AI Features */}
          <Col lg={6} className="d-none d-lg-block text-white mb-5 mb-lg-0">
            <div className="pe-5">
              <div className="mb-4">
                <FaBrain size={64} className="mb-3" style={{opacity: 0.9}} />
                <h1 className="display-4 fw-bold mb-3" style={{fontSize: '3rem'}}>
                  AI-Powered School Discovery
                </h1>
                <p className="lead mb-4" style={{fontSize: '1.25rem', opacity: 0.9}}>
                  Experience the future of school selection with our intelligent recommendation system
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                    <FaRocket size={24} />
                  </div>
                  <div>
                    <h5 className="mb-1">Smart Recommendations</h5>
                    <p className="mb-0" style={{opacity: 0.8}}>AI analyzes your preferences to suggest perfect schools</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                    <FaShieldAlt size={24} />
                  </div>
                  <div>
                    <h5 className="mb-1">Secure & Private</h5>
                    <p className="mb-0" style={{opacity: 0.8}}>Your data is protected with enterprise-grade security</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
                    <FaLightbulb size={24} />
                  </div>
                  <div>
                    <h5 className="mb-1">Intelligent Insights</h5>
                    <p className="mb-0" style={{opacity: 0.8}}>Get personalized insights and comparison analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Side - Login Form */}
          <Col lg={6} md={8} sm={10}>
            <Card className="shadow-lg border-0" style={{
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <FaSignInAlt size={32} className="text-white" />
                    </div>
                  </div>
                  <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
                  <p className="text-muted">
                    Sign in to access your personalized AI-powered school recommendations
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-3 border-0" style={{borderRadius: '12px'}}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FaUser className="me-2" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="py-3"
                      style={{borderRadius: '12px', border: '2px solid #e9ecef'}}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <FaLock className="me-2" />
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="py-3"
                      style={{borderRadius: '12px', border: '2px solid #e9ecef'}}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="text-muted"
                    />
                    <a href="#" className="text-primary text-decoration-none fw-semibold">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3 py-3"
                    disabled={isLoading}
                    style={{
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      fontWeight: '600'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline-secondary"
                    size="lg"
                    className="w-100 mb-3 py-3"
                    onClick={handleDemoLogin}
                    style={{borderRadius: '12px', fontWeight: '600'}}
                  >
                    Try Demo Account
                  </Button>
                </Form>

                <div className="text-center mb-4">
                  <span className="text-muted">Or continue with</span>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant="outline-danger" 
                    size="lg"
                    className="py-3"
                    style={{borderRadius: '12px', fontWeight: '600'}}
                  >
                    <FaGoogle className="me-2" />
                    Continue with Google
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="lg"
                    className="py-3"
                    style={{borderRadius: '12px', fontWeight: '600'}}
                  >
                    <FaFacebook className="me-2" />
                    Continue with Facebook
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <span className="text-muted">Don't have an account? </span>
                  <a href="#" className="text-primary text-decoration-none fw-semibold">
                    Sign up
                  </a>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-white small" style={{opacity: 0.8}}>
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
