import TrendingGrid from '@/components/TrendingGrid';
import MustReadWidget from '@/components/MustReadWidget';
import MostViewedCarousel from '@/components/MostViewedCarousel';
import FollowUsWidget from '@/components/FollowUsWidget';
import LastModifiedWidget from '@/components/LastModifiedWidget';
import PopularWidget from '@/components/PopularWidget';
import AdBox from '@/components/AdBox';
import VideoWidget from '@/components/VideoWidget';
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

  const trendingExclude = usedSlugs();
  const trending = take(getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 6));

  const mustReadExclude = usedSlugs();
  const mustRead = take(getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 6));

  const popularExclude = usedSlugs();
  const popular = take(getMostViewedPosts(9, popularExclude));

  const recentForSidebar = getRecentPosts(6, null, usedSlugs());

  const appsExclude = usedSlugs();
  const appsTab = take(getPostsByCategory('apps', appsExclude).slice(0, 4));

  const headphonesExclude = usedSlugs();
  const headphonesTab = take(getPostsByCategory('headphones', []).slice(0, 4));

  const reviewsExclude = usedSlugs();
  const reviewsSection = take(getPostsByCategory('reviews', reviewsExclude).slice(0, 4));

  const carsExclude = usedSlugs();
  const carsPosts = take(getPostsByCategory('cars', carsExclude).slice(0, 2));

  const scienceExclude = usedSlugs();
  const scienceSection = take(getPostsByCategory('science', scienceExclude).slice(0, 5));

  const latest = getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 5);

  return (
    <div>
      <div className="max-w-container mx-auto px-4 py-6 sm:py-10">
        <TrendingGrid excludeSlugs={trendingExclude} />
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

      <div className="my-8">
        <VideoWidget />
      </div>

      <div className="max-w-container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 items-start">
        <div className="lg:pr-8">
          <PopularWidget posts={popular} />
        </div>
        <div className="lg:px-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="apps"
            excludeSlugs={appsExclude}
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

      <ThemedFeature label="On the Road" posts={carsPosts} />

      <div className="max-w-container mx-auto px-4 py-8">
        <OpinionStrip
          categorySlug="science"
          limit={5}
          excludeSlugs={scienceExclude}
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
