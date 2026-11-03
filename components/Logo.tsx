export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display font-bold text-[26px] leading-none tracking-[-0.045em] ${className}`}>
      <span className="text-white">Web</span><span className="text-accent">Alp</span>
    </span>
  )
}
