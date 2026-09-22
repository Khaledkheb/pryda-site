function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && <span className="text-label">{eyebrow}</span>}

      {title && <h2 className="text-heading mt-3">{title}</h2>}

      {description && <p className="text-body mt-4">{description}</p>}
    </div>
  );
}

export default SectionHeading;
