export default function Input({ label, className = "", ...props }) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="label">{label}</span>}
      <input className={`input ${className}`} {...props} />
    </label>
  )
}
