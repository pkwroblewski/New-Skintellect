import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://skintellect.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout', '/order-confirmation'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
