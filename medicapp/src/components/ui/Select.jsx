export default function Select({ label, className = "", children, ...props }) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="label">{label}</span>}
      <select className={`select ${className}`} {...props}>{children}</select>
    </label>
  )
}
