import { useEffect, useRef } from 'react';

export function useDialogA11y(isOpen, onClose) {
    const dialogRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Save the element that triggered the dialog
            triggerRef.current = document.activeElement;
            
            // Auto focus the dialog
            if (dialogRef.current) {
                dialogRef.current.focus();
            }

            const handleKeyDown = (e) => {
                if (e.key === 'Escape' && onClose) {
                    onClose();
                }
                
                if (e.key === 'Tab') {
                    // Simple focus trap
                    if (dialogRef.current) {
                        const focusableElements = dialogRef.current.querySelectorAll(
                            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                        );
                        if (focusableElements.length > 0) {
                            const firstElement = focusableElements[0];
                            const lastElement = focusableElements[focusableElements.length - 1];

                            if (e.shiftKey) {
                                if (document.activeElement === firstElement) {
                                    lastElement.focus();
                                    e.preventDefault();
                                }
                            } else {
                                if (document.activeElement === lastElement) {
                                    firstElement.focus();
                                    e.preventDefault();
                                }
                            }
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                // Restore focus when closed
                if (triggerRef.current) {
                    triggerRef.current.focus();
                }
            };
        }
    }, [isOpen, onClose]);

    return { dialogRef };
}
