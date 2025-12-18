export function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <img
      src="/assets/RimaCosmeticsLogo.svg"
      alt="Rima Cosmetics Logo"
      className={`${className} object-contain`}
    />
  );
}
