import React, { useState, useEffect } from 'react';
import { Modal, Badge, ProgressBar, Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { FaTrophy, FaStar, FaHeart, FaSearch, FaBookmark, FaShare, FaEye, FaMedal, FaCrown, FaGem } from 'react-icons/fa';

const GamificationSystem = ({ show, onHide, userStats }) => {
  const [achievements, setAchievements] = useState([]);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);
  const [recentAchievements, setRecentAchievements] = useState([]);

  // Achievement definitions
  const achievementDefinitions = [
    {
      id: 'first_school',
      title: 'First Steps',
      description: 'View your first school profile',
      icon: FaEye,
      color: 'primary',
      xp: 50,
      condition: (stats) => stats.schoolsViewed >= 1
    },
    {
      id: 'school_explorer',
      title: 'School Explorer',
      description: 'View 10 different schools',
      icon: FaSearch,
      color: 'info',
      xp: 100,
      condition: (stats) => stats.schoolsViewed >= 10
    },
    {
      id: 'favorite_collector',
      title: 'Favorite Collector',
      description: 'Add 5 schools to favorites',
      icon: FaHeart,
      color: 'danger',
      xp: 150,
      condition: (stats) => stats.favoritesCount >= 5
    },
    {
      id: 'bookmark_master',
      title: 'Bookmark Master',
      description: 'Bookmark 10 schools',
      icon: FaBookmark,
      color: 'warning',
      xp: 200,
      condition: (stats) => stats.bookmarksCount >= 10
    },
    {
      id: 'social_butterfly',
      title: 'Social Butterfly',
      description: 'Share 5 schools',
      icon: FaShare,
      color: 'success',
      xp: 100,
      condition: (stats) => stats.sharesCount >= 5
    },
    {
      id: 'comparison_expert',
      title: 'Comparison Expert',
      description: 'Compare 3 schools',
      icon: FaStar,
      color: 'purple',
      xp: 300,
      condition: (stats) => stats.comparisonsCount >= 3
    },
    {
      id: 'school_reviewer',
      title: 'School Reviewer',
      description: 'Rate 5 schools',
      icon: FaStar,
      color: 'warning',
      xp: 250,
      condition: (stats) => stats.ratingsCount >= 5
    },
    {
      id: 'daily_visitor',
      title: 'Daily Visitor',
      description: 'Visit the platform for 7 consecutive days',
      icon: FaCrown,
      color: 'gold',
      xp: 500,
      condition: (stats) => stats.consecutiveDays >= 7
    },
    {
      id: 'school_hunter',
      title: 'School Hunter',
      description: 'View 50 different schools',
      icon: FaGem,
      color: 'purple',
      xp: 1000,
      condition: (stats) => stats.schoolsViewed >= 50
    },
    {
      id: 'community_leader',
      title: 'Community Leader',
      description: 'Help 10 other users with reviews',
      icon: FaMedal,
      color: 'success',
      xp: 750,
      condition: (stats) => stats.helpfulReviews >= 10
    }
  ];

  // Badge definitions
  const badgeDefinitions = [
    {
      id: 'bronze_explorer',
      title: 'Bronze Explorer',
      description: 'Begin your school discovery journey',
      icon: FaSearch,
      color: '#cd7f32',
      requirement: 'View 5 schools',
      unlocked: false
    },
    {
      id: 'silver_collector',
      title: 'Silver Collector',
      description: 'Build your school collection',
      icon: FaHeart,
      color: '#c0c0c0',
      requirement: 'Add 10 schools to favorites',
      unlocked: false
    },
    {
      id: 'gold_analyst',
      title: 'Gold Analyst',
      description: 'Master the art of school comparison',
      icon: FaStar,
      color: '#ffd700',
      requirement: 'Compare 10 schools',
      unlocked: false
    },
    {
      id: 'platinum_reviewer',
      title: 'Platinum Reviewer',
      description: 'Become a trusted school reviewer',
      icon: FaMedal,
      color: '#e5e4e2',
      requirement: 'Write 20 helpful reviews',
      unlocked: false
    },
    {
      id: 'diamond_expert',
      title: 'Diamond Expert',
      description: 'Reach the pinnacle of school expertise',
      icon: FaCrown,
      color: '#b9f2ff',
      requirement: 'Complete all achievements',
      unlocked: false
    }
  ];

  useEffect(() => {
    if (userStats) {
      checkAchievements(userStats);
      calculateUserLevel(userStats);
    }
  }, [userStats]);

  const checkAchievements = (stats) => {
    const unlockedAchievements = achievementDefinitions.filter(achievement => 
      achievement.condition(stats)
    );
    setAchievements(unlockedAchievements);
  };

  const calculateUserLevel = (stats) => {
    const totalXP = achievements.reduce((sum, achievement) => sum + achievement.xp, 0);
    const level = Math.floor(totalXP / 1000) + 1;
    const xpInCurrentLevel = totalXP % 1000;
    
    setUserLevel(level);
    setUserXP(xpInCurrentLevel);
  };

  const getLevelProgress = () => {
    return (userXP / 1000) * 100;
  };

  const getNextLevelXP = () => {
    return 1000 - userXP;
  };

  const getBadgeStatus = (badge) => {
    if (!userStats) return false;
    
    switch (badge.id) {
      case 'bronze_explorer':
        return userStats.schoolsViewed >= 5;
      case 'silver_collector':
        return userStats.favoritesCount >= 10;
      case 'gold_analyst':
        return userStats.comparisonsCount >= 10;
      case 'platinum_reviewer':
        return userStats.helpfulReviews >= 20;
      case 'diamond_expert':
        return achievements.length === achievementDefinitions.length;
      default:
        return false;
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-gradient-primary text-white">
        <Modal.Title>
          <FaTrophy className="me-2" />
          Your Achievements & Progress
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* User Level Progress */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body>
            <div className="text-center mb-3">
              <div className="position-relative d-inline-block">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {userLevel}
                </div>
                <div className="position-absolute top-0 start-100 translate-middle">
                  <FaCrown className="text-warning" size={20} />
                </div>
              </div>
              <h5 className="mt-2 mb-1">Level {userLevel}</h5>
              <p className="text-muted mb-2">School Discovery Expert</p>
            </div>
            
            <div className="mb-2">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-muted">Progress to Level {userLevel + 1}</small>
                <small className="text-muted">{userXP}/1000 XP</small>
              </div>
              <ProgressBar 
                now={getLevelProgress()} 
                variant="primary"
                style={{height: '8px', borderRadius: '4px'}}
              />
              <small className="text-muted">
                {getNextLevelXP()} XP needed for next level
              </small>
            </div>
          </Card.Body>
        </Card>

        {/* Recent Achievements */}
        {recentAchievements.length > 0 && (
          <Alert variant="success" className="mb-4">
            <h6 className="mb-2">🎉 Recent Achievements!</h6>
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="d-flex align-items-center mb-1">
                <achievement.icon className="me-2" />
                <span>{achievement.title}</span>
                <Badge bg="success" className="ms-auto">+{achievement.xp} XP</Badge>
              </div>
            ))}
          </Alert>
        )}

        {/* Achievements Grid */}
        <h6 className="mb-3">
          <FaTrophy className="me-2 text-warning" />
          Achievements ({achievements.length}/{achievementDefinitions.length})
        </h6>
        <Row className="g-3 mb-4">
          {achievementDefinitions.map((achievement) => {
            const isUnlocked = achievements.some(a => a.id === achievement.id);
            const IconComponent = achievement.icon;
            
            return (
              <Col md={6} key={achievement.id}>
                <Card 
                  className={`h-100 border-0 ${isUnlocked ? 'shadow-sm' : 'bg-light'}`}
                  style={{opacity: isUnlocked ? 1 : 0.6}}
                >
                  <Card.Body className="text-center p-3">
                    <div className="mb-2">
                      <IconComponent 
                        size={24} 
                        className={`text-${achievement.color}`}
                        style={{opacity: isUnlocked ? 1 : 0.5}}
                      />
                    </div>
                    <h6 className="mb-1" style={{fontSize: '0.9rem'}}>
                      {achievement.title}
                    </h6>
                    <p className="text-muted mb-2" style={{fontSize: '0.8rem'}}>
                      {achievement.description}
                    </p>
                    <Badge 
                      bg={isUnlocked ? achievement.color : 'secondary'}
                      className="small"
                    >
                      {isUnlocked ? `+${achievement.xp} XP` : 'Locked'}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Badges */}
        <h6 className="mb-3">
          <FaMedal className="me-2 text-warning" />
          Badges
        </h6>
        <Row className="g-3">
          {badgeDefinitions.map((badge) => {
            const isUnlocked = getBadgeStatus(badge);
            const IconComponent = badge.icon;
            
            return (
              <Col md={6} key={badge.id}>
                <Card 
                  className={`h-100 border-0 ${isUnlocked ? 'shadow-sm' : 'bg-light'}`}
                  style={{opacity: isUnlocked ? 1 : 0.6}}
                >
                  <Card.Body className="text-center p-3">
                    <div className="mb-2">
                      <IconComponent 
                        size={32} 
                        style={{color: isUnlocked ? badge.color : '#ccc'}}
                      />
                    </div>
                    <h6 className="mb-1" style={{fontSize: '0.9rem'}}>
                      {badge.title}
                    </h6>
                    <p className="text-muted mb-2" style={{fontSize: '0.8rem'}}>
                      {badge.description}
                    </p>
                    <small className="text-muted">
                      {isUnlocked ? 'Unlocked!' : badge.requirement}
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">
          <FaShare className="me-2" />
          Share Progress
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GamificationSystem; 