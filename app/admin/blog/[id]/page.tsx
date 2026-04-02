import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogPostForm from '../BlogPostForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: string };
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/blog"
          className="text-sm text-surface-400 hover:text-surface-600 transition"
        >
          &larr; Back to blog posts
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-surface-900">
          Edit: {post.title}
        </h1>
        <p className="mt-1 text-sm text-surface-500">
          ID: {post.id} &middot; Slug: {post.slug}
        </p>
      </div>

      <BlogPostForm post={post} />
    </div>
  );
}
