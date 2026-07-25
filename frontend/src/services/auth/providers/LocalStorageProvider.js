import { TokenStorageProvider } from './TokenStorageProvider';

/**
 * Concrete implementation of TokenStorageProvider using localStorage.
 */
export class LocalStorageProvider extends TokenStorageProvider {
    get(key) {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(key);
    }

    set(key, value) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(key, value);
    }

    remove(key) {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(key);
    }
}
