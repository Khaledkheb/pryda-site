function GlassCard({ children, className = "", strong = false }) {
  const glassClass = strong ? "glass-panel glass-panel-strong" : "glass-panel";

  return <div className={`${glassClass} ${className}`}>{children}</div>;
}

export default GlassCard;
