/**
 * DTOs represent the exact structure returned by the Backend API.
 * They are plain JavaScript objects.
 * We define their shapes here using JSDoc for IDE auto-completion.
 */

/**
 * @typedef {Object} ApiEnvelope
 * @property {boolean} success
 * @property {any} data
 * @property {Object|null} meta
 * @property {Object|null} errors
 */

/**
 * @typedef {Object} TenderWorkspaceDTO
 * @property {string} id
 * @property {string} package_name
 * @property {number} hps
 * @property {string} location
 * @property {string} agency
 * @property {Object} schedule
 * @property {string} schedule.start_date
 * @property {string} schedule.end_date
 */

/**
 * @typedef {Object} CompanyProfileDTO
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {string} npwp
 * @property {string} director_name
 */

/**
 * @typedef {Object} EquipmentDTO
 * @property {string} id
 * @property {string} name
 * @property {string} capacity
 * @property {string} merk
 * @property {string} condition
 * @property {string} location
 * @property {string} ownership_status
 * @property {string} evidence
 */

/**
 * @typedef {Object} SupplierDTO
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} rating
 * @property {string} contact_person
 * @property {string} phone
 */

/**
 * @typedef {Object} WorkspaceDocumentDTO
 * @property {string} id
 * @property {string} type
 * @property {string} title
 * @property {string} status
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} WorkspaceDocumentContentDTO
 * @property {string} id
 * @property {string} content_html
 * @property {Object} generated_data
 */

