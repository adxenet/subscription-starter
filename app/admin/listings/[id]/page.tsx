import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ListingEditForm from './ListingEditForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: string };
}

export default async function EditListingPage({ params }: PageProps) {
  const supabase = createClient();

  const { data: listing, error } = await supabase
    .from('directory_businesses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !listing) {
    notFound();
  }

  const { data: categories } = await supabase
    .from('directory_categories')
    .select('id, name, slug')
    .order('name');

  const { data: mappedCategories } = await supabase
    .from('directory_business_category_map')
    .select('category_id')
    .eq('business_id', params.id);

  const currentCategoryIds = mappedCategories?.map((m) => m.category_id) ?? [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/listings"
          className="text-sm text-surface-400 hover:text-surface-600 transition"
        >
          &larr; Back to listings
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-surface-900">
          Edit: {listing.name}
        </h1>
        <p className="mt-1 text-sm text-surface-500">
          ID: {listing.id} &middot; Slug: {listing.slug}
        </p>
      </div>

      <ListingEditForm
        listing={listing}
        categories={categories ?? []}
        currentCategoryIds={currentCategoryIds}
      />
    </div>
  );
}
