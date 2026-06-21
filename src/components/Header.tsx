import { useStore } from '../store'
import { buildOccupancy, countConflictCells } from '../lib/conflicts'

export default function Header() {
  const courses = useStore((s) => s.courses)
  const occ = buildOccupancy(courses)
  const conflicts = countConflictCells(occ)
  const placedCount = courses.filter((c) => c.placed).length

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📅</span>
        <h1 className="text-lg font-bold text-slate-800">課表安排</h1>
      </div>
      <div>
        {conflicts > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
            ⚠ {conflicts} 處衝突
          </span>
        ) : placedCount > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            ✓ 無衝突
          </span>
        ) : (
          <span className="text-sm text-slate-400">尚未排課</span>
        )}
      </div>
    </header>
  )
}
