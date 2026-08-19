import Link from 'next/link';
import Image from 'next/image';

/**
 * size: 'sidebar' (300x600), 'leaderboard' (970x250), 'inline' (728x90)
 */
export default function AdBox({ size = 'sidebar', href = '#' }) {
  const config = {
    sidebar: {
      src: '/images/ads/sidebar-ad.jpg',
      wrapperClass: 'w-full aspect-[1/2] max-w-[300px] mx-auto',
    },
    leaderboard: {
      src: '/images/ads/leaderboard-ad.jpg',
      wrapperClass: 'w-full aspect-[970/250]',
    },
    inline: {
      src: '/images/ads/inline-ad.jpg',
      wrapperClass: 'w-full aspect-[728/90]',
    },
  };

  const { src, wrapperClass } = config[size] || config.sidebar;

  return (
    <div className="text-center">
      <span className="block text-[10px] uppercase tracking-wide text-ink-muted mb-1.5">
        Advertisement
      </span>
      <Link href={href} className={`relative block ${wrapperClass} overflow-hidden bg-gray-100`}>
        <Image src={src} alt="Advertisement" fill className="object-cover" sizes="300px" />
      </Link>
    </div>
  );
}
