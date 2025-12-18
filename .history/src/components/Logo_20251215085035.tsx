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
