import React from 'react';

const AnimatedBackground = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  }}>
    <svg width="100vw" height="100vh" style={{position:'absolute', top:0, left:0, width:'100vw', height:'100vh'}}>
      <defs>
        <radialGradient id="bg-gradient" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60%" cy="40%" rx="500" ry="300" fill="url(#bg-gradient)">
        <animateTransform attributeName="transform" type="rotate" from="0 600 400" to="360 600 400" dur="40s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  </div>
);

export default AnimatedBackground; 