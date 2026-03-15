/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'high'|'medium'|'low'} priority
 * @property {'todo'|'in-progress'|'done'} status
 * @property {string} category
 * @property {string | null} dueDate
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {boolean} completed
 */

/**
 * @typedef {'high'|'medium'|'low'} Priority
 */

/**
 * @typedef {'todo'|'in-progress'|'done'} Status
 */

export const PRIORITIES = {
  high: { label: 'Yuksek', color: 'priority-high', textColor: 'text-rose-300' },
  medium: { label: 'Orta', color: 'priority-medium', textColor: 'text-amber-300' },
  low: { label: 'Dusuk', color: 'priority-low', textColor: 'text-emerald-300' },
}

export const STATUSES = {
  todo: { label: 'Yapilacak', bg: 'bg-slate-700/70', text: 'text-slate-200' },
  'in-progress': { label: 'Devam Ediyor', bg: 'bg-indigo-900/60', text: 'text-indigo-200' },
  done: { label: 'Tamamlandi', bg: 'bg-emerald-900/60', text: 'text-emerald-200' },
}

export const CATEGORIES = [
  'Genel',
  'Is',
  'Kisisel',
  'Alisveris',
  'Saglik',
  'Egitim',
  'Proje',
]

export const DEFAULT_TASK_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  category: 'Genel',
  dueDate: '',
}

export function getStatusFromCompleted(completed) {
  return completed ? 'done' : 'in-progress'
}

export function createTask(formData) {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title: formData.title.trim(),
    description: (formData.description || '').trim(),
    priority: formData.priority || 'medium',
    category: formData.category || 'Genel',
    dueDate: formData.dueDate || null,
    status: 'todo',
    completed: false,
    createdAt: now,
    updatedAt: now,
  }
}

export function normalizeTask(task) {
  const completed = Boolean(task.completed || task.status === 'done')
  const createdAt = task.createdAt || new Date().toISOString()

  return {
    id: String(task.id || crypto.randomUUID()),
    title: String(task.title || 'Adsiz gorev'),
    description: String(task.description || ''),
    priority: PRIORITIES[task.priority] ? task.priority : 'medium',
    status: STATUSES[task.status] ? task.status : getStatusFromCompleted(completed),
    category: CATEGORIES.includes(task.category) ? task.category : 'Genel',
    dueDate: task.dueDate || null,
    createdAt,
    updatedAt: task.updatedAt || createdAt,
    completed,
  }
}

export function getPriorityScore(priority) {
  return { high: 0, medium: 1, low: 2 }[priority] ?? 3
}

export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false
  const dueEndOfDay = new Date(`${task.dueDate}T23:59:59`)
  return Date.now() > dueEndOfDay.getTime()
}

export function formatRelativeTime(dateLike) {
  const diff = Date.now() - new Date(dateLike).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'az once'
  if (mins < 60) return `${mins} dk once`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} sa once`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} gun once`
  return new Date(dateLike).toLocaleDateString('tr-TR')
}
