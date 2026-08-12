/** Marca DK Eletromóveis — monograma em contêiner com a paleta verde. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      role="img"
      aria-label="DK Eletromóveis"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="11" fill="#3E632F" />
      <rect width="40" height="40" rx="11" fill="url(#dk-g)" fillOpacity="0.35" />
      <path
        d="M9 11h6.2c4.8 0 8 3.2 8 9s-3.2 9-8 9H9V11Zm4.1 3.5v11h1.9c2.6 0 4-2 4-5.5s-1.4-5.5-4-5.5h-1.9Z"
        fill="#F3F2EA"
      />
      <path
        d="M25.4 11h3.9v7.3l5.1-7.3H39l-6 8.2 6.2 9.8h-4.8l-4.2-6.9-1 1.4V29h-3.9V11Z"
        fill="#ABB369"
      />
      <defs>
        <linearGradient id="dk-g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B7A3A" />
          <stop offset="1" stopColor="#234A29" />
        </linearGradient>
      </defs>
    </svg>
  );
}
