import Image from 'next/image';
import Icon from '@/components/Icon';

const videos = [
  { title: 'How Apple is Taking Back the iPhone', channel: 'Marques Brownlee', duration: '08:16', date: 'Feb 3, 2023' },
  { title: 'M2 Pro Mac Mini Review: Game Changer!', channel: 'Marques Brownlee', duration: '09:33', date: 'Jan 24, 2023' },
  { title: 'M2 Max MacBook Pro Review: Back to Bumps!', channel: 'Marques Brownlee', duration: '09:23', date: 'Jan 23, 2023' },
  { title: 'The Truth About AI Getting "Creative"', channel: 'Marques Brownlee', duration: '15:10', date: 'Dec 9, 2022' },
];

export default function VideoWidget() {
  return (
    <section className="bg-ink text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
        <div className="relative aspect-video bg-gray-800">
          <Image
            src="/images/posts/default-cover.jpg"
            alt="How Apple is Taking Back the iPhone"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 1024px) 100vw, 700px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              aria-label="Play video"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors"
            >
              <span className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-white ml-1" />
            </button>
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-600 shrink-0">
              <Image src="/images/authors/danny-rand.jpg" alt="Marques Brownlee" fill className="object-cover" sizes="32px" />
            </span>
            <div>
              <p className="text-sm font-bold">How Apple is Taking Back the iPhone</p>
              <p className="text-xs text-gray-300">Marques Brownlee</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs">
            <Icon name="arrowUp" className="w-4 h-4 rotate-90" filled={false} />
            <Icon name="clock" className="w-4 h-4" filled={false} />
            <span className="bg-black/60 px-3 py-1.5 rounded-full font-semibold">Watch on YouTube</span>
          </div>
        </div>

        <div className="border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 className="text-sm font-bold">Trending Videos</h3>
            <span className="text-xs text-gray-400">1 / 10 Videos</span>
          </div>
          <ul className="divide-y divide-white/5 max-h-[280px] overflow-y-auto">
            {videos.map((v, i) => (
              <li key={v.title} className="flex items-center gap-3 px-4 py-2.5">
                <span className="relative w-16 h-10 shrink-0 rounded overflow-hidden bg-gray-700">
                  <Image src="/images/posts/default-cover.jpg" alt={v.title} fill className="object-cover" sizes="64px" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-snug line-clamp-2">{v.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {v.duration} · {v.date}
                  </p>
                </div>
                <span className="text-xs text-gray-500 shrink-0">{i + 1}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
