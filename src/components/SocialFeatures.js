import React, { useState, useEffect } from 'react';
import { Modal, Card, Button, Form, Badge, Row, Col, Alert, Tabs, Tab, ListGroup, Avatar } from 'react-bootstrap';
import { FaStar, FaThumbsUp, FaComment, FaShare, FaUser, FaHeart, FaReply, FaFlag, FaCheckCircle, FaQuestionCircle, FaLightbulb, FaEye } from 'react-icons/fa';

const SocialFeatures = ({ show, onHide, schoolId, schoolName }) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviews, setReviews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', category: 'overall' });
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '', category: 'general' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Sample data - in real app, this would come from API
  useEffect(() => {
    // Load sample reviews
    setReviews([
      {
        id: 1,
        user: 'Priya Sharma',
        avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=2563eb&color=fff',
        rating: 5,
        category: 'overall',
        comment: 'Excellent school with great facilities and dedicated teachers.',
        date: '2024-01-15',
        helpful: 12,
        verified: true
      },
      {
        id: 2,
        user: 'Rajesh Kumar',
        avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=dc2626&color=fff',
        rating: 4,
        category: 'academics',
        comment: 'Good academic performance and structured curriculum.',
        date: '2024-01-10',
        helpful: 8,
        verified: true
      }
    ]);

    // Load sample testimonials
    setTestimonials([
      {
        id: 1,
        user: 'Dr. Meera Singh',
        avatar: 'https://ui-avatars.com/api/?name=Dr+Meera+Singh&background=7c3aed&color=fff',
        role: 'Parent of Class 10 Student',
        content: 'This school has transformed my child\'s learning experience. The personalized attention and modern teaching methods are commendable.',
        date: '2024-01-12',
        featured: true
      },
      {
        id: 2,
        user: 'Amit Verma',
        avatar: 'https://ui-avatars.com/api/?name=Amit+Verma&background=f59e0b&color=fff',
        role: 'Parent of Class 8 Student',
        content: 'The school\'s focus on holistic development is impressive. My child has grown not just academically but also in confidence and leadership skills.',
        date: '2024-01-05',
        featured: false
      }
    ]);

    // Load sample questions
    setQuestions([
      {
        id: 1,
        user: 'Sneha Reddy',
        avatar: 'https://ui-avatars.com/api/?name=Sneha+Reddy&background=0891b2&color=fff',
        title: 'What is the admission process for Class 6?',
        content: 'I\'m looking to admit my child to Class 6. Can someone please explain the admission process and required documents?',
        category: 'admission',
        date: '2024-01-14',
        answers: 3,
        views: 45,
        solved: true
      },
      {
        id: 2,
        user: 'Vikram Malhotra',
        avatar: 'https://ui-avatars.com/api/?name=Vikram+Malhotra&background=be185d&color=fff',
        title: 'Transport facilities and routes',
        content: 'Does the school provide transport facilities? What are the available routes and timings?',
        category: 'transport',
        date: '2024-01-11',
        answers: 2,
        views: 32,
        solved: false
      }
    ]);
  }, [schoolId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      user: 'Current User',
      avatar: 'https://ui-avatars.com/api/?name=Current+User&background=2563eb&color=fff',
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', category: 'overall' });
    setShowReviewForm(false);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const question = {
      id: questions.length + 1,
      user: 'Current User',
      avatar: 'https://ui-avatars.com/api/?name=Current+User&background=2563eb&color=fff',
      ...newQuestion,
      date: new Date().toISOString().split('T')[0],
      answers: 0,
      views: 0,
      solved: false
    };
    setQuestions([question, ...questions]);
    setNewQuestion({ title: '', content: '', category: 'general' });
    setShowQuestionForm(false);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    
    // Prevent multiple simultaneous share operations
    if (isSharing) {
      return;
    }
    
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${schoolName} - Community Reviews`,
          text: `Check out community reviews and discussions for ${schoolName}`,
          url: window.location.origin + `/school/${schoolId}`
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${schoolName} - ${window.location.origin}/school/${schoolId}`);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Share error:', error);
      // If share fails, fallback to clipboard
      try {
        await navigator.clipboard.writeText(`${schoolName} - ${window.location.origin}/school/${schoolId}`);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        alert(`Check out ${schoolName} at: ${window.location.origin}/school/${schoolId}`);
      }
    } finally {
      // Add a small delay before allowing another share
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'text-warning' : 'text-muted'} 
        size={14}
      />
    ));
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="bg-gradient-primary text-white">
        <Modal.Title>
          <FaComment className="me-2" />
          Community & Reviews - {schoolName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          <Tab eventKey="reviews" title="Reviews & Ratings">
            <Row>
              <Col lg={4}>
                {/* Rating Summary */}
                <Card className="mb-3 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <h2 className="display-4 fw-bold text-primary mb-2">{getAverageRating()}</h2>
                    <div className="mb-2">
                      {renderStars(Math.round(getAverageRating()))}
                    </div>
                    <p className="text-muted mb-3">Based on {reviews.length} reviews</p>
                    
                    {/* Rating Distribution */}
                    <div className="text-start">
                      {[5, 4, 3, 2, 1].map(rating => {
                        const count = getRatingDistribution()[rating];
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={rating} className="d-flex align-items-center mb-2">
                            <span className="me-2 small">{rating}★</span>
                            <div className="flex-grow-1 me-2">
                              <div className="progress" style={{height: '6px'}}>
                                <div 
                                  className="progress-bar bg-warning" 
                                  style={{width: `${percentage}%`}}
                                ></div>
                              </div>
                            </div>
                            <span className="small text-muted">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Card.Body>
                </Card>

                <Button 
                  variant="primary" 
                  className="w-100 mb-3"
                  onClick={() => setShowReviewForm(true)}
                >
                  <FaStar className="me-2" />
                  Write a Review
                </Button>
              </Col>

              <Col lg={8}>
                {/* Reviews List */}
                <div className="mb-3">
                  <h6 className="mb-3">Recent Reviews</h6>
                  {reviews.map(review => (
                    <Card key={review.id} className="mb-3 border-0 shadow-sm">
                      <Card.Body>
                        <div className="d-flex align-items-start mb-2">
                          <img 
                            src={review.avatar} 
                            alt={review.user}
                            className="rounded-circle me-3"
                            style={{width: '40px', height: '40px'}}
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-1">
                              <h6 className="mb-0 me-2">{review.user}</h6>
                              {review.verified && (
                                <FaCheckCircle className="text-success" size={14} />
                              )}
                              <Badge bg="light" text="dark" className="ms-auto">
                                {review.category}
                              </Badge>
                            </div>
                            <div className="mb-2">
                              {renderStars(review.rating)}
                            </div>
                            <p className="mb-2">{review.comment}</p>
                            <div className="d-flex align-items-center justify-content-between">
                              <small className="text-muted">{review.date}</small>
                              <div className="d-flex align-items-center gap-2">
                                <Button variant="outline-secondary" size="sm">
                                  <FaThumbsUp className="me-1" />
                                  Helpful ({review.helpful})
                                </Button>
                                <Button variant="outline-primary" size="sm">
                                  <FaReply className="me-1" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="testimonials" title="Parent Testimonials">
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6>Parent Experiences</h6>
                <Button variant="outline-primary" size="sm">
                  <FaHeart className="me-2" />
                  Share Your Story
                </Button>
              </div>
              
              {testimonials.map(testimonial => (
                <Card key={testimonial.id} className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-start">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.user}
                        className="rounded-circle me-3"
                        style={{width: '50px', height: '50px'}}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-1">
                          <h6 className="mb-0 me-2">{testimonial.user}</h6>
                          {testimonial.featured && (
                            <Badge bg="warning" text="dark">Featured</Badge>
                          )}
                        </div>
                        <p className="text-muted small mb-2">{testimonial.role}</p>
                        <p className="mb-2">{testimonial.content}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <small className="text-muted">{testimonial.date}</small>
                          <div className="d-flex gap-2">
                            <Button variant="outline-secondary" size="sm">
                              <FaThumbsUp className="me-1" />
                              Like
                            </Button>
                            <Button variant="outline-primary" size="sm">
                              <FaShare className="me-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Tab>

          <Tab eventKey="qa" title="Q&A Community">
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6>Questions & Answers</h6>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => setShowQuestionForm(true)}
                >
                  <FaQuestionCircle className="me-2" />
                  Ask a Question
                </Button>
              </div>
              
              {questions.map(question => (
                <Card key={question.id} className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-start">
                      <img 
                        src={question.avatar} 
                        alt={question.user}
                        className="rounded-circle me-3"
                        style={{width: '40px', height: '40px'}}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-1">
                          <h6 className="mb-0 me-2">{question.title}</h6>
                          {question.solved && (
                            <Badge bg="success">Solved</Badge>
                          )}
                          <Badge bg="light" text="dark" className="ms-auto">
                            {question.category}
                          </Badge>
                        </div>
                        <p className="mb-2">{question.content}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <small className="text-muted">by {question.user} • {question.date}</small>
                          <div className="d-flex align-items-center gap-3">
                            <small className="text-muted">
                              <FaComment className="me-1" />
                              {question.answers} answers
                            </small>
                            <small className="text-muted">
                              <FaEye className="me-1" />
                              {question.views} views
                            </small>
                            <Button variant="outline-primary" size="sm">
                              Answer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>

        {/* Review Form Modal */}
        <Modal show={showReviewForm} onHide={() => setShowReviewForm(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Write a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleReviewSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <div className="d-flex gap-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <FaStar 
                      key={rating}
                      className={`cursor-pointer ${rating <= newReview.rating ? 'text-warning' : 'text-muted'}`}
                      size={24}
                      onClick={() => setNewReview({...newReview, rating})}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select 
                  value={newReview.category}
                  onChange={(e) => setNewReview({...newReview, category: e.target.value})}
                >
                  <option value="overall">Overall Experience</option>
                  <option value="academics">Academics</option>
                  <option value="facilities">Facilities</option>
                  <option value="teachers">Teachers</option>
                  <option value="sports">Sports & Activities</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your experience with this school..."
                  required
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Question Form Modal */}
        <Modal show={showQuestionForm} onHide={() => setShowQuestionForm(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Ask a Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleQuestionSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Question Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                  placeholder="What would you like to know?"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select 
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                >
                  <option value="general">General</option>
                  <option value="admission">Admission</option>
                  <option value="academics">Academics</option>
                  <option value="transport">Transport</option>
                  <option value="fees">Fees & Payment</option>
                  <option value="activities">Activities</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Question Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                  placeholder="Provide more details about your question..."
                  required
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => setShowQuestionForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Ask Question
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleShare} disabled={isSharing}>
          {isSharing ? (
            <>
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Sharing...</span>
              </div>
              Sharing...
            </>
          ) : (
            <>
              <FaShare className="me-2" />
              Share Progress
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SocialFeatures; 