const affiliations = ['CBSE', 'ICSE', 'State Board'];

const allSchools = [
  { 
    id: 1, 
    name: 'Green Valley Public School', 
    location: 'Sector 12, Noida', 
    affiliation: 'CBSE', 
    city: 'Noida', 
    fees: 3500, 
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80', // Modern school building
    lat: 28.583, 
    lng: 77.357,
    rating: 4.5,
    established: 1995,
    classSize: 30,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Sports Ground'],
    achievements: ['Best CBSE School 2023', 'Excellence in Sports'],
    admissionOpen: true,
    lastDate: '2024-03-31'
  },
  { 
    id: 2, 
    name: 'Sunrise International Academy', 
    location: 'MG Road, Bangalore', 
    affiliation: 'ICSE', 
    city: 'Bangalore', 
    fees: 5000, 
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80', // School campus
    lat: 12.971, 
    lng: 77.594,
    rating: 4.7,
    established: 1988,
    classSize: 25,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Sports Ground', 'Swimming Pool'],
    achievements: ['Best ICSE School 2023', 'Academic Excellence Award'],
    admissionOpen: true,
    lastDate: '2024-04-15'
  },
  { 
    id: 3, 
    name: 'Bluebell High School', 
    location: 'Salt Lake, Kolkata', 
    affiliation: 'CBSE', 
    city: 'Kolkata', 
    fees: 4200, 
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // School entrance
    lat: 22.585, 
    lng: 88.417,
    rating: 4.3,
    established: 1992,
    classSize: 35,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library'],
    achievements: ['Best School in Salt Lake'],
    admissionOpen: false,
    lastDate: '2024-02-28'
  },
  { 
    id: 4, 
    name: 'Starlight Convent', 
    location: 'Dwarka, Delhi', 
    affiliation: 'CBSE', 
    city: 'Delhi', 
    fees: 3900, 
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', // School building
    lat: 28.573, 
    lng: 77.012,
    rating: 4.6,
    established: 1990,
    classSize: 28,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Sports Ground', 'Auditorium'],
    achievements: ['Best Convent School 2023', 'Cultural Excellence'],
    admissionOpen: true,
    lastDate: '2024-03-20'
  },
  { 
    id: 5, 
    name: 'Maple Leaf School', 
    location: 'Viman Nagar, Pune', 
    affiliation: 'ICSE', 
    city: 'Pune', 
    fees: 6000, 
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // School campus view
    lat: 18.567, 
    lng: 73.914,
    rating: 4.8,
    established: 1985,
    classSize: 22,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Sports Ground', 'Swimming Pool', 'Auditorium'],
    achievements: ['Best ICSE School in Pune', 'International Recognition'],
    admissionOpen: true,
    lastDate: '2024-04-30'
  },
  { 
    id: 6, 
    name: 'Evergreen Public School', 
    location: 'Vasundhara Enclave, East Delhi', 
    affiliation: 'CBSE', 
    city: 'Delhi', 
    fees: 3100, 
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80', // School building
    lat: 28.609, 
    lng: 77.315,
    rating: 4.2,
    established: 1998,
    classSize: 32,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Sports Ground'],
    achievements: ['Best Value School 2023'],
    admissionOpen: true,
    lastDate: '2024-03-15'
  },
  { 
    id: 7, 
    name: 'Silver Oak Academy', 
    location: 'Sector 21, Chandigarh', 
    affiliation: 'State Board', 
    city: 'Chandigarh', 
    fees: 2500, 
    image: 'https://images.unsplash.com/photo-1461800919507-79b16743b257?auto=format&fit=crop&w=400&q=80', // School campus
    lat: 30.733, 
    lng: 76.779,
    rating: 4.0,
    established: 2000,
    classSize: 40,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library'],
    achievements: ['Best State Board School'],
    admissionOpen: true,
    lastDate: '2024-03-25'
  },
  { 
    id: 8, 
    name: 'Harmony International', 
    location: 'Anna Nagar, Chennai', 
    affiliation: 'ICSE', 
    city: 'Chennai', 
    fees: 4700, 
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', // School building
    lat: 13.087, 
    lng: 80.217,
    rating: 4.4,
    established: 1993,
    classSize: 26,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Sports Ground'],
    achievements: ['Best International School in Chennai'],
    admissionOpen: false,
    lastDate: '2024-01-31'
  },
  { 
    id: 9, 
    name: 'Lotus Valley School', 
    location: 'Sector 50, Noida', 
    affiliation: 'CBSE', 
    city: 'Noida', 
    fees: 3800, 
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80', // Modern school
    lat: 28.570, 
    lng: 77.375,
    rating: 4.5,
    established: 1996,
    classSize: 30,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Sports Ground'],
    achievements: ['Excellence in Academics', 'Sports Champions'],
    admissionOpen: true,
    lastDate: '2024-04-10'
  },
  { 
    id: 10, 
    name: 'Bright Future School', 
    location: 'Kothrud, Pune', 
    affiliation: 'CBSE', 
    city: 'Pune', 
    fees: 4100, 
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', // School campus
    lat: 18.507, 
    lng: 73.807,
    rating: 4.3,
    established: 1994,
    classSize: 28,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library', 'Sports Ground'],
    achievements: ['Best CBSE School in Kothrud'],
    admissionOpen: true,
    lastDate: '2024-03-28'
  },
];

// Generate additional schools for variety
for (let i = 11; i <= 100; i++) {
  const city = i % 10 === 0 ? 'Delhi' : i % 5 === 0 ? 'Bangalore' : i % 3 === 0 ? 'Pune' : 'Noida';
  const affiliation = affiliations[i % affiliations.length];
  const fees = 2500 + (i % 10) * 500;
  const rating = 3.5 + (Math.random() * 1.5);
  const established = 1980 + (i % 30);
  const classSize = 25 + (i % 15);
  
  // Use better school images for generated schools
  const betterSchoolImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80', // Modern school building
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80', // School campus
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // School entrance
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', // School building
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // School campus view
    'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80', // School building
    'https://images.unsplash.com/photo-1461800919507-79b16743b257?auto=format&fit=crop&w=400&q=80', // School campus
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', // School building
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80', // Modern school
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', // School campus
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80', // School campus
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // School entrance
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', // School building
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // School campus view
    'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80', // School building
  ];
  
  allSchools.push({
    id: i,
    name: `AI Public School ${i}`,
    location: `Sector ${i}, ${city}`,
    affiliation: affiliation,
    city: city,
    fees: fees,
    image: betterSchoolImages[i % betterSchoolImages.length],
    lat: 28.6 + (i % 10) * 0.01,
    lng: 77.3 + (i % 10) * 0.01,
    rating: Math.round(rating * 10) / 10,
    established: established,
    classSize: classSize,
    facilities: ['Smart Classrooms', 'Science Lab', 'Computer Lab', 'Library'],
    achievements: [`Excellence Award ${2020 + (i % 5)}`],
    admissionOpen: Math.random() > 0.3,
    lastDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
  });
}

export default allSchools; 