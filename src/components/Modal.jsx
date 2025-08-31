import React, { useEffect } from 'react'

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className={`modal ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={open ? 'false':'true'} onClick={(e) => { if (e.target.classList.contains('modal')) onClose() }}>
      <div className="modal-card" role="document">
        <button className="modal-close" aria-label="Close modal" onClick={onClose}>✕</button>
        <div id="modalContent">{children || <div><p className="muted">Demo not available.</p></div>}</div>
      </div>
    </div>
  )
}
