export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <img
      src="/assets/RimaCosmeticsLogo.svg"
      alt="Rima Cosmetics Logo"
      className={className}
    />
  );
}
