import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to set canonical URLs dynamically based on the current route
 * This ensures each page has a proper self-referencing canonical tag
 * which tells Google which version is the primary/canonical version
 */
export const useCanonical = () => {
  const location = useLocation();

  useEffect(() => {
    // Get existing canonical link or create new one
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }

    // Build the canonical URL based on current pathname
    const baseUrl = 'https://stefanbobrowski.com';
    const path = location.pathname === '/' ? '' : location.pathname;
    const canonicalUrl = `${baseUrl}${path}`;

    // Update the canonical href
    canonicalLink.href = canonicalUrl;

    // Also update og:url meta tag for social sharing
    let ogUrlMeta = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.content = canonicalUrl;
  }, [location.pathname]);
};
