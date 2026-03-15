import React from 'react'
import { PRIORITIES, STATUSES, CATEGORIES } from '../interfaces/Task'

export default function FilterBar({ filter, setFilter, sortBy, setSortBy, taskCount }) {
  const filters = [
    { key: 'all', label: 'Tümü' },
    { key: 'active', label: 'Aktif' },
    { key: 'completed', label: 'Tamamlanan' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Filter tabs */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--surface)' }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all"
              style={filter === f.key ? {
                background: 'linear-gradient(135deg, #7c5cfc, #9b7bfe)',
                color: 'white',
              } : {
                color: 'var(--muted)',
              }}
              onMouseEnter={e => { if (filter !== f.key) e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { if (filter !== f.key) e.currentTarget.style.color = 'var(--muted)' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-wider" style={{ color: 'var(--muted)' }}>
            {taskCount} görev
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="custom-input px-3 py-2 rounded-lg text-xs"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="priority">Öncelik</option>
            <option value="az">A → Z</option>
          </select>
        </div>
      </div>
    </div>
  )
}
