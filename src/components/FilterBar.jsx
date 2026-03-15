import React from 'react'
import { CATEGORIES, PRIORITIES } from '../interfaces/Task'

export default function FilterBar({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  query,
  setQuery,
  category,
  setCategory,
  priority,
  setPriority,
  taskCount,
  onClearCompleted,
  onLoadSampleData,
  hasCompleted,
  hasTasks,
}) {
  const filters = [
    { key: 'all', label: 'Tumu' },
    { key: 'active', label: 'Aktif' },
    { key: 'completed', label: 'Tamamlanan' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 mb-6">
      <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between mb-4">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--surface2)' }}>
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all"
                style={
                  filter === item.key
                    ? {
                        background: 'linear-gradient(135deg, #7c5cfc, #9b7bfe)',
                        color: 'white',
                      }
                    : {
                        color: 'var(--muted)',
                      }
                }
                onMouseEnter={(event) => {
                  if (filter !== item.key) event.currentTarget.style.color = 'var(--text)'
                }}
                onMouseLeave={(event) => {
                  if (filter !== item.key) event.currentTarget.style.color = 'var(--muted)'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onClearCompleted}
              disabled={!hasCompleted}
              className="secondary-btn px-3 py-2 rounded-lg text-xs"
            >
              Tamamlananlari Temizle
            </button>
            <button
              type="button"
              onClick={onLoadSampleData}
              disabled={hasTasks}
              className="secondary-btn px-3 py-2 rounded-lg text-xs"
            >
              Ornek Veriyi Yukle
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Baslik, aciklama veya kategori ara..."
            className="custom-input px-3 py-2 rounded-lg text-sm"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="custom-input px-3 py-2 rounded-lg text-sm"
          >
            <option value="all">Tum kategoriler</option>
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="custom-input px-3 py-2 rounded-lg text-sm"
          >
            <option value="all">Tum oncelikler</option>
            {Object.entries(PRIORITIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="custom-input px-3 py-2 rounded-lg text-sm">
            <option value="newest">Sirala: En Yeni</option>
            <option value="oldest">Sirala: En Eski</option>
            <option value="priority">Sirala: Oncelik</option>
            <option value="due-soon">Sirala: Son Tarih Yaklasan</option>
            <option value="az">Sirala: A-Z</option>
          </select>
        </div>

        <div className="mt-3 text-xs font-mono tracking-wide" style={{ color: 'var(--muted)' }}>
          Gosterilen gorev: {taskCount}
        </div>
      </div>
    </div>
  )
}
