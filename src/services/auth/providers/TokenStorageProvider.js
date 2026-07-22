/**
 * Base interface for Token Storage Providers.
 * All concrete providers (e.g., LocalStorage, Cookie) must implement these methods.
 */
export class TokenStorageProvider {
    /**
     * @param {string} key
     * @returns {string|null}
     */
    get(key) {
        throw new Error('Method not implemented.');
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    set(key, value) {
        throw new Error('Method not implemented.');
    }

    /**
     * @param {string} key
     */
    remove(key) {
        throw new Error('Method not implemented.');
    }
}
