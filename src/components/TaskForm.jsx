import React, { useEffect, useState } from 'react'
import { CATEGORIES, DEFAULT_TASK_FORM, PRIORITIES } from '../interfaces/Task'

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

export default function TaskForm({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(DEFAULT_TASK_FORM)
  const [error, setError] = useState('')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setError('')
      }
    }

    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const resetForm = () => {
    setForm(DEFAULT_TASK_FORM)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const title = form.title.trim()
    if (title.length < 3) {
      setError('Baslik en az 3 karakter olmali.')
      return
    }

    if (form.dueDate && form.dueDate < getToday()) {
      setError('Teslim tarihi bugunden eski olamaz.')
      return
    }

    onAdd({ ...form, title })
    resetForm()
    setOpen(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleCancel = () => {
    setOpen(false)
    resetForm()
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 mb-8">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-primary w-full py-4 rounded-2xl text-sm tracking-widest uppercase flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni Gorev Ekle
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="animate-in rounded-2xl p-6 glow-accent"
          style={{ background: 'var(--surface)', border: '1px solid var(--accent)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold tracking-tight">Yeni Gorev</h2>
            <button
              type="button"
              onClick={handleCancel}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = 'var(--muted)'
              }}
              aria-label="Formu kapat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                Baslik *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Gorev basligi..."
                className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                autoFocus
              />
              {error && <p className="mt-2 text-xs font-mono text-rose-300">{error}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                Aciklama
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Gorev aciklamasi... (opsiyonel)"
                rows={3}
                className="custom-input w-full px-4 py-3 rounded-xl text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                  Oncelik
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="custom-input w-full px-4 py-3 rounded-xl text-sm cursor-pointer"
                >
                  {Object.entries(PRIORITIES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                  Kategori
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="custom-input w-full px-4 py-3 rounded-xl text-sm cursor-pointer"
                >
                  {CATEGORIES.map((categoryName) => (
                    <option key={categoryName} value={categoryName}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                  Teslim Tarihi
                </label>
                <input
                  type="date"
                  name="dueDate"
                  min={getToday()}
                  value={form.dueDate}
                  onChange={handleChange}
                  className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl text-sm transition-colors"
                style={{ background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}
              >
                Iptal
              </button>
              <button type="submit" className="btn-primary flex-1 py-3 rounded-xl text-sm tracking-wider">
                Gorevi Ekle
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
