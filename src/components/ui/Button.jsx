function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
  href,
}) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  const classes = `${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export default Button;
