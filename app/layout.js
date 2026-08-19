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
  return {
    title: {
      default: site.name,
      template: `%s – ${site.name}`,
    },
    description: site.tagline,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
