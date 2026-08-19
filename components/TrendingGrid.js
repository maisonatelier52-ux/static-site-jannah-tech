import TrendingStoryItem from '@/components/TrendingStoryItem';
import { getAllPosts, getAuthorBySlug, getCategoryBySlug, getPostUrl } from '@/lib/data';

/**
 * Newspaper-style "trending now" package: three columns — a narrow left
 * column of small stories, a wide center column with one large image-led
 * feature story, and a narrow right column with two stories (a quoted
 * pull-line story, then one image-led). Dividers run between every
 * block, both the horizontal rules inside a column and the vertical
 * rule between columns.
 *
 * On mobile/tablet (stacked, single column) the big image-led feature
 * story is shown first, with the left and right column stories
 * following below it — reordered via CSS `order` so the source/DOM
 * order (used for the desktop grid placement) doesn't have to change.
 *
 * excludeSlugs lets the homepage avoid repeating a story used here in a
 * later section.
 */
export default function TrendingGrid({ excludeSlugs = [] }) {
  const exclude = new Set(excludeSlugs);
  const pool = getAllPosts().filter((p) => !exclude.has(p.slug));
  if (pool.length < 6) return null;

  const [
    leftA, leftB, leftC,
    center,
    rightB, rightC,
  ] = pool;

  const storyProps = (post, { bullet = false } = {}) => {
    const author = getAuthorBySlug(post.author);
    const category = getCategoryBySlug(post.category);
    return {
      href: getPostUrl(post),
      kicker: `${category ? category.name : 'News'}.`,
      headline: post.title,
      byline: author ? author.name.toUpperCase() : '',
      comments: post.comments,
      bullets: bullet && post.subtitle
        ? [{ lead: post.subtitle, text: post.excerpt }]
        : [],
    };
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr_1fr] gap-8 lg:gap-0">

      {/* Left column — 2nd on mobile (stacks below the big feature story), 1st on desktop */}
      <div className="order-2 lg:order-1 pt-6 border-t border-[#808080]/40 lg:pt-0 lg:border-t-0 lg:pr-8 space-y-6">
        <TrendingStoryItem {...storyProps(leftA, { bullet: true })} />
        <div className="pt-6 border-t border-[#808080]/40">
          <TrendingStoryItem {...storyProps(leftB)} />
        </div>
        <div className="pt-6 border-t border-[#808080]/40">
          <TrendingStoryItem {...storyProps(leftC, { bullet: true })} />
        </div>
      </div>

      {/* Center column — the large image-led feature, shown first on mobile */}
      <div className="order-1 lg:order-2 lg:px-8 lg:border-l lg:border-[#808080]/40">
        <TrendingStoryItem
          {...(() => {
            const author = getAuthorBySlug(center.author);
            const category = getCategoryBySlug(center.category);
            const sentences = center.excerpt.split(/(?<=[.!?])\s+/).filter(Boolean);
            const bullets = [];
            if (center.subtitle) bullets.push({ lead: center.subtitle, text: sentences[0] || center.excerpt });
            if (sentences[1]) bullets.push({ text: sentences[1] });
            return {
              href: getPostUrl(center),
              kicker: `${category ? category.name : 'News'}.`,
              headline: center.title,
              byline: author ? author.name.toUpperCase() : '',
              comments: center.comments,
              bullets,
              image: { src: center.image, alt: center.title },
              size: 'lg',
              imageAspect: 'aspect-[16/10]',
            };
          })()}
        />
      </div>

      {/* Right column — 3rd on both mobile and desktop */}
      <div className="order-3 pt-6 border-t border-[#808080]/40 lg:pt-0 lg:border-t-0 lg:border-l lg:border-[#808080]/40 lg:pl-8 space-y-6">
        <TrendingStoryItem
          {...(() => {
            const author = getAuthorBySlug(rightB.author);
            return {
              href: getPostUrl(rightB),
              kicker: rightB.subtitle || rightB.title,
              kickerQuoted: true,
              headline: rightB.excerpt,
              byline: author ? author.name.toUpperCase() : '',
              comments: rightB.comments,
            };
          })()}
        />
        <div className="pt-6 border-t border-[#808080]/40">
          <TrendingStoryItem
            {...storyProps(rightC)}
            image={{ src: rightC.image, alt: rightC.title }}
          />
        </div>
      </div>
    </section>
  );
}
