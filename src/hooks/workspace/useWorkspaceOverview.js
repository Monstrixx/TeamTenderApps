import { useState } from 'react';

export function useWorkspaceOverview() {
    const [selectedSupplier, setSelectedSupplier] = useState('s1');
    const [requestLetterNo, setRequestLetterNo] = useState("015/PM-MK/VII/2026");
    const [requestPreviewText, setRequestPreviewText] = useState("");

    return {
        selectedSupplier, setSelectedSupplier,
        requestLetterNo, setRequestLetterNo,
        requestPreviewText, setRequestPreviewText
    };
}
