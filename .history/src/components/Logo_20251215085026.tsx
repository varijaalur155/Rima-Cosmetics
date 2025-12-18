export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} bg-white rounded-full flex items-center justify-center`}>
      <img
        src="/assets/RimaCosmeticsLogo.svg"
        alt="Rima Cosmetics Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
        opacity="0.7"
      />
      <path
        d="M50 45L70 55"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M50 60L65 68"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="leafGradient" x1="50" y1="10" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
