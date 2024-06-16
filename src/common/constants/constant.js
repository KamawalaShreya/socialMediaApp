/**
 * authConstant.js
 * @description :: constants used in authentication
 */

module.exports = {
  JWT: {
    SECRET: "sarvadhi@123",
    EXPIRES_IN: "1 YEAR",
  },

  BCRYPT: {
    SALT_ROUND: 12,
  },

  PAGINATION: {
    DEFAULT_PER_PAGE: 10,
    DEFAULT_PAGE: 1,
  },
};
