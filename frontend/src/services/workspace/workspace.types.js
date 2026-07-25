/**
 * Domain Models represent the exact structure expected by the Frontend UI.
 * They are plain JavaScript objects.
 * We define their shapes here using JSDoc for IDE auto-completion.
 */

/**
 * @typedef {Object} TenderMeta
 * @property {string} id
 * @property {string} namaPaket
 * @property {string} hpsFormatted
 * @property {number} hps
 * @property {string} status
 * @property {string} pokja
 * @property {string} lokasi
 * @property {string} tglSelesai
 */

/**
 * @typedef {Object} CompanyProfile
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {string} npwp
 * @property {string} directorName
 */

/**
 * @typedef {Object} Equipment
 * @property {string} id
 * @property {string} name
 * @property {string} capacity
 * @property {string} merk
 * @property {string} condition
 * @property {string} location
 * @property {string} ownershipStatus
 * @property {string} evidence
 */

/**
 * @typedef {Object} Supplier
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} rating
 * @property {string} contactPerson
 * @property {string} phone
 */

/**
 * @typedef {Object} WorkspaceDocument
 * @property {string} id
 * @property {string} type
 * @property {string} title
 * @property {string} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

