import React, { useEffect, useRef, useState } from 'react'
import {
  CATEGORIES,
  formatRelativeTime,
  isOverdue,
  PRIORITIES,
  STATUSES,
} from '../interfaces/Task'

export default function TaskCard({ task, onDelete, onUpdate, onToggle }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    category: task.category,
    status: task.status,
    dueDate: task.dueDate || '',
  })
  const [showConfirm, setShowConfirm] = useState(false)
  const confirmTimeoutRef = useRef(null)

  useEffect(() => {
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      status: task.status,
      dueDate: task.dueDate || '',
    })
  }, [task])

  useEffect(() => {
    return () => {
      if (confirmTimeoutRef.current) {
        clearTimeout(confirmTimeoutRef.current)
      }
    }
  }, [])

  const handleSave = () => {
    if (!form.title.trim()) return

    onUpdate(task.id, {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate || null,
    })
    setEditing(false)
  }

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(task.id)
      return
    }

    setShowConfirm(true)
    if (confirmTimeoutRef.current) {
      clearTimeout(confirmTimeoutRef.current)
    }

    confirmTimeoutRef.current = setTimeout(() => {
      setShowConfirm(false)
      confirmTimeoutRef.current = null
    }, 3000)
  }

  const priority = PRIORITIES[task.priority]
  const status = STATUSES[task.status]
  const overdue = isOverdue(task)
  const createdLabel = formatRelativeTime(task.createdAt)
  const dueDateLabel = task.dueDate ? new Date(task.dueDate).toLocaleDateString('tr-TR') : 'Tarih yok'

  if (editing) {
    return (
      <div className="animate-in rounded-2xl p-5 glow-accent" style={{ background: 'var(--surface)', border: '1px solid var(--accent)' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            Duzenleme Modu
          </span>
          <button type="button" onClick={() => setEditing(false)} style={{ color: 'var(--muted)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            className="custom-input w-full px-3 py-2 rounded-lg text-sm"
            autoFocus
          />
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            rows={2}
            className="custom-input w-full px-3 py-2 rounded-lg text-sm resize-none"
            placeholder="Aciklama..."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <select
              value={form.priority}
              onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
              className="custom-input px-2 py-2 rounded-lg text-xs"
            >
              {Object.entries(PRIORITIES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>

            <select
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="custom-input px-2 py-2 rounded-lg text-xs"
            >
              {CATEGORIES.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>

            <select
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              className="custom-input px-2 py-2 rounded-lg text-xs"
            >
              {Object.entries(STATUSES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
              className="custom-input px-2 py-2 rounded-lg text-xs"
            />
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={handleSave} className="btn-primary flex-1 py-2 rounded-lg text-xs tracking-wider">
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-lg text-xs transition-colors"
              style={{ background: 'var(--surface2)', color: 'var(--muted)' }}
            >
              Iptal
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-card animate-in rounded-2xl p-5 ${task.completed ? 'completed' : ''}`} style={{ background: 'var(--surface)' }}>
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} className="custom-checkbox mt-0.5" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`font-semibold text-sm leading-snug ${task.completed ? 'line-through' : ''}`} style={{ color: task.completed ? 'var(--muted)' : 'var(--text)' }}>
              {task.title}
            </h3>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="icon-btn"
                title="Duzenle"
                aria-label="Gorevi duzenle"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className={`icon-btn ${showConfirm ? 'danger' : ''}`}
                title={showConfirm ? 'Emin misin? Tekrar tikla.' : 'Sil'}
                aria-label="Gorevi sil"
              >
                {showConfirm ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
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

          <div className="flex items-center flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${priority.color}`} />
              <span className={`tag-badge ${priority.textColor}`}>{priority.label}</span>
            </div>

            <span className={`tag-badge px-2 py-0.5 rounded-md ${status.bg} ${status.text}`}>{status.label}</span>

            <span className="tag-badge px-2 py-0.5 rounded-md" style={{ background: 'var(--surface2)', color: 'var(--muted)' }}>
              {task.category}
            </span>

            <span className={`tag-badge px-2 py-0.5 rounded-md ${overdue ? 'text-rose-300' : ''}`} style={{ background: 'var(--surface2)' }}>
              Son: {dueDateLabel}
            </span>

            <span className="tag-badge ml-auto" style={{ color: 'var(--muted)' }}>
              {createdLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
