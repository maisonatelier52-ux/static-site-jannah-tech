import Link from 'next/link';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { getSite } from '@/lib/data';

export default function Footer() {
  const site = getSite();
  const otherWebsites = site.otherWebsites;
  const legal = site.legal;

  return (
    <footer className="bg-white text-ink border-t border-gray-300">

      {/* "Other websites" band */}
      {otherWebsites && (
        <div className="border-b border-gray-300">
          <div className="max-w-container mx-auto px-4 py-3 text-center">
            <h2 className="text-xs font-extrabold uppercase tracking-wide font-sans">
              {otherWebsites.title}
            </h2>
          </div>

          <div className="max-w-container mx-auto px-4 pb-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              {otherWebsites.columns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-[13px] font-extrabold font-sans mb-2">
                    {col.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {col.links.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-[13px] font-sans text-[#2e6ea6] hover:underline"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Masthead + address + socials */}
      <div className="max-w-container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-0">

          {/* Third-party brand mark placeholder — replace with the real partner logo image */}
          <div className="sm:w-24 flex sm:justify-start justify-center">

          </div>

          {/* Centered wordmark + address */}
          <div className="flex-1 flex flex-col items-center text-center">
            <Logo size="base" />
            {legal && (
              <p className="mt-1 text-[12px] font-sans text-[#2e6ea6]">
                {legal.address}
              </p>
            )}
          </div>

          {/* Social icons — X/Twitter, Facebook, and an RSS feed link */}
          <div className="sm:w-24 flex sm:justify-end justify-center gap-2">
            {site.socials
              .filter((s) => s.icon === 'x' || s.icon === 'facebook')
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-[#1a5f8a] text-[#1a5f8a] flex items-center justify-center hover:bg-[#1a5f8a] hover:text-white transition-colors"
                >
                  <Icon
                    name={s.icon === 'x' ? 'twitterBird' : s.icon}
                    className="w-3.5 h-3.5"
                  />
                </a>
              ))}
            <a
              href="#"
              aria-label="RSS feed"
              className="w-8 h-8 rounded-full border border-[#1a5f8a] text-[#1a5f8a] flex items-center justify-center hover:bg-[#1a5f8a] hover:text-white transition-colors"
            >
              <Icon name="rss" className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {legal && (
          <p className="mt-4 text-[11px] leading-5 font-sans text-[#2e6ea6] text-center max-w-4xl mx-auto">
            {legal.disclaimer}
          </p>
        )}
      </div>

      {/* Bottom legal links bar */}
      {legal && (
        <div className="border-t border-gray-300">
          <div className="max-w-container mx-auto px-4 py-3">
            <nav className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-[12px] font-sans">
              {legal.bottomLinks.map((item, i) => (
                <span key={item.label} className="flex items-center gap-2">
                  <Link href={item.href} className="text-[#2e6ea6] hover:underline">
                    {item.label}
                  </Link>
                  {i < legal.bottomLinks.length - 1 && (
                    <span className="text-gray-300" aria-hidden="true">|</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      )}
    </footer>
  );
}
