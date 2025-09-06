export default function Button({ className = "", variant = "primary", ...props }) {
  const base = "btn " + (variant === "primary" ? "btn-primary" : "btn-ghost")
  return <button className={`${base} ${className}`} {...props} />
}
