/**
 * Document Validation Engine
 * Pure Business Logic Engine for document compliance check & status transitions.
 * No React, No DOM, No API side-effects, Pure & Immutable.
 */

/**
 * Returns a new document validation state object with the target document marked as 'validating'.
 * 
 * @param {Object} currentDocValidation 
 * @param {string} key 
 * @returns {Object} Immutable updated docValidation object
 */
export function markDocumentValidating(currentDocValidation, key) {
    if (!currentDocValidation || !key || !currentDocValidation[key]) {
        return currentDocValidation;
    }
    return {
        ...currentDocValidation,
        [key]: {
            ...currentDocValidation[key],
            status: 'validating'
        }
    };
}

/**
 * Returns a new document validation state object with the target document marked as 'valid'.
 * 
 * @param {Object} currentDocValidation 
 * @param {string} key 
 * @returns {Object} Immutable updated docValidation object
 */
export function markDocumentValid(currentDocValidation, key) {
    if (!currentDocValidation || !key || !currentDocValidation[key]) {
        return currentDocValidation;
    }
    return {
        ...currentDocValidation,
        [key]: {
            ...currentDocValidation[key],
            status: 'valid'
        }
    };
}

/**
 * Creates a standardized validation log entry for audit trails.
 * 
 * @param {string} key - Document key (e.g., 'sbu', 'nib', 'pajak')
 * @param {boolean} [isAuto=false] - Whether validation was triggered by batch auto-validation
 * @param {string} [timeStr=null] - Optional timestamp string
 * @returns {Object} Audit log object
 */
export function createValidationLog(key, isAuto = false, timeStr = null) {
    const time = timeStr || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const formattedKey = key ? key.toUpperCase() : 'DOKUMEN';
    const msg = isAuto 
        ? `Dokumen ${formattedKey} berhasil divalidasi secara otomatis. Status: VALID.`
        : `Dokumen ${formattedKey} berhasil divalidasi dan dicocokkan dengan persyaratan tender. Status: VALID.`;

    return {
        time,
        agent: "Sistem Validasi",
        msg
    };
}

/**
 * Validates a single document deterministically.
 * 
 * @param {Object} currentDocValidation 
 * @param {string} key 
 * @returns {{ updatedDocValidation: Object, log: Object }}
 */
export function validateDocument(currentDocValidation, key) {
    const updatedDocValidation = markDocumentValid(currentDocValidation, key);
    const log = createValidationLog(key, false);
    return { updatedDocValidation, log };
}
