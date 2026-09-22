function IconButton({
  children,
  label,
  className = "",
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      aria-label={label}
      onClick={onClick}
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-white/5
        text-white
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-cyan-300/30
        hover:bg-cyan-300/10
        hover:text-cyan-200
        focus-visible:outline-2
        focus-visible:outline-cyan-300
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default IconButton;
