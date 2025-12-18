export function Logo({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <img
      src="/assets/RimaCosmeticsLogo.png"
      alt="Rima Cosmetics Logo"
      className={className}
    />
  );
}
