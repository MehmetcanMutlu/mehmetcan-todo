import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskListPage from './pages/TaskListPage'
import { useLocalStorage } from './interfaces/useLocalStorage'
import {
  createTask,
  getPriorityScore,
  isOverdue,
  normalizeTask,
} from './interfaces/Task'

const SAMPLE_TASKS = [
  {
    id: '1',
    title: 'Sprint board gorevlerini planla',
    description: 'Bu haftanin backlog gorevlerini onceliklerine gore sirala.',
    priority: 'high',
    status: 'in-progress',
    category: 'Is',
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: '2',
    title: 'Spor rutini hazirla',
    description: 'Haftalik 3 gunluk antreman programini olustur.',
    priority: 'medium',
    status: 'todo',
    category: 'Saglik',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: '3',
    title: 'Portfolyo sayfasini guncelle',
    description: 'Yeni projeleri ve ekran goruntulerini ekle.',
    priority: 'low',
    status: 'done',
    category: 'Kisisel',
    dueDate: null,
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
].map(normalizeTask)

function isDueToday(dateString) {
  if (!dateString) return false
  const today = new Date().toISOString().slice(0, 10)
  return dateString === today
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow-tasks', SAMPLE_TASKS, {
    mapFromStorage: (value) => {
      if (!Array.isArray(value)) return SAMPLE_TASKS
      return value.map(normalizeTask)
    },
  })

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [priority, setPriority] = useState('all')

  const handleAdd = (formData) => {
    const newTask = createTask(formData)
    setTasks((prev) => [newTask, ...prev])
  }

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleUpdate = (id, data) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task

        let nextCompleted = task.completed
        if (typeof data.completed === 'boolean') {
          nextCompleted = data.completed
        }

        let nextStatus = data.status || task.status
        if (data.status) {
          nextCompleted = data.status === 'done'
        } else if (typeof data.completed === 'boolean') {
          nextStatus = data.completed ? 'done' : 'in-progress'
        }

        return normalizeTask({
          ...task,
          ...data,
          title: data.title ? data.title.trim() : task.title,
          description:
            typeof data.description === 'string' ? data.description.trim() : task.description,
          status: nextStatus,
          completed: nextCompleted,
          dueDate: data.dueDate === '' ? null : data.dueDate ?? task.dueDate,
          updatedAt: new Date().toISOString(),
        })
      }),
    )
  }

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task

        const completed = !task.completed
        return normalizeTask({
          ...task,
          completed,
          status: completed ? 'done' : 'in-progress',
          updatedAt: new Date().toISOString(),
        })
      }),
    )
  }

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  const handleLoadSampleData = () => {
    setTasks(SAMPLE_TASKS)
  }

  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (filter === 'active') {
      result = result.filter((task) => !task.completed)
    }

    if (filter === 'completed') {
      result = result.filter((task) => task.completed)
    }

    if (category !== 'all') {
      result = result.filter((task) => task.category === category)
    }

    if (priority !== 'all') {
      result = result.filter((task) => task.priority === priority)
    }

    if (query.trim()) {
      const normalized = query.trim().toLocaleLowerCase('tr')
      result = result.filter((task) => {
        const searchable = `${task.title} ${task.description} ${task.category}`.toLocaleLowerCase('tr')
        return searchable.includes(normalized)
      })
    }

    switch (sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'priority':
        result.sort((a, b) => getPriorityScore(a.priority) - getPriorityScore(b.priority))
        break
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title, 'tr'))
        break
      case 'due-soon':
        result.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        })
        break
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    return result
  }, [tasks, filter, category, priority, query, sortBy])

  const metrics = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const active = total - completed
    const overdue = tasks.filter((task) => isOverdue(task)).length
    const dueToday = tasks.filter((task) => isDueToday(task.dueDate)).length
    return {
      total,
      completed,
      active,
      overdue,
      dueToday,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  }, [tasks])

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)' }}>
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div
        className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(252,92,125,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
        <Header metrics={metrics} />
        <TaskForm onAdd={handleAdd} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          priority={priority}
          setPriority={setPriority}
          taskCount={filteredTasks.length}
          onClearCompleted={handleClearCompleted}
          onLoadSampleData={handleLoadSampleData}
          hasCompleted={metrics.completed > 0}
          hasTasks={metrics.total > 0}
        />
        <TaskListPage
          tasks={filteredTasks}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onToggle={handleToggle}
          hasFilters={Boolean(query.trim() || category !== 'all' || priority !== 'all' || filter !== 'all')}
        />
      </div>
    </div>
  )
}
