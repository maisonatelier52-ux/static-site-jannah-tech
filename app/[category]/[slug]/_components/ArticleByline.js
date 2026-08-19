import Link from 'next/link';
import Image from 'next/image';
import { getAuthorBySlug } from '@/lib/data';
import { GoogleIcon } from './icons';

// Formats an ISO-ish "YYYY-MM-DDTHH:MM:00" string as e.g.
// "Wednesday, August 12, 2026 - 10:49 PM", matching the reference design.
function formatUpdatedAt(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  const datePart = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${datePart} - ${timePart}`;
}

export default function ArticleByline({ post, siteName }) {
  const author = getAuthorBySlug(post.author);
  const updated = formatUpdatedAt(post.updatedAt);

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        {author?.avatar && (
          <Image
            src={author.avatar}
            alt={author.name}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
        )}
        <div>
          {author ? (
            <Link href={`/author/${author.slug}`} className="font-serif font-bold text-ink hover:text-brand">
              {author.name}
            </Link>
          ) : (
            <span className="font-serif font-bold text-ink">Staff writer</span>
          )}
          {author?.role && <p className="text-sm text-ink-muted font-sans">{author.role}</p>}
        </div>
      </div>

      {updated && (
        <p className="mt-3 text-sm font-sans text-ink-muted">
          <span className="font-bold text-ink">Updated </span>
          {updated}
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 text-xs font-sans font-bold uppercase tracking-wide text-ink">
          <GoogleIcon className="w-4 h-4" />
          Add {siteName || 'us'} to Google
        </span>
        <span className="text-sm font-sans text-ink-muted">Make our news appear in your searches</span>
      </div>
    </div>
  );
}
