// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    PARSE_PIPELINE: '/pipelines/parse',
    HEALTH_CHECK: '/'
  }
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const API_ENDPOINTS = {
  PARSE_PIPELINE: getApiUrl(API_CONFIG.ENDPOINTS.PARSE_PIPELINE),
  HEALTH_CHECK: getApiUrl(API_CONFIG.ENDPOINTS.HEALTH_CHECK)
};

export default API_CONFIG;
