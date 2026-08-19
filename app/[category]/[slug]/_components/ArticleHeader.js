import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/data';
import ShareButton from './ShareButton';
import { CommentIcon } from './icons';

export default function ArticleHeader({ post }) {
  const category = getCategoryBySlug(post.category);
  const commentCount = post.commentsList?.length ?? post.comments ?? 0;

  return (
    <header>
      {category && (
        <Link
          href={`/${category.slug}`}
          className="inline-block font-sans font-extrabold uppercase tracking-wide text-xs sm:text-sm text-ink hover:text-brand"
        >
          {category.name}
        </Link>
      )}

      <h1 className="mt-2 font-serif font-extrabold leading-[1.08] text-3xl sm:text-4xl lg:text-[42px] text-ink">
        {post.title}
      </h1>

      {post.subtitle && (
        <p className="mt-4 font-serif text-lg sm:text-xl text-ink-light leading-snug">
          {post.subtitle}
        </p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <ShareButton title={post.title} />
        <a
          href="#comments"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm font-sans font-medium text-ink hover:border-ink transition-colors"
        >
          <CommentIcon className="w-4 h-4" />
          {commentCount} comment{commentCount === 1 ? '' : 's'}
        </a>
      </div>
    </header>
  );
}
