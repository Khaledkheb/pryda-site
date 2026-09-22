function Container({ children, className = "" }) {
  return <div className={`container-site ${className}`}>{children}</div>;
}

export default Container;
