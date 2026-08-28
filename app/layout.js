import './globals.css';
import { Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { getSite } from '@/lib/data';

// Serif display font used for the masthead/logo wordmark (see components/Logo.js).
// Body copy uses the Helvetica system-font stack configured in tailwind.config.js.
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-playfair',
});

export function generateMetadata() {
  const site = getSite();
  const siteUrl = site.siteUrl;
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: site.name,
      template: `%s – ${site.name}`,
    },
    description: site.tagline,
    openGraph: {
      type: 'website',
      title: site.name,
      description: site.tagline,
      url: siteUrl,
      siteName: site.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: site.name,
      description: site.tagline,
    },
  };
}

export default function RootLayout({ children }) {
  const site = getSite();
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.siteUrl,
    logo: site.siteUrl ? `${site.siteUrl}${site.logo}` : site.logo,
  };
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={playfair.variable}>
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
