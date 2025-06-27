import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  profile: null,
  preferences: {
    location: '',
    budget: { min: 0, max: 10000 },
    preferredAffiliations: [],
    childAge: null,
    specialNeeds: [],
    interests: []
  },
  savedSearches: [],
  favorites: [],
  searchHistory: [],
  isDarkMode: false,
  isAuthenticated: false
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isDarkMode: state.isDarkMode
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    case 'ADD_SAVED_SEARCH':
      return {
        ...state,
        savedSearches: [...state.savedSearches, action.payload]
      };
    case 'REMOVE_SAVED_SEARCH':
      return {
        ...state,
        savedSearches: state.savedSearches.filter(search => search.id !== action.payload)
      };
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav !== action.payload)
      };
    case 'ADD_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: [action.payload, ...state.searchHistory.slice(0, 9)]
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      };
    case 'LOAD_USER_DATA':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const userData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_USER_DATA', payload: userData });
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  // Save user data to localStorage whenever state changes
  useEffect(() => {
    if (state.isAuthenticated || state.favorites.length > 0 || state.savedSearches.length > 0) {
      localStorage.setItem('userData', JSON.stringify({
        user: state.user,
        profile: state.profile,
        preferences: state.preferences,
        savedSearches: state.savedSearches,
        favorites: state.favorites,
        searchHistory: state.searchHistory,
        isDarkMode: state.isDarkMode,
        isAuthenticated: state.isAuthenticated
      }));
    }
  }, [state]);

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userData');
  };

  const updateProfile = (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  const updatePreferences = (preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const addSavedSearch = (search) => {
    const searchWithId = { ...search, id: Date.now() };
    dispatch({ type: 'ADD_SAVED_SEARCH', payload: searchWithId });
  };

  const removeSavedSearch = (searchId) => {
    dispatch({ type: 'REMOVE_SAVED_SEARCH', payload: searchId });
  };

  const addFavorite = (schoolId) => {
    dispatch({ type: 'ADD_FAVORITE', payload: schoolId });
  };

  const removeFavorite = (schoolId) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: schoolId });
  };

  const addSearchHistory = (search) => {
    dispatch({ type: 'ADD_SEARCH_HISTORY', payload: search });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
    updatePreferences,
    addSavedSearch,
    removeSavedSearch,
    addFavorite,
    removeFavorite,
    addSearchHistory,
    toggleDarkMode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 