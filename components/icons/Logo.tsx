const Logo = ({ ...props }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="8" fill="#2563eb" />
    <path
      d="M10 16.5L14 20.5L22 12.5"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;
