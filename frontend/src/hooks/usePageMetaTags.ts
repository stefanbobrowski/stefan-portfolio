import { useEffect } from 'react';

export interface PageMetaTags {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

/**
 * Hook to set page-specific meta tags including title and description
 * This ensures each page has unique, SEO-friendly meta information
 */
export const usePageMetaTags = (tags: PageMetaTags) => {
  useEffect(() => {
    // Set page title (appears in browser tab and is used by search engines)
    document.title = tags.title;

    // Update or create description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content = tags.description;

    // Update canonical URL if provided
    if (tags.canonical) {
      updateCanonical(tags.canonical);
    }

    // Update OG tags if provided
    if (tags.ogTitle) {
      updateMetaProperty('og:title', tags.ogTitle);
    }
    if (tags.ogDescription) {
      updateMetaProperty('og:description', tags.ogDescription);
    }
    if (tags.ogImage) {
      updateMetaProperty('og:image', tags.ogImage);
    }
    if (tags.ogUrl) {
      updateMetaProperty('og:url', tags.ogUrl);
    }

    // Update Twitter tags if provided
    if (tags.twitterTitle) {
      updateMetaName('twitter:title', tags.twitterTitle);
    }
    if (tags.twitterDescription) {
      updateMetaName('twitter:description', tags.twitterDescription);
    }
    if (tags.twitterImage) {
      updateMetaName('twitter:image', tags.twitterImage);
    }
  }, [tags]);
};

/**
 * Helper to update or create canonical link tag
 */
function updateCanonical(href: string) {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = href;
}

/**
 * Helper to update or create meta tags with property attribute (OG tags)
 */
function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

/**
 * Helper to update or create meta tags with name attribute (standard meta tags)
 */
function updateMetaName(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}
