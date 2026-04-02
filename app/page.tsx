import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Metadata } from 'next';
import RouteTicker from '@/components/ui/RouteTicker';

export const metadata: Metadata = {
  title: 'China Forwarders — Trusted China Freight Forwarder Directory',
  description:
    'Find, compare, and connect with vetted China freight forwarders. Search by service, read reviews, and get freight quotes.'
};

export default async function HomePage() {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from('directory_categories')
    .select('slug, name')
    .order('name');

  const { data: featured } = await supabase
    .from('directory_businesses')
    .select(
      `
      id, slug, name, short_description, city, province,
      accepting_new_clients, avg_rating, review_count, featured
    `
    )
    .eq('status', 'approved')
    .eq('featured', true)
    .order('avg_rating', { ascending: false })
    .limit(6);

  const { count: totalListings } = await supabase
    .from('directory_businesses')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'approved');

  return (
    <>
      {/* Route ticker */}
      <RouteTicker />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        {/* Globe with continents */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
          <svg className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Globe circle and grid */}
            <circle cx="400" cy="400" r="380" stroke="#222" strokeWidth="1.5" />
            <ellipse cx="400" cy="400" rx="380" ry="150" stroke="#222" strokeWidth="0.7" />
            <ellipse cx="400" cy="400" rx="380" ry="280" stroke="#222" strokeWidth="0.5" />
            <ellipse cx="400" cy="400" rx="150" ry="380" stroke="#222" strokeWidth="0.7" />
            <ellipse cx="400" cy="400" rx="280" ry="380" stroke="#222" strokeWidth="0.5" />
            <line x1="20" y1="400" x2="780" y2="400" stroke="#222" strokeWidth="0.5" />
            {/* Asia / China - prominent */}
            <path d="M480 200 C490 195,520 190,540 200 C555 210,565 225,560 245 C555 260,570 275,580 280 C590 285,600 300,595 315 C590 330,580 340,570 350 C560 360,545 365,535 360 C520 352,505 355,495 365 C485 375,470 380,460 370 C445 358,435 345,440 330 C445 315,455 300,465 290 C470 275,468 255,470 240 C472 225,475 210,480 200Z" fill="#222" />
            {/* Southeast Asia */}
            <path d="M540 360 C548 355,558 360,565 370 C570 378,568 390,560 398 C552 405,545 400,540 392 C535 384,533 368,540 360Z" fill="#222" />
            <path d="M575 385 C580 382,588 388,590 396 C592 404,588 412,582 414 C576 416,572 408,572 400 C572 392,570 388,575 385Z" fill="#222" />
            {/* Japan */}
            <path d="M590 240 C594 235,600 238,602 248 C604 258,600 272,595 280 C590 288,584 284,585 274 C586 264,587 248,590 240Z" fill="#222" />
            {/* India */}
            <path d="M440 310 C448 305,460 310,465 322 C470 335,468 350,460 365 C452 378,440 385,432 375 C424 365,420 345,425 330 C428 318,434 312,440 310Z" fill="#222" />
            {/* Europe */}
            <path d="M310 195 C318 188,335 185,348 190 C360 195,368 205,365 218 C362 230,355 238,345 242 C338 245,328 250,318 248 C308 246,298 238,295 225 C292 212,300 200,310 195Z" fill="#222" />
            <path d="M350 195 C358 190,370 192,378 200 C385 208,382 220,375 228 C368 235,360 230,355 222 C350 215,345 202,350 195Z" fill="#222" />
            {/* UK */}
            <path d="M290 195 C294 190,302 192,304 200 C306 208,300 215,295 215 C290 215,286 205,290 195Z" fill="#222" />
            {/* Africa */}
            <path d="M330 310 C340 300,360 295,370 305 C378 315,380 335,375 355 C370 375,365 400,355 420 C345 438,335 445,325 435 C315 425,310 400,312 378 C314 356,318 335,322 320 C325 312,326 306,330 310Z" fill="#222" />
            {/* North America */}
            <path d="M140 190 C155 175,180 170,200 178 C218 185,230 200,235 220 C240 240,238 260,230 278 C222 295,210 305,195 308 C180 310,168 300,160 285 C152 270,145 250,142 232 C140 218,135 200,140 190Z" fill="#222" />
            <path d="M200 180 C210 172,225 170,238 178 C250 185,258 198,255 212 C252 225,242 232,230 228 C218 224,208 215,205 205 C202 195,195 186,200 180Z" fill="#222" />
            {/* Central America */}
            <path d="M175 320 C180 315,190 318,195 328 C200 338,198 350,192 355 C186 360,178 355,175 345 C172 335,170 325,175 320Z" fill="#222" />
            {/* South America */}
            <path d="M210 380 C220 370,238 368,248 380 C258 392,260 415,255 440 C250 465,242 488,230 505 C218 520,205 518,200 502 C195 486,192 460,195 435 C198 410,202 392,210 380Z" fill="#222" />
            {/* Australia */}
            <path d="M560 480 C572 472,592 475,605 488 C618 500,622 518,615 532 C608 545,592 550,578 545 C564 540,552 528,550 512 C548 498,550 486,560 480Z" fill="#222" />
            {/* Middle East */}
            <path d="M400 285 C408 280,418 282,425 290 C430 298,428 308,420 315 C412 320,402 318,398 310 C394 302,394 290,400 285Z" fill="#222" />
            {/* Russia / Siberia */}
            <path d="M370 170 C385 162,410 158,440 162 C468 166,500 172,525 178 C548 184,560 190,555 198 C550 205,530 208,505 205 C480 202,450 198,420 195 C390 192,365 188,358 182 C352 178,360 174,370 170Z" fill="#222" />
          </svg>
        </div>

        <div className="relative max-w-4xl px-6 pt-8 pb-8 mx-auto text-center md:pt-12 md:pb-12">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 mb-6 text-lg font-bold text-white rounded-lg bg-brand-600 hover:bg-brand-700 transition shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:scale-[1.02] transform"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find a Forwarder
          </Link>

          <h1 className="text-2xl font-extrabold tracking-tight text-surface-900 sm:text-3xl md:text-4xl whitespace-nowrap">
            Find Trusted Freight{' '}
            <span className="text-brand-600">Forwarders in China</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-3 text-base text-surface-500">
            Search {totalListings ?? 0}+ vetted forwarders. Compare services, read reviews, and get quotes.
          </p>

          {/* Search bar */}
          <form
            action="/directory"
            method="get"
            className="flex flex-col gap-2 mt-6 sm:flex-row sm:items-center sm:gap-2 max-w-2xl mx-auto"
          >
            <input
              type="search"
              name="q"
              placeholder="Company name, city, or keyword..."
              className="flex-1 px-4 py-2.5 text-sm bg-white border rounded-xl border-surface-300 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 shadow-sm"
            />

            <select
              name="category"
              defaultValue=""
              className="px-4 py-2.5 text-sm bg-white border rounded-xl border-surface-300 text-surface-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 shadow-sm sm:w-48"
            >
              <option value="">All services</option>
              {categories?.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 transition shadow-sm shadow-brand-600/20"
            >
              Search
            </button>
          </form>

          {/* Quick category links */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-xs text-surface-400">Popular:</span>
            {[
              { slug: 'ocean-freight-fcl', name: 'Ocean FCL' },
              { slug: 'air-freight', name: 'Air Freight' },
              { slug: 'amazon-fba-prep', name: 'FBA Prep' },
              { slug: 'customs-clearance', name: 'Customs' }
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/directory?category=${cat.slug}`}
                className="px-2.5 py-1 text-xs font-medium text-surface-600 bg-white border border-surface-200 rounded-full hover:border-brand-300 hover:text-brand-600 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-surface-100 bg-surface-50">
        <div className="max-w-5xl px-6 py-4 mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-surface-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verified listings
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Honest reviews
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free to use
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Updated regularly
            </span>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-6xl px-6 py-16 mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-surface-900">
              Featured Forwarders
            </h2>
            <p className="mt-1 text-sm text-surface-500">
              Top-rated logistics partners handpicked by our team.
            </p>
          </div>
          <Link
            href="/directory"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition"
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {featured?.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((biz) => (
              <li key={biz.id}>
                <Link
                  href={`/directory/${biz.slug}`}
                  className="group flex flex-col h-full p-5 bg-white border border-surface-200 rounded-xl transition hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/50"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-surface-900 group-hover:text-brand-700 transition">
                          {biz.name}
                        </h3>
                        <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-50 rounded">
                          Featured
                        </span>
                      </div>
                      {biz.short_description && (
                        <p className="mt-1.5 text-sm text-surface-500 line-clamp-2">
                          {biz.short_description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {[biz.city, biz.province].filter(Boolean).join(', ')}
                    </span>
                    <span className="flex items-center gap-2">
                      {biz.accepting_new_clients && (
                        <span className="text-green-600 font-medium">Accepting</span>
                      )}
                      {biz.review_count > 0 ? (
                        <span className="font-medium text-amber-600">
                          {Number(biz.avg_rating).toFixed(1)} ★
                        </span>
                      ) : (
                        <span className="text-surface-300">No reviews</span>
                      )}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-surface-400">
            No featured listings yet. Check back soon.
          </p>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/directory"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all forwarders
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-surface-100 bg-surface-50">
        <div className="max-w-3xl px-6 py-16 mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-surface-900">
            Are you a freight forwarder?
          </h2>
          <p className="mt-2 text-base text-surface-500">
            Get listed in our directory and connect with importers looking for
            reliable logistics partners in China.
          </p>
          <div className="flex flex-col items-center gap-3 mt-6 sm:flex-row sm:justify-center">
            <Link
              href="/signin/signup"
              className="px-6 py-3 text-sm font-semibold text-white rounded-xl bg-brand-600 hover:bg-brand-700 transition shadow-sm"
            >
              List your business — free
            </Link>
            <Link
              href="/directory"
              className="px-6 py-3 text-sm font-medium text-surface-600 bg-white border border-surface-200 rounded-xl hover:border-surface-300 transition"
            >
              Browse directory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
