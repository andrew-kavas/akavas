// Vite environment variables (from .env files)
const MODE = import.meta.env.MODE; // 'development' or 'production'
const API_URL = import.meta.env.VITE_AKAVAS_API_URL;
const APP_URL = import.meta.env.VITE_AKAVAS_APP_URL;

// Development defaults
const DEV_API_URL = 'http://localhost:4000';
const DEV_APP_URL = 'http://localhost:3000';

const config = {
  akavas: {
    apiUrl: MODE === 'development' ? API_URL || DEV_API_URL : API_URL,
    appUrl: MODE === 'development' ? APP_URL || DEV_APP_URL : APP_URL
  },
  port: MODE === 'development' ? 3000 : 80,
  version: MODE
};

export default config;
