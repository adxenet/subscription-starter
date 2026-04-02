'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { createBlogPost, updateBlogPost } from './actions';

interface Props {
  post?: Record<string, any>;
}

export default function BlogPostForm({ post }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const isEdit = !!post;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: Record<string, unknown> = {
      title: form.get('title'),
      slug: form.get('slug') || undefined,
      excerpt: form.get('excerpt') || null,
      body_html: form.get('body_html') || null,
      cover_image_url: form.get('cover_image_url') || null,
      author_name: form.get('author_name') || 'China Forwarders',
      reading_time_min: form.get('reading_time_min') || null,
      seo_title: form.get('seo_title') || null,
      seo_description: form.get('seo_description') || null,
      status: form.get('status'),
      published_at: post?.published_at
    };

    startTransition(async () => {
      try {
        if (isEdit) {
          await updateBlogPost(post.id, data);
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
          router.refresh();
        } else {
          const id = await createBlogPost(data);
          router.push(`/admin/blog/${id}`);
        }
      } catch (err) {
        alert('Failed to save: ' + (err as Error).message);
      }
    });
  }

  const inputClass =
    'w-full px-3 py-2 text-sm border border-surface-200 rounded-lg bg-white text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20';
  const labelClass = 'block text-sm font-medium text-surface-700 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Post Details
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Title *</label>
            <input
              name="title"
              defaultValue={post?.title ?? ''}
              required
              className={inputClass}
              placeholder="Article title"
            />
          </div>
          <div>
            <label className={labelClass}>Slug {isEdit ? '' : '(auto-generated if empty)'}</label>
            <input
              name="slug"
              defaultValue={post?.slug ?? ''}
              className={inputClass}
              placeholder="article-url-slug"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea
            name="excerpt"
            defaultValue={post?.excerpt ?? ''}
            rows={2}
            className={inputClass}
            placeholder="Brief summary for listing cards and SEO"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Author</label>
            <input
              name="author_name"
              defaultValue={post?.author_name ?? 'China Forwarders'}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Reading Time (min)</label>
            <input
              name="reading_time_min"
              type="number"
              min={1}
              defaultValue={post?.reading_time_min ?? ''}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cover Image URL</label>
            <input
              name="cover_image_url"
              type="url"
              defaultValue={post?.cover_image_url ?? ''}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Content (HTML)
        </h3>
        <textarea
          name="body_html"
          defaultValue={post?.body_html ?? ''}
          rows={20}
          className={`${inputClass} font-mono text-xs leading-relaxed`}
          placeholder="<h2>Introduction</h2><p>Your article content here...</p>"
        />
      </div>

      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          SEO
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input
              name="seo_title"
              defaultValue={post?.seo_title ?? ''}
              className={inputClass}
              placeholder="Custom title for search engines"
            />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <input
              name="seo_description"
              defaultValue={post?.seo_description ?? ''}
              className={inputClass}
              placeholder="Meta description for search results"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-surface-900 pb-3 border-b border-surface-100">
          Publishing
        </h3>
        <div className="sm:w-1/2">
          <label className={labelClass}>Status</label>
          <select
            name="status"
            defaultValue={post?.status ?? 'draft'}
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        {post?.published_at && (
          <p className="text-xs text-surface-400">
            Published: {new Date(post.published_at).toLocaleString()}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition disabled:opacity-50"
        >
          {isPending
            ? 'Saving...'
            : isEdit
              ? 'Save Changes'
              : 'Create Post'}
        </button>
        {saved && (
          <span className="text-sm text-green-600 font-medium">
            Changes saved!
          </span>
        )}
        {isEdit && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm text-surface-400 hover:text-surface-600 transition"
          >
            View public page &rarr;
          </a>
        )}
      </div>
    </form>
  );
}
