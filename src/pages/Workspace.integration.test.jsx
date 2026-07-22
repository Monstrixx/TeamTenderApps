import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Workspace from './Workspace';
import * as requestLetterGenerator from '../shared/helpers/requestLetterGenerator';

describe('Workspace - Request Letter Integration', () => {
    it('calls generateRequestLetterText and displays preview when navigating to Surat Dukungan', async () => {
        // Spy on the helper
        const generateSpy = vi.spyOn(requestLetterGenerator, 'generateRequestLetterText');

        render(<Workspace />);

        // 1. Open Workspace -> Go to "Persyaratan Teknis" Section
        const teknisButton = screen.getByText('Dokumen Teknis');
        fireEvent.click(teknisButton);

        // 2. Select "Surat Dukungan" sub tab
        const dukunganTab = await screen.findByText('Surat Dukungan');
        fireEvent.click(dukunganTab);

        // 3. Verify Helper is called initially
        await waitFor(() => {
            expect(generateSpy).toHaveBeenCalled();
        });

        // 4. Verify Preview Generated in UI
        let previewContainer = await screen.findByText(/KOP SURAT PERUSAHAAN/i);
        expect(previewContainer).toBeInTheDocument();
        
        // Ensure standard mock values are generated inside the preview
        expect(previewContainer.textContent).toContain('015/PM-MK/VII/2026');
        expect(previewContainer.textContent).toContain('PT. Rental Alat Nusantara');

        // 5. Change letter number and verify UI updates dynamically
        const inputLetterNo = screen.getByDisplayValue('015/PM-MK/VII/2026');
        fireEvent.change(inputLetterNo, { target: { value: '999/TEST/2026' } });

        await waitFor(() => {
            expect(previewContainer.textContent).toContain('999/TEST/2026');
        });

        // 6. Change supplier and verify UI updates dynamically without refreshing
        const supplierSelect = screen.getByRole('combobox');
        fireEvent.change(supplierSelect, { target: { value: 's2' } });

        await waitFor(() => {
            expect(previewContainer.textContent).toContain('CV. Material Utama Sejahtera');
        });
        
        generateSpy.mockRestore();
    });
});
