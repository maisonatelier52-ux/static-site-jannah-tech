import TrendingGrid from '@/components/TrendingGrid';
import MustReadWidget from '@/components/MustReadWidget';
import MostViewedCarousel from '@/components/MostViewedCarousel';
import FollowUsWidget from '@/components/FollowUsWidget';
import LastModifiedWidget from '@/components/LastModifiedWidget';
import PopularWidget from '@/components/PopularWidget';
import AdBox from '@/components/AdBox';
import CategoryTabWidget from '@/components/CategoryTabWidget';
import CategorySection from '@/components/CategorySection';
import OpinionStrip from '@/components/OpinionStrip';
import ThemedFeature from '@/components/ThemedFeature';
import CategoriesWidget from '@/components/CategoriesWidget';
import Newsletter from '@/components/Newsletter';
import LatestArticles from '@/components/LatestArticles';
import PostCard from '@/components/PostCard';
import {
  getAllPosts,
  getMostViewedPosts,
  getRecentPosts,
  getPostsByCategory,
} from '@/lib/data';

export default function HomePage() {
  // Running list of slugs already shown on the page, in render order,
  // so later sections don't repeat articles used by earlier ones.
  const used = new Set();
  const take = (posts) => {
    posts.forEach((p) => used.add(p.slug));
    return posts;
  };
  const usedSlugs = () => Array.from(used);

  // The right column's image-led slot in the top trending package
  // originally fell on "Dick's Sporting Goods shares slide after Foot
  // Locker weighs on earnings". It's swapped here for a different
  // business story so the homepage lead-in shows fresh news — the
  // original story isn't deleted, just no longer pinned to this slot,
  // so it remains free to surface in the Business tab section below.
  const REPLACED_TRENDING_SLUG = 'dicks-sporting-goods-foot-locker-earnings-miss';
  const trendingReplacementSlug = 'alibaba-sells-videogame-business-stake';

  const trendingExclude = usedSlugs();
  const trending = take(
    getAllPosts()
      .filter((p) => !used.has(p.slug) && p.slug !== REPLACED_TRENDING_SLUG)
      .slice(0, 6)
      .concat(getAllPosts().filter((p) => p.slug === trendingReplacementSlug))
  );

  const mustReadExclude = usedSlugs();
  const mustRead = take(getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 6));

  const popularExclude = usedSlugs();
  const popular = take(getMostViewedPosts(9, popularExclude));

  const recentForSidebar = getRecentPosts(6, null, usedSlugs());

  const businessExclude = usedSlugs();
  const businessTab = take(getPostsByCategory('business', businessExclude).slice(0, 4));

  const headphonesExclude = usedSlugs();
  const headphonesTab = take(getPostsByCategory('headphones', []).slice(0, 4));

  const reviewsExclude = usedSlugs();
  const reviewsSection = take(getPostsByCategory('reviews', reviewsExclude).slice(0, 4));

  const financeExclude = usedSlugs();
  const financePosts = take(getPostsByCategory('finance', financeExclude).slice(0, 2));

  const worldExclude = usedSlugs();
  const worldSection = take(getPostsByCategory('world', worldExclude).slice(0, 5));

  const latest = getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 5);

  return (
    <div>
      <div className="max-w-container mx-auto px-4 py-6 sm:py-10">
        <TrendingGrid
          excludeSlugs={[...trendingExclude, REPLACED_TRENDING_SLUG]}
          rightCSlug={trendingReplacementSlug}
        />
      </div>

      <div className="max-w-container mx-auto px-4 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-10">
          <MustReadWidget excludeSlugs={mustReadExclude} />
          <MostViewedCarousel excludeSlugs={popularExclude} />
        </div>
        <aside className="space-y-8">
          <FollowUsWidget />
          <LastModifiedWidget posts={recentForSidebar} />
        </aside>
      </div>

      <div className="max-w-container mx-auto px-4">
        <AdBox size="inline" />
      </div>


      <div className="max-w-container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 items-start">
        <div className="lg:pr-8">
          <PopularWidget posts={popular} />
        </div>
        <div className="lg:px-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="business"
            excludeSlugs={businessExclude}
            showComments
          />
        </div>
        <div className="lg:pl-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="headphones"
            excludeSlugs={[]}
          />
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <CategorySection
          categorySlug="reviews"
          limit={4}
          excludeSlugs={reviewsExclude}
        />
        <div className="space-y-8">
          <CategoriesWidget />
        </div>
      </div>

      <ThemedFeature label="Markets" posts={financePosts} />

      <div className="max-w-container mx-auto px-4 py-8">
        <OpinionStrip
          categorySlug="world"
          limit={5}
          excludeSlugs={worldExclude}
        />
      </div>

      <div className="max-w-container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <LatestArticles posts={latest} title="Latest news" columns={1} />
        <aside className="space-y-8">
          <AdBox size="sidebar" />
          <Newsletter />
        </aside>
      </div>
    </div>
  );
}
