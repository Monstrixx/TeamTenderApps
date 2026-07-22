import { describe, it, expect } from 'vitest';
import { generateRequestLetterText } from './requestLetterGenerator';

describe('generateRequestLetterText', () => {
    const validPayload = {
        supplier: { name: 'PT. Supplier Jaya' },
        tender: {
            packageName: 'Pembangunan Jalan Tol',
            hpsValue: 'Rp 10.000.000.000,00',
            pokjaName: 'Pokja III',
            pokjaAddress: 'Gedung Kementrian PU'
        },
        company: {
            name: 'PT. Konstruksi Maju',
            requestLetterNo: '001/KM/2026',
            date: 'Jakarta, 12 Agustus 2026'
        },
        signatory: {
            name: 'Ir. Ahmad',
            title: 'Direktur'
        },
        equipment: [
            { name: 'Excavator', quantity: 2, unit: 'Unit' },
            { name: 'Bulldozer', quantity: 1, unit: 'Set' }
        ]
    };

    it('generates a complete request letter with all fields', () => {
        const text = generateRequestLetterText(validPayload);
        expect(text).toContain('PT. KONSTRUKSI MAJU');
        expect(text).toContain('Nomor   : 001/KM/2026');
        expect(text).toContain('Pimpinan PT. Supplier Jaya');
        expect(text).toContain('Pembangunan Jalan Tol');
        expect(text).toContain('Rp 10.000.000.000,00');
        expect(text).toContain('Gedung Kementrian PU');
        expect(text).toContain('1. Excavator (2 Unit)');
        expect(text).toContain('2. Bulldozer (1 Set)');
        expect(text).toContain('Jakarta, 12 Agustus 2026');
        expect(text).toContain('Ir. Ahmad');
        expect(text).toContain('Direktur');
    });

    it('handles unicode characters correctly', () => {
        const payload = {
            ...validPayload,
            company: { name: 'PT. Kønstrüksi Mäju 🚀' },
            supplier: { name: 'Süppliër Jaya' }
        };
        const text = generateRequestLetterText(payload);
        expect(text).toContain('PT. KØNSTRÜKSI MÄJU 🚀');
        expect(text).toContain('Pimpinan Süppliër Jaya');
    });

    it('handles long text fields without breaking', () => {
        const longName = 'PT. '.padEnd(200, 'A');
        const payload = {
            ...validPayload,
            company: { name: longName }
        };
        const text = generateRequestLetterText(payload);
        expect(text).toContain(longName.toUpperCase());
    });

    it('handles empty equipment list gracefully', () => {
        const payload = { ...validPayload, equipment: [] };
        const text = generateRequestLetterText(payload);
        expect(text).toContain('Maka dengan ini kami mengajukan permohonan dukungan sewa peralatan utama berupa:\n-\n\nKami berharap');
    });

    it('handles null and undefined values safely', () => {
        const payload = {
            supplier: { name: 'PT. Supplier Jaya' },
            tender: { packageName: null, hpsValue: undefined },
            company: { name: 'PT. KM' },
            equipment: [
                { name: null, quantity: undefined, unit: null }
            ]
        };
        const text = generateRequestLetterText(payload);
        expect(text).toContain('Nama Paket Pekerjaan : \n');
        expect(text).toContain('Nilai HPS            : \n');
        expect(text).toContain('1.  (0 )');
    });

    it('handles missing optional signatory gracefully', () => {
        const payload = { ...validPayload };
        delete payload.signatory;
        const text = generateRequestLetterText(payload);
        expect(text.endsWith('\n')).toBe(true); // Should not crash, leaves blank space
    });

    it('returns empty string if supplier is missing', () => {
        const text = generateRequestLetterText({ ...validPayload, supplier: null });
        expect(text).toBe('');
    });

    it('returns empty string if company is missing', () => {
        const text = generateRequestLetterText({ ...validPayload, company: null });
        expect(text).toBe('');
    });
});
