'use client';

const ROUTES = [
  { origin: 'Shanghai', dest: 'Los Angeles', mode: 'FCL', trend: 'up', rate: '$3,850' },
  { origin: 'Shenzhen', dest: 'Rotterdam', mode: 'FCL', trend: 'down', rate: '$2,920' },
  { origin: 'Guangzhou', dest: 'New York', mode: 'LCL', trend: 'up', rate: '$68/CBM' },
  { origin: 'Ningbo', dest: 'Hamburg', mode: 'FCL', trend: 'stable', rate: '$3,100' },
  { origin: 'Shanghai', dest: 'Felixstowe', mode: 'FCL', trend: 'down', rate: '$2,750' },
  { origin: 'Yantian', dest: 'Long Beach', mode: 'FCL', trend: 'up', rate: '$4,100' },
  { origin: 'Shenzhen', dest: 'Sydney', mode: 'Air', trend: 'stable', rate: '$4.20/kg' },
  { origin: 'Guangzhou', dest: 'Dubai', mode: 'FCL', trend: 'down', rate: '$1,450' },
  { origin: 'Shanghai', dest: 'Vancouver', mode: 'FCL', trend: 'up', rate: '$3,600' },
  { origin: 'Xiamen', dest: 'Savannah', mode: 'FCL', trend: 'stable', rate: '$3,350' },
  { origin: 'Qingdao', dest: 'Antwerp', mode: 'FCL', trend: 'down', rate: '$2,680' },
  { origin: 'Shenzhen', dest: 'London', mode: 'Air', trend: 'up', rate: '$5.10/kg' },
  { origin: 'Shanghai', dest: 'Tokyo', mode: 'LCL', trend: 'stable', rate: '$42/CBM' },
  { origin: 'Ningbo', dest: 'Melbourne', mode: 'FCL', trend: 'up', rate: '$2,200' },
  { origin: 'Guangzhou', dest: 'Toronto', mode: 'FCL', trend: 'down', rate: '$3,900' },
];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') {
    return (
      <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  if (trend === 'down') {
    return (
      <svg className="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14" />
    </svg>
  );
}

export default function RouteTicker() {
  const items = [...ROUTES, ...ROUTES];

  return (
    <div className="relative overflow-hidden bg-surface-900 border-y border-surface-800">
      <div className="flex animate-ticker whitespace-nowrap py-2.5">
        {items.map((route, i) => (
          <div
            key={`${route.origin}-${route.dest}-${i}`}
            className="inline-flex items-center gap-2 px-5 text-sm shrink-0"
          >
            <span className="font-medium text-white">
              {route.origin}
            </span>
            <svg className="w-3 h-3 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-medium text-white">
              {route.dest}
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-surface-800 text-surface-400">
              {route.mode}
            </span>
            <span className="font-semibold text-surface-300">
              {route.rate}
            </span>
            <TrendIcon trend={route.trend} />
            <span className="text-surface-700 ml-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
