import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import BlogPostActions from './BlogPostActions';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const supabase = createClient();

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, status, author_name, published_at, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-surface-500">
            Manage blog posts and articles.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition"
        >
          + New Post
        </Link>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          Failed to load posts: {error.message}
        </div>
      )}

      <div className="bg-white border border-surface-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200">
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Title
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Author
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-surface-500">
                  Published
                </th>
                <th className="text-right px-4 py-3 font-medium text-surface-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {posts?.length ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-50 transition">
                    <td className="px-4 py-3">
                      <span className="font-medium text-surface-900">
                        {post.title}
                      </span>
                      <p className="text-xs text-surface-400 mt-0.5">
                        /{post.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-surface-500">
                      {post.author_name ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${
                          post.status === 'published'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-surface-400">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <BlogPostActions id={post.id} slug={post.slug} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-surface-400"
                  >
                    No blog posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
