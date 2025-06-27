import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Container } from 'react-bootstrap';
import SchoolCard from './SchoolCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SchoolListCarousel.css';

const schoolImages = [
  'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80',
];

const schools = [
  {
    name: 'Mahavir Senior Model School',
    location: 'Ashok Vihar, North West Delhi',
    affiliation: 'CBSE',
    image: schoolImages[0],
    fees: 3500,
  },
  {
    name: 'Maxfort School Dwarka',
    location: 'Dwarka, South West Delhi',
    affiliation: 'CBSE',
    image: schoolImages[1],
    fees: 4200,
  },
  {
    name: 'Shanti Gyan Niketan Senior Secondary Public School',
    location: 'Dwarka, South West Delhi',
    affiliation: 'CBSE',
    image: schoolImages[2],
    fees: 3900,
  },
  {
    name: 'Evergreen Public School',
    location: 'Vasundhara Enclave, East Delhi',
    affiliation: 'CBSE',
    image: schoolImages[3],
    fees: 4100,
  },
  {
    name: 'Lotus Valley School',
    location: 'Sector 50, Noida',
    affiliation: 'CBSE',
    image: schoolImages[4],
    fees: 3800,
  },
  {
    name: 'Maple Leaf School',
    location: 'Viman Nagar, Pune',
    affiliation: 'ICSE',
    image: schoolImages[5],
    fees: 6000,
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: true,
  pauseOnHover: false,
  pauseOnFocus: false,
  centerMode: true,
  centerPadding: '0px',
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2, centerMode: false } },
    { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
  ],
  beforeChange: (current, next) => {
    // For custom class assignment
  },
};

const SchoolList = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    // Load schools data from the data file
    import('../data/schools.js').then(module => {
      const allSchools = module.default || module.allSchools || [];
      // Take the first 6 schools for the home page carousel
      setSchools(allSchools.slice(0, 6));
    });
  }, []);

  return (
    <Container className="mb-5">
      <h2 className="mb-4">Most Applied Schools in <span className="text-primary">Delhi</span></h2>
      <Slider {...sliderSettings} className="school-carousel">
        {schools.map((school, idx) => (
          <div key={school.id || idx} className="school-carousel-slide">
            <div className="school-carousel-card-wrapper">
              <SchoolCard school={school} />
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default SchoolList; 