const getRequiredEnvVariable = (key: string): string => {
  const envValue = process.env[key];
  if (!envValue) {
    throw new Error(`Required env variable ${key} was not found!`);
  }
  return envValue;
};

interface Config {
  env: string;
  auth0: {
    clientId: string;
    domain: string;
  };
}

const config: Config = {
  env: getRequiredEnvVariable('NODE_ENV'),
  auth0: {
    clientId: process.env.REACT_APP_CYBERINSUR_AUTH0_CLIENT_ID || 'PfMbGNRX26jS24ABGkl0QpZ5G8RWAsGk',
    domain: process.env.REACT_APP_CYBERINSUR_AUTH0_DOMAIN || 'cyberinsur-staging.auth0.com',
  },
};

export const isDevelop = config.env === 'development' || config.env === null;
export const isProduction = config.env === 'production';

export default config;
