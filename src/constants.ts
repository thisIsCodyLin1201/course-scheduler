import type { Period, PeriodId } from './types'

// 節次對照表 —— 由上到下的列順序就是這個陣列的順序。
export const PERIODS: Period[] = [
  { id: '0', start: '07:00', end: '08:00' },
  { id: '1', start: '08:00', end: '09:00' },
  { id: '2', start: '09:00', end: '10:00' },
  { id: '3', start: '10:00', end: '11:00' },
  { id: '4', start: '11:00', end: '12:00' },
  { id: 'N', start: '12:00', end: '13:00', isBreak: true }, // 午休
  { id: '5', start: '13:00', end: '14:00' },
  { id: '6', start: '14:00', end: '15:00' },
  { id: '7', start: '15:00', end: '16:00' },
  { id: '8', start: '16:00', end: '17:00' },
  { id: '9', start: '17:00', end: '18:00' },
  { id: 'A', start: '18:00', end: '19:00' },
  { id: 'B', start: '19:00', end: '20:00' },
  { id: 'C', start: '20:00', end: '21:00' },
]

export const PERIOD_ORDER: PeriodId[] = PERIODS.map((p) => p.id)

export const DAYS: { value: number; label: string }[] = [
  { value: 1, label: '週一' },
  { value: 2, label: '週二' },
  { value: 3, label: '週三' },
  { value: 4, label: '週四' },
  { value: 5, label: '週五' },
  { value: 6, label: '週六' },
  { value: 7, label: '週日' },
]

// 課程顏色（左側色條用）。
export const COURSE_COLORS: string[] = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#10b981', '#06b6d4', '#3b82f6', '#6366f1',
  '#8b5cf6', '#ec4899', '#f43f5e', '#64748b',
]

// 依固定節次順序排序一組節次代號。
export function sortPeriods(periods: PeriodId[]): PeriodId[] {
  return [...periods].sort(
    (a, b) => PERIOD_ORDER.indexOf(a) - PERIOD_ORDER.indexOf(b),
  )
}
