import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getRelatedPosts,
  getSite,
} from '@/lib/data';

import ArticleHeader from './_components/ArticleHeader';
import ArticleHeroImage from './_components/ArticleHeroImage';
import ArticleByline from './_components/ArticleByline';
import ArticleBody from './_components/ArticleBody';
import ArticleFooterMeta from './_components/ArticleFooterMeta';
import CommentsSection from './_components/CommentsSection';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug } = await params;
  const post = getPostByCategoryAndSlug(categorySlug, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.subtitle || post.excerpt,
  };
}

export default async function DetailPage({ params }) {
  const { category: categorySlug, slug } = await params;
  const post = getPostByCategoryAndSlug(categorySlug, slug);
  if (!post) notFound();

  const site = getSite();
  const [relatedPost] = getRelatedPosts(post, 1);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-0 py-8">
      <ArticleHeader post={post} />
      <ArticleHeroImage post={post} />
      <ArticleByline post={post} siteName={site?.name} />
      <ArticleBody post={post} relatedPost={relatedPost} />
      <ArticleFooterMeta premium={post.premium} linksOfInterest={post.linksOfInterest} />
      <CommentsSection comments={post.commentsList} />
    </div>
  );
}
