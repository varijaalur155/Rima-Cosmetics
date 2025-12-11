import BusinessLogo from '../assets/BusinessLogo.svg';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <img src={BusinessLogo} alt="Business Logo" className={className} />
  );
}