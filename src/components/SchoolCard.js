import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Badge, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill, BsShare, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FaStar, FaEye } from 'react-icons/fa';

const fallbackImage = 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80';

const getFavorites = () => {
  const favs = localStorage.getItem('favoriteSchools');
  return favs ? JSON.parse(favs) : [];
};

const getBookmarks = () => {
  const bookmarks = localStorage.getItem('bookmarkedSchools');
  return bookmarks ? JSON.parse(bookmarks) : [];
};

const SchoolCard = ({ school, showToast = true }) => {
  const [favorites, setFavorites] = useState(getFavorites());
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [showShareToast, setShowShareToast] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 100) + 50);
  const [isSharing, setIsSharing] = useState(false);
  const cardRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const isFav = favorites.includes(school.id);
  const isBookmarked = bookmarks.includes(school.id);

  useEffect(() => {
    localStorage.setItem('favoriteSchools', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('bookmarkedSchools', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setFavorites(favs =>
      favs.includes(school.id)
        ? favs.filter(id => id !== school.id)
        : [...favs, school.id]
    );
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 1000);
  };

  const toggleBookmark = (e) => {
    e.stopPropagation();
    setBookmarks(bookmarks =>
      bookmarks.includes(school.id)
        ? bookmarks.filter(id => id !== school.id)
        : [...bookmarks, school.id]
    );
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    
    // Prevent multiple simultaneous share operations
    if (isSharing) {
      return;
    }
    
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: school.name,
          text: `Check out ${school.name} - ${school.location}`,
          url: window.location.origin + `/school/${school.id}`
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${school.name} - ${window.location.origin}/school/${school.id}`);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
      }
    } catch (error) {
      console.log('Share error:', error);
      // If share fails, fallback to clipboard
      try {
        await navigator.clipboard.writeText(`${school.name} - ${window.location.origin}/school/${school.id}`);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        // Final fallback - show alert
        alert(`Check out ${school.name} at: ${window.location.origin}/school/${school.id}`);
      }
    } finally {
      // Add a small delay before allowing another share
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  // Touch gesture handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - add to favorites
        setFavorites(favs =>
          favs.includes(school.id)
            ? favs.filter(id => id !== school.id)
            : [...favs, school.id]
        );
        setIsLiked(true);
        setTimeout(() => setIsLiked(false), 1000);
      } else {
        // Swipe right - add to bookmarks
        setBookmarks(bookmarks =>
          bookmarks.includes(school.id)
            ? bookmarks.filter(id => id !== school.id)
            : [...bookmarks, school.id]
        );
      }
    }
  };

  return (
    <>
      <Card 
        ref={cardRef}
        className="h-100 shadow border-0 position-relative school-card" 
        style={{
          borderRadius:'1.2rem', 
          background:'#fff', 
          overflow:'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => window.location.href = `/school/${school.id}`}
      >
        <Card.Img 
          variant="top" 
          src={school.image || fallbackImage} 
          alt={school.name} 
          style={{
            objectFit:'cover', 
            height:170, 
            borderTopLeftRadius:'1.2rem', 
            borderTopRightRadius:'1.2rem', 
            borderBottom:'1px solid #f1f5f9'
          }} 
        />
        
        {/* Mobile Action Buttons */}
        <div className="position-absolute top-0 end-0 m-2 d-flex gap-1">
          <Button
            variant="light"
            size="sm"
            onClick={toggleFavorite}
            className="action-btn"
            style={{
              borderRadius:'50%', 
              width:'35px', 
              height:'35px', 
              padding:0,
              boxShadow:'0 2px 8px rgba(0,0,0,0.15)',
              border: 'none',
              background: isFav ? 'rgba(220,38,38,0.9)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)'
            }}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFav ? <BsHeartFill color="#fff" size={16} /> : <BsHeart color="#e11d48" size={16} />}
          </Button>
          
          <Button
            variant="light"
            size="sm"
            onClick={toggleBookmark}
            className="action-btn"
            style={{
              borderRadius:'50%', 
              width:'35px', 
              height:'35px', 
              padding:0,
              boxShadow:'0 2px 8px rgba(0,0,0,0.15)',
              border: 'none',
              background: isBookmarked ? 'rgba(59,130,246,0.9)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)'
            }}
            aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            {isBookmarked ? <BsBookmarkFill color="#fff" size={16} /> : <BsBookmark color="#3b82f6" size={16} />}
          </Button>
        </div>

        <Card.Body className="d-flex flex-column justify-content-between" style={{padding:'1.2rem'}}>
          <div>
            <Card.Title className="mb-2" style={{fontWeight:700, fontSize:'1.1rem', color:'#222'}}>
              {school.name}
            </Card.Title>
            <Card.Text className="mb-2" style={{color:'#2563eb', fontWeight:500, fontSize:'0.98rem'}}>
              {school.location}
            </Card.Text>
            
            <div className="mb-2 d-flex align-items-center gap-2 flex-wrap">
              <Badge bg="light" text="dark" style={{fontWeight:600, border:'1px solid #e5e7eb', fontSize:'0.92rem'}}>
                {school.affiliation}
              </Badge>
              {school.fees && (
                <Badge bg="light" text="success" style={{fontWeight:600, border:'1px solid #e5e7eb', fontSize:'0.92rem'}}>
                  ₹{school.fees}/month
                </Badge>
              )}
            </div>

            {/* Rating and Views */}
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-1">
                <FaStar className="text-warning" size={14} />
                <span className="small fw-semibold">{school.rating || 4.2}</span>
              </div>
              <div className="d-flex align-items-center gap-1 text-muted">
                <FaEye size={12} />
                <span className="small">{viewCount}</span>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <Button 
              as={Link} 
              to={`/school/${school.id || ''}`} 
              variant="primary" 
              size="sm"
              style={{borderRadius:'0.5rem', fontWeight:600, flex: 1}}
              onClick={(e) => e.stopPropagation()}
            >
              View Profile
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleShare}
              disabled={isSharing}
              style={{borderRadius:'0.5rem', minWidth: '40px'}}
            >
              {isSharing ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Sharing...</span>
                </div>
              ) : (
                <BsShare size={14} />
              )}
            </Button>
          </div>
        </Card.Body>

        {/* Like Animation */}
        {isLiked && (
          <div className="position-absolute top-50 start-50 translate-middle" style={{zIndex: 10}}>
            <div className="text-danger" style={{fontSize: '3rem', animation: 'heartBeat 1s ease-in-out'}}>
              ❤️
      </div>
    </div>
        )}
      </Card>

      {/* Share Toast */}
      {showToast && showShareToast && (
        <Toast 
          show={showShareToast} 
          onClose={() => setShowShareToast(false)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Link Copied!</strong>
          </Toast.Header>
          <Toast.Body>School link copied to clipboard</Toast.Body>
        </Toast>
      )}

      <style jsx>{`
        .school-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
        
        .action-btn:hover {
          transform: scale(1.1);
        }
        
        @keyframes heartBeat {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        @media (max-width: 768px) {
          .school-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default SchoolCard;
