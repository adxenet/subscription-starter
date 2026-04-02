const Logo = ({ ...props }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="8" fill="#b4090b" />
    {/* Shipping box body */}
    <rect x="7" y="12" width="18" height="13" rx="1.5" stroke="white" strokeWidth="1.8" fill="none" />
    {/* Box lid */}
    <path d="M6 12L16 7L26 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Center tape lines */}
    <line x1="16" y1="12" x2="16" y2="25" stroke="white" strokeWidth="1.2" opacity="0.6" />
    <line x1="12" y1="12" x2="12" y2="15" stroke="white" strokeWidth="1.2" opacity="0.4" />
    <line x1="20" y1="12" x2="20" y2="15" stroke="white" strokeWidth="1.2" opacity="0.4" />
  </svg>
);

export default Logo;
