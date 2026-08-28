import Image from 'next/image';

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

export default function ArticleBody({ post }) {
  const blocks = post.content || [];

  return (
    <div className="mt-2">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
