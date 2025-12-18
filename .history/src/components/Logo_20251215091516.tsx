export function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <img
      src="/assets/RimaCosmeticsLogo.svg"
      alt="Rima Cosmetics Logo"
      className={className}
    />
  );
}
