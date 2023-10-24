require('dotenv').config();

const env = {
  PORT: process.env.APP_PORT || 3000,
  HOST: process.env.APP_HOST || 'localhost',
  JWT_AT_SECRET: process.env.JWT_AT_SECRET,
  JWT_AT_EXPIRES_IN: process.env.JWT_AT_EXPIRES_IN,
};

module.exports = env;
