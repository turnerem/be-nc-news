const ENV = process.env.NODE_ENV || 'development';

const test = require('./test-data/index.js');
const development = require('./development-data/index.js');

const data = {
  test,
  development
  }

module.exports = data[ENV];