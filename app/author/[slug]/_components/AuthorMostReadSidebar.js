'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getPostUrl } from '@/lib/data';

function RankedItem({ post, rank }) {
  const url = getPostUrl(post);
  return (
    <li className="py-4 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0">
      <Link href={url} className="flex gap-4 items-start group">
        <span className="relative shrink-0 w-8 h-8 mt-0.5">
          <span className="absolute inset-0 top-1 rounded-full bg-red-600" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-ink text-white text-sm font-bold">
            {rank}
          </span>
        </span>
        <span className="font-sans text-sm leading-snug text-ink group-hover:text-brand transition-colors">
          {post.title}
        </span>
      </Link>
    </li>
  );
}

export default function AuthorMostReadSidebar({ mostRead = [], trending = [] }) {
  const [tab, setTab] = useState('read');

  const hasRead = mostRead.length > 0;
  const hasTrending = trending.length > 0;

  if (!hasRead && !hasTrending) return null;

  const activePosts = tab === 'read' ? mostRead : trending;

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start w-full lg:w-[336px] shrink-0 border border-gray-200">
      <div className="flex items-stretch border-b border-gray-200">
        <button
          type="button"
          onClick={() => setTab('read')}
          disabled={!hasRead}
          className={`flex-1 py-3 text-sm sm:text-[15px] font-sans text-center border-b-2 transition-colors ${
            tab === 'read'
              ? 'font-bold text-ink border-brand'
              : 'font-medium text-ink-muted border-transparent hover:text-ink disabled:opacity-40'
          }`}
        >
          Most read
        </button>
        <span className="w-px bg-gray-200" aria-hidden="true" />
        <button
          type="button"
          onClick={() => setTab('trending')}
          disabled={!hasTrending}
          className={`flex-1 py-3 text-sm sm:text-[15px] font-sans text-center border-b-2 transition-colors ${
            tab === 'trending'
              ? 'font-bold text-ink border-brand'
              : 'font-medium text-ink-muted border-transparent hover:text-ink disabled:opacity-40'
          }`}
        >
          Trending now
        </button>
      </div>

      <ul className="px-4 sm:px-5">
        {activePosts.map((post, i) => (
          <RankedItem key={post.slug} post={post} rank={i + 1} />
        ))}
      </ul>
    </aside>
  );
}
