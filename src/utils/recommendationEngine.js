// AI Recommendation Engine for School Suggestions

export const calculateSchoolScore = (school, preferences) => {
  let score = 0;
  const weights = {
    location: 0.25,
    budget: 0.20,
    affiliation: 0.15,
    facilities: 0.15,
    performance: 0.15,
    reviews: 0.10
  };

  // Location score (distance from preferred location)
  if (preferences.location && school.city) {
    const locationMatch = preferences.location.toLowerCase() === school.city.toLowerCase();
    score += locationMatch ? weights.location : weights.location * 0.3;
  }

  // Budget score
  if (preferences.budget && school.fees) {
    const { min, max } = preferences.budget;
    if (school.fees >= min && school.fees <= max) {
      score += weights.budget;
    } else if (school.fees <= max * 1.2) {
      score += weights.budget * 0.7;
    } else {
      score += weights.budget * 0.3;
    }
  }

  // Affiliation score
  if (preferences.preferredAffiliations && preferences.preferredAffiliations.length > 0) {
    const affiliationMatch = preferences.preferredAffiliations.includes(school.affiliation);
    score += affiliationMatch ? weights.affiliation : weights.affiliation * 0.5;
  }

  // Facilities score (simulated based on school data)
  const facilitiesScore = Math.random() * 0.8 + 0.2; // Simulated facilities rating
  score += facilitiesScore * weights.facilities;

  // Performance score (simulated based on school ranking)
  const performanceScore = school.id <= 10 ? 0.9 : Math.random() * 0.6 + 0.3;
  score += performanceScore * weights.performance;

  // Reviews score (simulated)
  const reviewsScore = Math.random() * 0.8 + 0.2;
  score += reviewsScore * weights.reviews;

  return Math.round(score * 100) / 100;
};

export const getRecommendedSchools = (allSchools, preferences, limit = 6) => {
  const schoolsWithScores = allSchools.map(school => ({
    ...school,
    score: calculateSchoolScore(school, preferences),
    matchReasons: getMatchReasons(school, preferences)
  }));

  // Sort by score and return top recommendations
  return schoolsWithScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const getMatchReasons = (school, preferences) => {
  const reasons = [];

  // Location match
  if (preferences.location && school.city && 
      preferences.location.toLowerCase() === school.city.toLowerCase()) {
    reasons.push(`Located in your preferred city: ${school.city}`);
  }

  // Budget match
  if (preferences.budget && school.fees) {
    const { min, max } = preferences.budget;
    if (school.fees >= min && school.fees <= max) {
      reasons.push(`Fits your budget: ₹${school.fees}/month`);
    }
  }

  // Affiliation match
  if (preferences.preferredAffiliations && 
      preferences.preferredAffiliations.includes(school.affiliation)) {
    reasons.push(`Preferred board: ${school.affiliation}`);
  }

  // Top rated schools
  if (school.id <= 10) {
    reasons.push('Top-rated school with excellent performance');
  }

  // Special features
  if (school.fees > 5000) {
    reasons.push('Premium facilities and infrastructure');
  }

  return reasons;
};

export const getPersonalizedInsights = (schools, preferences) => {
  const insights = [];

  // Budget insights
  const avgFees = schools.reduce((sum, school) => sum + school.fees, 0) / schools.length;
  if (preferences.budget) {
    if (avgFees > preferences.budget.max) {
      insights.push('Most recommended schools are above your budget. Consider increasing your budget range for better options.');
    } else if (avgFees < preferences.budget.min) {
      insights.push('You can find quality schools within your budget. Consider expanding your search area.');
    }
  }

  // Location insights
  const cities = [...new Set(schools.map(s => s.city))];
  if (cities.length > 1) {
    insights.push(`Top schools are spread across ${cities.length} cities: ${cities.join(', ')}`);
  }

  // Affiliation insights
  const affiliations = [...new Set(schools.map(s => s.affiliation))];
  if (affiliations.length > 1) {
    insights.push(`Diverse board options available: ${affiliations.join(', ')}`);
  }

  return insights;
};

export const generateSchoolComparison = (schools) => {
  if (schools.length < 2) return null;

  // Calculate scores for schools if they don't have them
  const schoolsWithScores = schools.map(school => ({
    ...school,
    score: school.score || (70 + Math.random() * 30) // Default score if not available
  }));

  const comparison = {
    feeRange: {
      min: Math.min(...schoolsWithScores.map(s => s.fees)),
      max: Math.max(...schoolsWithScores.map(s => s.fees)),
      avg: Math.round(schoolsWithScores.reduce((sum, s) => sum + s.fees, 0) / schoolsWithScores.length)
    },
    affiliations: [...new Set(schoolsWithScores.map(s => s.affiliation))],
    cities: [...new Set(schoolsWithScores.map(s => s.city))],
    bestValue: schoolsWithScores.reduce((best, current) => 
      current.score > best.score ? current : best
    ),
    mostAffordable: schoolsWithScores.reduce((cheapest, current) => 
      current.fees < cheapest.fees ? current : cheapest
    )
  };

  return comparison;
}; 