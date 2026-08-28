import { searchPosts } from '@/lib/data';
import PostCard from '@/components/PostCard';

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  const query = q?.trim();
  return {
    title: query ? `Search results for "${query}"` : 'Search',
  };
}

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = (q || '').trim();
  const results = query ? searchPosts(query) : [];

  return (
    <div className="max-w-container mx-auto px-4 py-8 sm:py-12">
      <h1 className="font-serif text-2xl font-extrabold text-ink sm:text-3xl">
        {query ? <>Search results for &ldquo;{query}&rdquo;</> : 'Search'}
      </h1>
      <p className="mt-2 font-sans text-sm text-ink-muted">
        {query
          ? `${results.length} ${results.length === 1 ? 'result' : 'results'} found`
          : 'Enter a search term using the search icon in the header to find articles.'}
      </p>

      {query && results.length === 0 && (
        <p className="mt-10 font-serif text-ink-muted">
          No articles matched your search. Try a different term.
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-8 flex max-w-3xl flex-col divide-y divide-gray-100">
          {results.map((post) => (
            <div key={post.slug} className="py-6 first:pt-0">
              <PostCard post={post} variant="horizontal" showReadMore />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
