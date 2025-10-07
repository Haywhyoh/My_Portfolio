'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const RoutesScrollToTop = () => {
    // Extracts pathname from Next.js router
    const pathname = usePathname();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        // Check if window is available (client-side only)
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [pathname]);

    // Return null since this component does not need to render anything
    return null;
}

export default RoutesScrollToTop; 