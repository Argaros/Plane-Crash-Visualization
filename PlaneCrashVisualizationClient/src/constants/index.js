// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  ENDPOINTS: {
    OPERATORS: '/crashes/operators',
    MANUFACTURERS: '/crashes/manufacturers',
    MAP_DATA: '/crashes/map-data',
    SEARCH: '/crashes',
    STATISTICS: '/crashes/statistics',
  },
};

// Filter Configuration - Dynamic version that uses actual dataset statistics
export const createFilterConfig = (statistics) => {
  // Default fallback values if statistics aren't provided
  const defaults = {
    yearRange: { min: 1920, max: 2025 },
    fatalitiesRange: { min: 0, max: 600 },
    passengersRange: { min: 0, max: 500 },
    crewRange: { min: 0, max: 50 },
    aboardRange: { min: 0, max: 600 },
    groundRange: { min: 0, max: 100 }
  }

  const stats = statistics || defaults

  return {
    YEAR_RANGE: {
      MIN: stats.yearRange.min,
      MAX: stats.yearRange.max,
      DEFAULT_START: stats.yearRange.min,
      DEFAULT_END: stats.yearRange.max
    },
    FATALITIES_RANGE: {
      MIN: stats.fatalitiesRange.min,
      MAX: stats.fatalitiesRange.max,
      DEFAULT_MIN: stats.fatalitiesRange.min,
      DEFAULT_MAX: stats.fatalitiesRange.max
    },
    PASSENGERS_RANGE: {
      MIN: stats.passengersRange.min,
      MAX: stats.passengersRange.max,
      DEFAULT_MIN: stats.passengersRange.min,
      DEFAULT_MAX: stats.passengersRange.max
    },
    CREW_RANGE: {
      MIN: stats.crewRange.min,
      MAX: stats.crewRange.max,
      DEFAULT_MIN: stats.crewRange.min,
      DEFAULT_MAX: stats.crewRange.max
    },
    ABOARD_RANGE: {
      MIN: stats.aboardRange.min,
      MAX: stats.aboardRange.max,
      DEFAULT_MIN: stats.aboardRange.min,
      DEFAULT_MAX: stats.aboardRange.max
    },
    GROUND_RANGE: {
      MIN: stats.groundRange.min,
      MAX: stats.groundRange.max,
      DEFAULT_MIN: stats.groundRange.min,
      DEFAULT_MAX: stats.groundRange.max
    }
  }
}

// Legacy static filter configuration (for backward compatibility)
export const FILTER_CONFIG = {
  YEAR_RANGE: {
    MIN: 1920,
    MAX: 2025,
    DEFAULT_START: 1920,
    DEFAULT_END: 2025
  },
  FATALITIES_RANGE: {
    MIN: 0,
    MAX: 600,
    DEFAULT_MIN: 0,
    DEFAULT_MAX: 600
  },
  PASSENGERS_RANGE: {
    MIN: 0,
    MAX: 500,
    DEFAULT_MIN: 0,
    DEFAULT_MAX: 500
  },
  CREW_RANGE: {
    MIN: 0,
    MAX: 50,
    DEFAULT_MIN: 0,
    DEFAULT_MAX: 50
  },
  ABOARD_RANGE: {
    MIN: 0,
    MAX: 600,
    DEFAULT_MIN: 0,
    DEFAULT_MAX: 600
  },
  GROUND_RANGE: {
    MIN: 0,
    MAX: 100,
    DEFAULT_MIN: 0,
    DEFAULT_MAX: 100
  }
}

// UI Configuration
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 500,
  LOADING_MESSAGES: {
    FETCHING_DATA: 'Loading crash data...',
    FETCHING_OPERATORS: 'Loading operators...',
    FETCHING_MANUFACTURERS: 'Loading manufacturers...'
  }
}

// Map Configuration - re-exported from mapUtils for convenience
export { MAP_CONFIG, CLUSTER_CONFIG, FATALITY_THRESHOLDS, MARKER_COLORS, MARKER_SIZES } from '../utils/mapUtils.js'
