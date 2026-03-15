/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'high'|'medium'|'low'} priority
 * @property {'todo'|'in-progress'|'done'} status
 * @property {string} category
 * @property {string} createdAt
 * @property {boolean} completed
 */

/**
 * @typedef {'high'|'medium'|'low'} Priority
 */

/**
 * @typedef {'todo'|'in-progress'|'done'} Status
 */

export const PRIORITIES = {
  high: { label: 'Yüksek', color: 'priority-high', textColor: 'text-pink-400' },
  medium: { label: 'Orta', color: 'priority-medium', textColor: 'text-yellow-400' },
  low: { label: 'Düşük', color: 'priority-low', textColor: 'text-green-400' },
}

export const STATUSES = {
  todo: { label: 'Yapılacak', bg: 'bg-slate-700', text: 'text-slate-300' },
  'in-progress': { label: 'Devam Ediyor', bg: 'bg-violet-900', text: 'text-violet-300' },
  done: { label: 'Tamamlandı', bg: 'bg-emerald-900', text: 'text-emerald-300' },
}

export const CATEGORIES = ['Genel', 'İş', 'Kişisel', 'Alışveriş', 'Sağlık', 'Eğitim', 'Proje']
