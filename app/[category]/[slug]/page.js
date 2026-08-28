import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getSite,
  getCategoryBySlug,
} from '@/lib/data';
import {
  getArticleMetadata,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getArticleBreadcrumbItems,
} from '@/lib/seo';

import Breadcrumb from '@/components/Breadcrumb';
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
  return getArticleMetadata(post);
}

export default async function DetailPage({ params }) {
  const { category: categorySlug, slug } = await params;
  const post = getPostByCategoryAndSlug(categorySlug, slug);
  if (!post) notFound();

  const site = getSite();
  const category = getCategoryBySlug(categorySlug);

  const articleJsonLd = getArticleJsonLd(post);
  const breadcrumbItems = getArticleBreadcrumbItems(post, category);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbItems);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-0 py-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4">
        <ArticleHeader post={post} />
      </div>
      <ArticleHeroImage post={post} />
      <ArticleByline post={post} siteName={site?.name} />
      <ArticleBody post={post} />
      <ArticleFooterMeta premium={post.premium} linksOfInterest={post.linksOfInterest} />
      <CommentsSection comments={post.commentsList} />
    </div>
  );
}
