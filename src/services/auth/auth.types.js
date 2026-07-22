/**
 * @typedef {Object} CurrentUser
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} role
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} fullName
 */

/**
 * @typedef {Object} AuthTokens
 * @property {string} accessToken
 * @property {string} refreshToken
 */

/**
 * @typedef {Object} LoginResult
 * @property {AuthTokens} tokens
 * @property {CurrentUser} user
 */
