import { useMemo } from 'react'
import { useStore } from '../store'
import { DAYS } from '../constants'

export default function SummaryBar() {
  const courses = useStore((s) => s.courses)

  const stats = useMemo(() => {
    const placed = courses.filter((c) => c.placed)
    const perDay = new Map<number, number>()
    let totalCells = 0
    let earlyBird = false
    for (const c of placed) {
      for (const m of c.meetings) {
        perDay.set(m.day, (perDay.get(m.day) ?? 0) + m.periods.length)
        totalCells += m.periods.length
        if (m.periods.includes('0') || m.periods.includes('1')) earlyBird = true
      }
    }
    let busiestDay = 0
    let busiestCount = 0
    for (const [day, count] of perDay) {
      if (count > busiestCount) {
        busiestCount = count
        busiestDay = day
      }
    }
    return {
      placedCount: placed.length,
      totalCells,
      earlyBird,
      busiestDay,
      busiestCount,
    }
  }, [courses])

  const busiestLabel = stats.busiestDay
    ? DAYS.find((d) => d.value === stats.busiestDay)?.label
    : '—'

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-slate-200 bg-slate-50 px-5 py-2 text-sm text-slate-600">
      <span>
        已排 <b className="text-slate-800">{stats.placedCount}</b> 門課
      </span>
      <span>
        共 <b className="text-slate-800">{stats.totalCells}</b> 節
      </span>
      <span>
        早八：
        <b className={stats.earlyBird ? 'text-amber-600' : 'text-slate-800'}>
          {stats.earlyBird ? '有 😴' : '無 🎉'}
        </b>
      </span>
      <span>
        最忙：
        <b className="text-slate-800">
          {busiestLabel}
          {stats.busiestCount ? `（${stats.busiestCount} 節）` : ''}
        </b>
      </span>
    </div>
  )
}
