import React, { useState } from 'react'
import { PRIORITIES, STATUSES, CATEGORIES } from '../interfaces/Task'

export default function TaskCard({ task, onDelete, onUpdate, onToggle }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    category: task.category,
    status: task.status,
  })
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSave = () => {
    if (!form.title.trim()) return
    onUpdate(task.id, form)
    setEditing(false)
  }

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(task.id)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 3000)
    }
  }

  const priority = PRIORITIES[task.priority]
  const status = STATUSES[task.status]
  const timeAgo = (() => {
    const diff = Date.now() - new Date(task.createdAt)
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'az önce'
    if (mins < 60) return `${mins}dk önce`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}sa önce`
    return `${Math.floor(hrs / 24)}g önce`
  })()

  if (editing) {
    return (
      <div className="animate-in rounded-2xl p-5 glow-accent"
           style={{ background: 'var(--surface)', border: '1px solid var(--accent)' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            Düzenleniyor
          </span>
          <button onClick={() => setEditing(false)} style={{ color: 'var(--muted)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <input
            value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            className="custom-input w-full px-3 py-2 rounded-lg text-sm"
            autoFocus
          />
          <textarea
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            rows={2}
            className="custom-input w-full px-3 py-2 rounded-lg text-sm resize-none"
            placeholder="Açıklama..."
          />
          <div className="grid grid-cols-3 gap-2">
            <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}
                    className="custom-input px-2 py-2 rounded-lg text-xs">
              {Object.entries(PRIORITIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="custom-input px-2 py-2 rounded-lg text-xs">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                    className="custom-input px-2 py-2 rounded-lg text-xs">
              {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary flex-1 py-2 rounded-lg text-xs tracking-wider">
              Kaydet
            </button>
            <button onClick={() => setEditing(false)}
                    className="px-4 py-2 rounded-lg text-xs transition-colors"
                    style={{ background: 'var(--surface2)', color: 'var(--muted)' }}>
              İptal
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-card animate-in rounded-2xl p-5 ${task.completed ? 'completed' : ''}`}
         style={{ background: 'var(--surface)' }}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="custom-checkbox mt-0.5"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`font-semibold text-sm leading-snug ${task.completed ? 'line-through' : ''}`}
                style={{ color: task.completed ? 'var(--muted)' : 'var(--text)' }}>
              {task.title}
            </h3>
            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => setEditing(true)}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#7c5cfc'; e.currentTarget.style.background = 'rgba(124,92,252,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent' }}
                title="Düzenle"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                style={{ color: showConfirm ? '#fc5c7d' : 'var(--muted)', background: showConfirm ? 'rgba(252,92,125,0.1)' : 'transparent' }}
                onMouseEnter={e => { if (!showConfirm) { e.currentTarget.style.color = '#fc5c7d'; e.currentTarget.style.background = 'rgba(252,92,125,0.1)' }}}
                onMouseLeave={e => { if (!showConfirm) { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent' }}}
                title={showConfirm ? 'Emin misin? Tekrar tıkla.' : 'Sil'}
              >
                {showConfirm ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
              {task.description}
            </p>
          )}

          {/* Tags row */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Priority dot */}
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${priority.color}`}></div>
              <span className={`tag-badge ${priority.textColor}`}>{priority.label}</span>
            </div>

            {/* Status */}
            <span className={`tag-badge px-2 py-0.5 rounded-md ${status.bg} ${status.text}`}>
              {status.label}
            </span>

            {/* Category */}
            <span className="tag-badge px-2 py-0.5 rounded-md"
                  style={{ background: 'var(--surface2)', color: 'var(--muted)' }}>
              {task.category}
            </span>

            {/* Time */}
            <span className="tag-badge ml-auto" style={{ color: 'var(--muted)' }}>
              {timeAgo}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
