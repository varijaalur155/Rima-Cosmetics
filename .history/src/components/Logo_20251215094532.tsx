export function Logo({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <img
      src="/assets/RimaCosmeticsLogo.png"
      alt="Rima Cosmetics Logo"
      className={className}
    />
  );
}
