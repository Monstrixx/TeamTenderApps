import { describe, it, expect } from 'vitest';
import { 
    markDocumentValidating, 
    markDocumentValid, 
    createValidationLog, 
    validateDocument 
} from './documentValidationEngine';

describe('documentValidationEngine', () => {
    const initialState = {
        sbu: { status: 'draft', url: 'doc.pdf' },
        nib: { status: 'pending', url: 'nib.pdf' }
    };

    it('markDocumentValidating updates status to validating immutably', () => {
        const nextState = markDocumentValidating(initialState, 'sbu');
        expect(nextState.sbu.status).toBe('validating');
        expect(initialState.sbu.status).toBe('draft'); // Immuntability check
        expect(nextState).not.toBe(initialState);
    });

    it('markDocumentValidating ignores invalid or missing keys', () => {
        const nextState1 = markDocumentValidating(initialState, 'invalidKey');
        const nextState2 = markDocumentValidating(initialState, null);
        expect(nextState1).toBe(initialState);
        expect(nextState2).toBe(initialState);
    });

    it('markDocumentValid updates status to valid immutably', () => {
        const nextState = markDocumentValid(initialState, 'nib');
        expect(nextState.nib.status).toBe('valid');
        expect(initialState.nib.status).toBe('pending');
        expect(nextState).not.toBe(initialState);
    });

    it('markDocumentValid ignores invalid or missing keys', () => {
        const nextState = markDocumentValid(initialState, 'nonExistent');
        expect(nextState).toBe(initialState);
    });

    it('handles malformed payload safely', () => {
        const result = markDocumentValidating(null, 'sbu');
        expect(result).toBeNull();
        
        const result2 = markDocumentValidating(undefined, 'sbu');
        expect(result2).toBeUndefined();
    });

    it('duplicate validation handles gracefully (idempotent)', () => {
        const state1 = markDocumentValid(initialState, 'sbu');
        const state2 = markDocumentValid(state1, 'sbu');
        
        expect(state2.sbu.status).toBe('valid');
        // Because of the spread operator, it technically returns a new object, 
        // but the internal status is correct and side-effect free.
    });

    it('createValidationLog generates manual validation log correctly', () => {
        const log = createValidationLog('pajak', false, '10:00');
        expect(log.agent).toBe('Sistem Validasi');
        expect(log.time).toBe('10:00');
        expect(log.msg).toContain('PAJAK berhasil divalidasi dan dicocokkan');
    });

    it('createValidationLog generates auto validation log correctly', () => {
        const log = createValidationLog('npwp', true, '11:00');
        expect(log.msg).toContain('NPWP berhasil divalidasi secara otomatis');
    });

    it('createValidationLog handles empty keys', () => {
        const log = createValidationLog(null);
        expect(log.msg).toContain('DOKUMEN berhasil divalidasi');
        expect(log.time).toBeDefined(); // uses current time
    });

    it('validateDocument returns updated state and log', () => {
        const { updatedDocValidation, log } = validateDocument(initialState, 'sbu');
        
        expect(updatedDocValidation.sbu.status).toBe('valid');
        expect(initialState.sbu.status).toBe('draft'); // Immuntability check
        
        expect(log).toBeDefined();
        expect(log.msg).toContain('SBU berhasil divalidasi');
    });
});
