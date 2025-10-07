import { useState, useEffect } from 'react';

const useSidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = () => {
        setIsOpen(true);
        // Check if document is available (client-side only)
        if (typeof document !== 'undefined') {
            document.body.classList.add('no-fade');
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
        // Check if document is available (client-side only)
        if (typeof document !== 'undefined') {
            document.body.classList.remove('no-fade');
        }
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (typeof document !== 'undefined') {
                document.body.classList.remove('no-fade');
            }
        };
    }, []);

    return { isOpen, openMenu, closeMenu };
};

export default useSidebarMenu; 