import Link from 'next/link';
import BlogPostForm from '../BlogPostForm';

export default function NewBlogPostPage() {
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
          New Blog Post
        </h1>
        <p className="mt-1 text-sm text-surface-500">
          Write a new article for the China Forwarders blog.
        </p>
      </div>

      <BlogPostForm />
    </div>
  );
}
