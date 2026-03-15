import React from 'react'

export default function Header({ metrics }) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="relative z-10 px-6 py-8 md:px-12 md:py-10">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c5cfc, #fc5c7d)' }}
            >
              <span className="text-white text-sm font-bold">TF</span>
            </div>
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              Planlayici
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.03em' }}>
            Task
            <span
              style={{
                background: 'linear-gradient(135deg, #7c5cfc, #fc5c7d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Flow
            </span>
          </h1>
          <p className="mt-1 text-sm font-mono" style={{ color: 'var(--muted)' }}>
            {dateStr}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto">
          <div className="metric-card">
            <div className="metric-label">Toplam</div>
            <div className="metric-value">{metrics.total}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Aktif</div>
            <div className="metric-value">{metrics.active}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Bugun</div>
            <div className="metric-value">{metrics.dueToday}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Geciken</div>
            <div className="metric-value text-rose-300">{metrics.overdue}</div>
          </div>
        </div>
      </div>

      {metrics.total > 0 && (
        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono tracking-wider" style={{ color: 'var(--muted)' }}>
              Tamamlanma Durumu
            </span>
            <span className="text-xs font-mono tracking-wider" style={{ color: 'var(--muted)' }}>
              %{metrics.progress}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${metrics.progress}%`,
                background: 'linear-gradient(90deg, #7c5cfc, #fc5c7d)',
              }}
            />
          </div>
        </div>
      )}
    </header>
  )
}
