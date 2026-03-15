import React from 'react'

export default function Header({ taskCount, completedCount }) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <header className="relative z-10 px-6 py-8 md:px-12 md:py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Logo & Title */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                 style={{ background: 'linear-gradient(135deg, #7c5cfc, #fc5c7d)' }}>
              <span className="text-white text-sm font-bold">TF</span>
            </div>
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              v1.0.0
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ letterSpacing: '-0.03em' }}>
            Task
            <span style={{ 
              background: 'linear-gradient(135deg, #7c5cfc, #fc5c7d)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Flow</span>
          </h1>
          <p className="mt-1 text-sm font-mono" style={{ color: 'var(--muted)' }}>
            {dateStr}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div className="text-right">
            <div className="stat-number">{taskCount}</div>
            <div className="text-xs tracking-widest uppercase font-mono" style={{ color: 'var(--muted)' }}>Toplam</div>
          </div>
          <div className="w-px" style={{ background: 'var(--border)' }}></div>
          <div className="text-right">
            <div className="stat-number">{completedCount}</div>
            <div className="text-xs tracking-widest uppercase font-mono" style={{ color: 'var(--muted)' }}>Bitti</div>
          </div>
          <div className="w-px" style={{ background: 'var(--border)' }}></div>
          <div className="text-right">
            <div className="stat-number" style={{
              background: 'linear-gradient(135deg, #4ade80, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0}%
            </div>
            <div className="text-xs tracking-widest uppercase font-mono" style={{ color: 'var(--muted)' }}>Başarı</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {taskCount > 0 && (
        <div className="max-w-5xl mx-auto mt-6">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div 
              className="h-full rounded-full transition-all duration-700"
              style={{ 
                width: `${(completedCount / taskCount) * 100}%`,
                background: 'linear-gradient(90deg, #7c5cfc, #fc5c7d)'
              }}
            />
          </div>
        </div>
      )}
    </header>
  )
}
