const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className || 'w-8 h-8'}
    {...props}
  >
    {/* Bottom box - brown */}
    <rect x="2" y="18" width="16" height="12" rx="1.5" fill="#8B5E3C" />
    <line x1="10" y1="18" x2="10" y2="30" stroke="#6B3F1F" strokeWidth="1" />
    <line x1="5" y1="24" x2="15" y2="24" stroke="#6B3F1F" strokeWidth="0.8" />

    {/* Middle box - red */}
    <rect x="12" y="10" width="14" height="12" rx="1.5" fill="#b4090b" />
    <line x1="19" y1="10" x2="19" y2="22" stroke="#8a0708" strokeWidth="1" />
    <line x1="15" y1="16" x2="23" y2="16" stroke="#8a0708" strokeWidth="0.8" />

    {/* Top box - darker red */}
    <rect x="6" y="2" width="12" height="10" rx="1.5" fill="#d42a2a" />
    <line x1="12" y1="2" x2="12" y2="12" stroke="#b4090b" strokeWidth="0.8" />
    <line x1="9" y1="7" x2="15" y2="7" stroke="#b4090b" strokeWidth="0.7" />
  </svg>
);

export default Logo;
