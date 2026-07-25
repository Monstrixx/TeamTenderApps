/**
 * @typedef {Object} LoginResponseDTO
 * @property {string} access_token
 * @property {string} refresh_token
 * @property {UserDTO} user
 */

/**
 * @typedef {Object} UserDTO
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} role
 * @property {string} first_name
 * @property {string} last_name
 */

/**
 * @typedef {Object} RefreshResponseDTO
 * @property {string} access_token
 * @property {string} refresh_token
 */
