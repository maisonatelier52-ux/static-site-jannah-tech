import Image from 'next/image';
import RelatedStoryCard from './RelatedStoryCard';

// Wraps any occurrences of the given phrases in <strong>, in the order they
// appear in the text. `bold` phrases are exact substrings authored alongside
// the paragraph text in posts.json, so a straightforward split is reliable.
function renderParagraphText(text, boldPhrases = []) {
  if (!boldPhrases.length) return text;

  const escaped = boldPhrases
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!escaped.length) return text;

  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    boldPhrases.includes(part) ? (
      <strong key={i} className="font-bold text-ink">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2
          id={block.id}
          className="mt-8 mb-3 font-sans font-extrabold text-xl sm:text-2xl text-ink scroll-mt-24"
        >
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="mb-5 font-serif text-lg leading-relaxed text-ink">
          {renderParagraphText(block.text, block.bold)}
        </p>
      );
    case 'quote':
      return (
        <blockquote className="mb-6 pl-5 border-l-4 border-brand font-serif italic text-xl text-ink-light leading-snug">
          {block.text}
        </blockquote>
      );
    case 'list':
      return (
        <ul className="mb-6 pl-5 space-y-2 list-disc font-serif text-lg text-ink">
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
            <Image src={block.src} alt={block.caption || ''} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-sm font-sans text-ink-muted">{block.caption}</figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

export default function ArticleBody({ post, relatedPost }) {
  const blocks = post.content || [];

  // Split the body so a sticky related-story card can sit alongside the
  // first stretch of paragraphs (matching the video) while the remaining
  // blocks continue underneath in the text column.
  const splitIndex = Math.min(4, blocks.length);
  const before = blocks.slice(0, splitIndex);
  const after = blocks.slice(splitIndex);

  if (!relatedPost || after.length === 0) {
    return (
      <div className="mt-2">
        {blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-2 lg:grid lg:grid-cols-[1fr_280px] lg:gap-x-8">
      <div>
        {before.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      <div className="hidden lg:block lg:row-span-2 lg:sticky lg:top-24 self-start">
        <RelatedStoryCard post={relatedPost} />
      </div>

      <div className="lg:col-start-1">
        {after.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
