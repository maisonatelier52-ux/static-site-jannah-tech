import Image from 'next/image';

export default function NativeAdBanner() {
  return (
    <div className="my-8 bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5">
      <div className="flex-1 min-w-0">
        <h3 className="font-serif leading-snug text-base sm:text-lg">
          <span className="font-bold text-[#2E6D9C]">Sponsored.</span>{' '}
          <span className="font-bold text-ink">
            Where science accelerates innovation in service of everyday life
          </span>
        </h3>
        <p className="mt-2 text-[11px] font-sans uppercase tracking-wide text-ink-muted">
          Offered by our partners
        </p>
      </div>
      <div className="relative w-full sm:w-40 aspect-[4/3] sm:aspect-[4/3] shrink-0 overflow-hidden bg-gray-200">
        <Image src="/images/ads/inline-ad.jpg" alt="Advertisement" fill className="object-cover" sizes="160px" />
      </div>
    </div>
  );
}
