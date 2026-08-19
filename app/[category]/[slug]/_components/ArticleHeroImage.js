import Image from 'next/image';

export default function ArticleHeroImage({ post }) {
  if (!post.image) return null;

  return (
    <figure className="mt-6">
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={post.image}
          alt={post.imageCaption || post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      {(post.imageCaption || post.imageCredit) && (
        <figcaption className="mt-2 text-sm font-sans text-ink-muted flex flex-wrap items-baseline gap-x-2">
          {post.imageCaption && <span>{post.imageCaption}</span>}
          {post.imageCredit && (
            <span className="text-xs uppercase tracking-wide text-ink-light">{post.imageCredit}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
