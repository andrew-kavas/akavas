const { process } = globalThis;

let { env } = process;

const { VERSION: version } = env;

if (version === 'development') {
  env = {
    ...env,
    AKAVAS_API_URL: 'http://localhost:4000',
    AKAVAS_APP_URL: 'http://localhost:3000'
  };
}

const config = {
  akavas: {
    // apiUrl: 'https://akavas-api.fly.dev',
    apiUrl: env.AKAVAS_API_URL,
    // appUrl: 'https://akavas-app.fly.dev'
    appUrl: env.AKAVAS_APP_URL
  },
  port: version === 'development' ? 3000 : 80,
  version
};

export default config;
