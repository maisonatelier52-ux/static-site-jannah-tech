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
      <span>Domain Name</span>
    </span>
  );
}
