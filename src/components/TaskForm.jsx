import React, { useState } from 'react'
import { PRIORITIES, CATEGORIES } from '../interfaces/Task'

export default function TaskForm({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Genel',
  })
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setError('Görev başlığı boş bırakılamaz.')
      return
    }
    onAdd(form)
    setForm({ title: '', description: '', priority: 'medium', category: 'Genel' })
    setError('')
    setOpen(false)
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 mb-8">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="btn-primary w-full py-4 rounded-2xl text-sm tracking-widest uppercase flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni Görev Ekle
        </button>
      ) : (
        <div className="animate-in rounded-2xl p-6 glow-accent" 
             style={{ background: 'var(--surface)', border: '1px solid var(--accent)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold tracking-tight">Yeni Görev</h2>
            <button onClick={() => setOpen(false)} 
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                Başlık *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Görev başlığı..."
                className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-xs font-mono" style={{ color: 'var(--accent2)' }}>{error}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                Açıklama
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Görev açıklaması... (opsiyonel)"
                rows={2}
                className="custom-input w-full px-4 py-3 rounded-xl text-sm resize-none"
              />
            </div>

            {/* Priority + Category row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                  Öncelik
                </label>
                <select name="priority" value={form.priority} onChange={handleChange}
                        className="custom-input w-full px-4 py-3 rounded-xl text-sm cursor-pointer">
                  {Object.entries(PRIORITIES).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2 font-mono" style={{ color: 'var(--muted)' }}>
                  Kategori
                </label>
                <select name="category" value={form.category} onChange={handleChange}
                        className="custom-input w-full px-4 py-3 rounded-xl text-sm cursor-pointer">
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={handleSubmit} className="btn-primary flex-1 py-3 rounded-xl text-sm tracking-wider">
                Görevi Ekle
              </button>
              <button onClick={() => { setOpen(false); setError('') }}
                      className="px-6 py-3 rounded-xl text-sm transition-colors"
                      style={{ background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
