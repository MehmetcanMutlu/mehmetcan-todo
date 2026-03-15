import React, { useState, useMemo } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskListPage from './pages/TaskListPage'
import { useLocalStorage } from './interfaces/useLocalStorage'

const SAMPLE_TASKS = [
  {
    id: '1',
    title: 'React projesi kur ve yapılandır',
    description: 'Vite + React + Tailwind kurulumunu tamamla',
    priority: 'high',
    status: 'done',
    category: 'Proje',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'CRUD işlemlerini implement et',
    description: 'Ekle, listele, güncelle ve sil fonksiyonlarını yaz',
    priority: 'high',
    status: 'in-progress',
    category: 'Proje',
    completed: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Netlify\'e deploy et',
    description: 'GitHub\'a push et ve Netlify ile yayına al',
    priority: 'medium',
    status: 'todo',
    category: 'Proje',
    completed: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
]

export default function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow-tasks', SAMPLE_TASKS)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // ADD
  const handleAdd = (formData) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...formData,
      status: 'todo',
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
  }

  // DELETE
  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // UPDATE
  const handleUpdate = (id, data) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t,
      ...data,
      completed: data.status === 'done' ? true : t.completed,
    } : t))
  }

  // TOGGLE complete
  const handleToggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t,
      completed: !t.completed,
      status: !t.completed ? 'done' : 'in-progress',
    } : t))
  }

  // Filter
  const filtered = useMemo(() => {
    let result = [...tasks]
    if (filter === 'active') result = result.filter(t => !t.completed)
    if (filter === 'completed') result = result.filter(t => t.completed)

    const pMap = { high: 0, medium: 1, low: 2 }
    switch (sortBy) {
      case 'oldest': result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break
      case 'priority': result.sort((a, b) => pMap[a.priority] - pMap[b.priority]); break
      case 'az': result.sort((a, b) => a.title.localeCompare(b.title, 'tr')); break
      default: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    return result
  }, [tasks, filter, sortBy])

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)' }}>
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)' }} />
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(252,92,125,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10">
        <Header taskCount={tasks.length} completedCount={completedCount} />
        <TaskForm onAdd={handleAdd} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          taskCount={filtered.length}
        />
        <TaskListPage
          tasks={filtered}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onToggle={handleToggle}
        />
      </div>
    </div>
  )
}
