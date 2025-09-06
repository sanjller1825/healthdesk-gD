export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="px-5 py-3 border-t border-slate-200">{footer}</div>}
      </div>
    </div>
  )
}
