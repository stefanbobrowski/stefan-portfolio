import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to initialize GA4 and track page views
 * GA4 is initialized via the gtag script in index.html
 * This hook tracks page views when routes change
 */
export const useGA4 = () => {
  const location = useLocation();

  // Track page views when route changes
  useEffect(() => {
    if (!window.gtag) {
      console.warn('gtag not available - ensure GA4 script is loaded in index.html');
      return;
    }

    // Notify gtag of the page view
    window.gtag('event', 'page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]);

  // Return utility functions for manual tracking
  return {
    trackEvent: (eventName: string, eventParams?: Record<string, unknown>) => {
      if (window.gtag) {
        window.gtag('event', eventName, eventParams);
      }
    },
    trackException: (description: string, fatal = false) => {
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description,
          fatal,
        });
      }
    },
  };
};

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
