import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  productSchema?: {
    name: string;
    price: number;
    image: string;
    description: string;
    inStock: boolean;
  };
}

export function SEO({
  title,
  description,
  keywords,
  image = 'https://rimacosmetics.vercel.app/og-image.jpg',
  url,
  type = 'website',
  productSchema,
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://rimacosmetics.vercel.app'; // Update this with your actual domain
  const fullUrl = url || `${baseUrl}${location.pathname}`;

  const defaultTitle = 'Rima Cosmetics - 100% Organic Handmade Cosmetic Products | Chennai';
  const defaultDescription =
    'Shop 100% organic handmade cosmetic products in Chennai. Natural hair care, skin care, soaps, and lip care products. Free delivery. Order now on WhatsApp Pay!';
  const defaultKeywords =
    'organic cosmetics, handmade cosmetics, natural beauty products, Chennai cosmetics, organic hair oil, herbal shampoo, natural soap, organic skin care, Tamil Nadu, Mounica MK, chemical-free products, vegan cosmetics, ayurvedic cosmetics';

  const pageTitle = title ? `${title} | Rima Cosmetics` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // Set page title
    document.title = pageTitle;

    // Set meta description
    updateMetaTag('name', 'description', pageDescription);

    // Set meta keywords
    updateMetaTag('name', 'keywords', pageKeywords);

    // Open Graph tags
    updateMetaTag('property', 'og:title', pageTitle);
    updateMetaTag('property', 'og:description', pageDescription);
    updateMetaTag('property', 'og:url', fullUrl);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:site_name', 'Rima Cosmetics');
    updateMetaTag('property', 'og:locale', 'en_IN');

    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', pageTitle);
    updateMetaTag('name', 'twitter:description', pageDescription);
    updateMetaTag('name', 'twitter:image', image);

    // Canonical URL
    updateLinkTag('canonical', fullUrl);

    // Structured Data for Products
    if (productSchema) {
      addProductSchema(productSchema);
    }
  }, [pageTitle, pageDescription, pageKeywords, fullUrl, image, type, productSchema]);

  return null;
}

function updateMetaTag(attr: string, attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${attrValue}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.href = href;
}

function addProductSchema(product: {
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: window.location.href,
    },
    brand: {
      '@type': 'Brand',
      name: 'Rima Cosmetics',
    },
  };

  let scriptElement = document.getElementById('product-schema');

  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.id = 'product-schema';
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);
  }

  scriptElement.textContent = JSON.stringify(schema);
}

// Local Business Schema for about and contact pages
export function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://rimacosmetics.vercel.app',
      name: 'Rima Cosmetics',
      description:
        '100% organic handmade cosmetic products crafted with love and care for your natural beauty.',
      url: 'https://rimacosmetics.vercel.app',
      telephone: '+918939996640',
      email: 'rimacosmetics@gmail.com',
      image: 'https://rimacosmetics.vercel.app/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'A block G-3, Tejas Lakeview apartment, Manthopo Salai',
        addressLocality: 'Siruseri, Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600130',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '12.8469',
        longitude: '80.2256',
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Chennai',
        },
        {
          '@type': 'State',
          name: 'Tamil Nadu',
        },
        {
          '@type': 'Country',
          name: 'India',
        },
      ],
      priceRange: '₹50 - ₹350',
      paymentAccepted: 'WhatsApp Pay, Cash',
      openingHours: 'Mo-Su 09:00-21:00',
      founder: {
        '@type': 'Person',
        name: 'Mounica MK',
      },
      sameAs: [
        // Add your social media URLs here when available
        'https://www.instagram.com/rimacosmetics',
        'https://www.facebook.com/rimacosmetics',
      ],
    };

    let scriptElement = document.getElementById('local-business-schema');

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'local-business-schema';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schema);

    return () => {
      scriptElement?.remove();
    };
  }, []);

  return null;
}

// Organization Schema
export function OrganizationSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Rima Cosmetics',
      description: '100% Organic Handmade Cosmetic Products',
      url: 'https://rimacosmetics.vercel.app',
      logo: 'https://rimacosmetics.vercel.app/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+918939996640',
        contactType: 'Customer Service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil', 'Hindi'],
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
    };

    let scriptElement = document.getElementById('organization-schema');

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'organization-schema';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schema);

    return () => {
      scriptElement?.remove();
    };
  }, []);

  return null;
}
