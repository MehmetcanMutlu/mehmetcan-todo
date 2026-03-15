import React from 'react'
import TaskCard from '../components/TaskCard'

export default function TaskListPage({ tasks, onDelete, onUpdate, onToggle, hasFilters }) {
  if (tasks.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 text-center">
        <div className="text-6xl mb-4">✦</div>
        <p className="text-lg font-semibold mb-2">Gorev bulunamadi</p>
        <p className="text-sm font-mono" style={{ color: 'var(--muted)' }}>
          {hasFilters
            ? 'Filtreleri sifirlayarak daha fazla gorev gorebilirsin.'
            : 'Yeni bir gorev ekleyerek planlamaya basla.'}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} onToggle={onToggle} />
        ))}
      </div>
    </div>
  )
}
