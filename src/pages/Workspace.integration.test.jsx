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
        // Initially it's on overview, find "Persyaratan Teknis" in left sidebar
        const teknisButton = screen.getByText('Dokumen Teknis');
        fireEvent.click(teknisButton);

        // 2. Select "Surat Dukungan" sub tab
        const dukunganTab = await screen.findByText('Surat Dukungan');
        fireEvent.click(dukunganTab);

        // 3. Verify Helper is called
        await waitFor(() => {
            expect(generateSpy).toHaveBeenCalled();
        });

        const payload = generateSpy.mock.calls[0][0];
        expect(payload).toHaveProperty('supplier');
        expect(payload).toHaveProperty('tender');
        expect(payload).toHaveProperty('company');
        expect(payload).toHaveProperty('signatory');
        expect(payload).toHaveProperty('equipment');

        // 4. Verify Preview Generated in UI
        const previewContainer = await screen.findByText(/KOP SURAT/i);
        expect(previewContainer).toBeInTheDocument();
        
        generateSpy.mockRestore();
    });
});
