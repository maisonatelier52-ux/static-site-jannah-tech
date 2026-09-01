import Link from 'next/link';
import Icon from '@/components/Icon';
import { getSite } from '@/lib/data';

// Icon badge shown next to each "other websites" column heading.
const COLUMN_ICONS = {
  'the world': 'globe',
  'leisure and health': 'heart',
  'editorial unit': 'pen',
  employment: 'briefcase',
};

// Icon shown before each bottom legal link.
const LEGAL_LINK_ICONS = {
  'cookies policy': 'cookie',
  'cookie settings': 'sliders',
  'privacy policy': 'shield',
  'data mining policy': 'database',
  'transparency section': 'barChart',
  'terms and conditions of use': 'fileText',
  'content sales': 'tag',
  advertising: 'megaphone',
  'certified by ojd': 'medal',
  contact: 'mail',
};

export default function Footer() {
  const site = getSite();
  const otherWebsites = site.otherWebsites;
  const legal = site.legal;

  return (
    <footer className="bg-white text-ink border-t border-gray-200">

      {/* "Other websites" grid — icon-badged columns with a small brand
          underline accent, chevron-led links. */}
      {otherWebsites && (
        <div className="border-b border-gray-200">
          <div className="max-w-container mx-auto px-4 py-10 sm:py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {otherWebsites.columns.map((col) => {
                const iconName = COLUMN_ICONS[col.title.toLowerCase()] || 'globe';
                return (
                  <div key={col.title}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="shrink-0 w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center">
                        <Icon name={iconName} className="w-5 h-5 text-brand" filled={false} />
                      </span>
                      <div>
                        <h3 className="text-[13px] font-extrabold font-sans uppercase tracking-wide text-ink">
                          {col.title}
                        </h3>
                        <span className="block mt-1.5 w-6 h-[3px] rounded-full bg-gradient-to-r from-brand to-brand-light" />
                      </div>
                    </div>
                    <ul className="space-y-2.5">
                      {col.links.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="group flex items-center gap-2 text-[13.5px] font-sans font-medium text-ink hover:text-brand transition-colors"
                          >
                            <Icon
                              name="chevronRight"
                              className="w-3.5 h-3.5 text-brand shrink-0 transition-transform group-hover:translate-x-0.5"
                              filled={false}
                            />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Masthead panel — soft gradient background with a subtle wave
          decoration behind the wordmark, address and social icons. */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/60 to-slate-100/70">
        {/* Decorative waves, pinned to the bottom of the panel */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-32 sm:h-40"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,150 C300,190 900,110 1200,160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-brand/15"
          />
          <path
            d="M0,120 C350,80 800,170 1200,110"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-brand/10"
          />
          <path
            d="M0,175 C300,145 900,205 1200,175"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-brand/10"
          />
        </svg>
        {/* Soft radial glow behind the wordmark */}
        <div
          className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 w-[480px] h-[280px] rounded-full bg-brand/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-container mx-auto px-4 py-14 flex flex-col items-center text-center">

          {/* Wordmark — an abstract gradient mark plus the site name,
              styled specifically for this footer panel. */}
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-brand to-brand-light shadow-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
                <path
                  d="M5 15C5 9 9 5 15 5M19 9C19 15 15 19 9 19"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path d="M15 5L19 5.5L16.5 8.5Z" fill="white" />
                <path d="M9 19L5 18.5L7.5 15.5Z" fill="white" />
              </svg>
            </span>
            <span className="font-sans font-black uppercase tracking-tight text-3xl sm:text-4xl leading-none">
              <span className="text-ink">Domain</span>{' '}
              <span className="text-brand">Name</span>
            </span>
          </div>

          {legal && (
            <p className="mt-5 flex items-center gap-2 text-[13px] sm:text-sm font-sans font-medium text-ink">
              <Icon name="mapPin" className="w-4 h-4 text-brand shrink-0" filled={false} />
              {legal.address}
            </p>
          )}

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-3">
            {site.socials
              .filter((s) => s.icon === 'x' || s.icon === 'facebook')
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm text-brand flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-colors"
                >
                  <Icon
                    name={s.icon === 'x' ? 'twitterBird' : s.icon}
                    className="w-4 h-4"
                  />
                </a>
              ))}
            <a
              href="#"
              aria-label="RSS feed"
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm text-brand flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-colors"
            >
              <Icon name="rss" className="w-4 h-4" />
            </a>
          </div>
          <span className="mt-3 w-10 h-[3px] rounded-full bg-gradient-to-r from-brand to-brand-light" />

          {legal && (
            <p className="mt-7 text-[12.5px] leading-6 font-sans text-ink-muted text-center max-w-3xl mx-auto">
              {legal.disclaimer}
            </p>
          )}
        </div>
      </div>

      {/* Bottom legal links bar */}
      {legal && (
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-container mx-auto px-4 py-4">
            <nav className="flex flex-wrap justify-center gap-x-1 gap-y-2.5 text-[12.5px] font-sans">
              {legal.bottomLinks.map((item, i) => {
                const iconName = LEGAL_LINK_ICONS[item.label.toLowerCase()] || 'fileText';
                return (
                  <span key={item.label} className="flex items-center">
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 px-2 text-ink font-medium hover:text-brand transition-colors"
                    >
                      <Icon name={iconName} className="w-3.5 h-3.5 text-brand shrink-0" filled={false} />
                      {item.label}
                    </Link>
                    {i < legal.bottomLinks.length - 1 && (
                      <span className="text-gray-300" aria-hidden="true">|</span>
                    )}
                  </span>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </footer>
  );
}
