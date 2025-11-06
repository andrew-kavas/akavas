// Safely access environment variables defined in vite.config.js
const VERSION = process.env.VERSION || 'development';
const AKAVAS_API_URL = process.env.AKAVAS_API_URL;
const AKAVAS_APP_URL = process.env.AKAVAS_APP_URL;

// Set defaults for development
let apiUrl = AKAVAS_API_URL;
let appUrl = AKAVAS_APP_URL;

if (VERSION === 'development') {
  apiUrl = apiUrl || 'http://localhost:4000';
  appUrl = appUrl || 'http://localhost:3000';
}

const config = {
  akavas: {
    apiUrl,
    appUrl
  },
  port: VERSION === 'development' ? 3000 : 80,
  version: VERSION
};

export default config;
