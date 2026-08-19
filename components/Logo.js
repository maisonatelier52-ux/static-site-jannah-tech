import Image from 'next/image';

// Drop your real logo file at /public/images/logo/site-logo.png (or .svg)
// and it will be used automatically in place of the text fallback below.
// Recommended size: roughly 320x72px (or similar 4.4:1 ratio), transparent background.
// If you need a separate light/white version for the dark footer, add
// /public/images/logo/site-logo-light.png and it will be used automatically
// when variant="light".
const LOGO_IMAGE_SRC = '/images/logo/site-logo.png';
const LOGO_IMAGE_SRC_LIGHT = '/images/logo/site-logo-light.png';
const USE_IMAGE_LOGO = false; // set true once you've added your real logo file

export default function Logo({ variant = 'dark', size = 'base' }) {
  const isLight = variant === 'light';
  const sizeClasses = size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl';
  const boxSize = size === 'lg' ? 'h-11 w-[220px] sm:h-12 sm:w-[250px]' : 'h-8 w-[140px] sm:h-9 sm:w-[170px]';
  const globeSize = size === 'lg' ? 'w-[0.78em] h-[0.78em] mx-[0.02em]' : 'w-[0.74em] h-[0.74em] mx-[0.02em]';

  if (USE_IMAGE_LOGO) {
    return (
      <span className={`relative block ${boxSize}`}>
        <Image
          src={isLight ? LOGO_IMAGE_SRC_LIGHT : LOGO_IMAGE_SRC}
          alt="JannahTech"
          fill
          className="object-contain object-left"
          priority
        />
      </span>
    );
  }

  return (
    <span
      className={`flex items-center font-display font-black ${sizeClasses} tracking-tight leading-none select-none whitespace-nowrap ${
        isLight ? 'text-white' : 'text-ink'
      }`}
    >
      <span>EL</span>
      {/* Globe/target mark standing in for the "O" — swap for a real logo mark via LOGO_IMAGE_SRC above */}
      <svg
        viewBox="0 0 24 24"
        className={globeSize}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M12 2c3 2.6 4.6 6.2 4.6 10S15 19.4 12 22c-3-2.6-4.6-6.2-4.6-10S9 4.6 12 2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
      </svg>
      <span>MUNDO</span>
    </span>
  );
}
