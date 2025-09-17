'use client';

import { useEffect } from 'react';

const BootstrapJS = () => {
  useEffect(() => {
    // Dynamically import Bootstrap JavaScript only on client side
    const loadBootstrap = async () => {
      if (typeof window !== 'undefined') {
        try {
          await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        } catch (error) {
          console.error('Failed to load Bootstrap JS:', error);
        }
      }
    };

    loadBootstrap();
  }, []);

  return null;
};

export default BootstrapJS;