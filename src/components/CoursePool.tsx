import { useStore } from '../store'
import { DAYS, sortPeriods } from '../constants'
import type { Course } from '../types'

function formatMeetings(course: Course): string {
  return course.meetings
    .map((m) => {
      const day = DAYS.find((d) => d.value === m.day)?.label ?? ''
      return `${day} ${sortPeriods(m.periods).join('')}`
    })
    .join('・')
}

export default function CoursePool() {
  const courses = useStore((s) => s.courses)
  const togglePlaced = useStore((s) => s.togglePlaced)
  const removeCourse = useStore((s) => s.removeCourse)
  const setEditing = useStore((s) => s.setEditing)
  const setHovered = useStore((s) => s.setHovered)
  const hoveredId = useStore((s) => s.hoveredCourseId)

  if (courses.length === 0) {
    return (
      <p className="px-1 py-6 text-center text-sm text-slate-400">
        尚無課程
        <br />
        在上方新增一門課開始排課 👆
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {courses.map((c) => (
        <li
          key={c.id}
          onMouseEnter={() => setHovered(c.id)}
          onMouseLeave={() => setHovered(null)}
          className={`rounded-lg border p-2.5 transition ${
            hoveredId === c.id
              ? 'border-slate-400 bg-slate-50'
              : 'border-slate-200'
          } ${c.placed ? '' : 'opacity-60'}`}
        >
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={c.placed}
              onChange={() => togglePlaced(c.id)}
              className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
              title={c.placed ? '從課表移除' : '加到課表'}
            />
            <span
              className="mt-1 h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-slate-800">
                {c.name}
              </div>
              <div className="truncate text-xs text-slate-500">
                {formatMeetings(c)}
                {c.teacher ? `・${c.teacher}` : ''}
                {c.location ? `・${c.location}` : ''}
              </div>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                onClick={() => setEditing(c.id)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                title="編輯"
              >
                ✏️
              </button>
              <button
                onClick={() => removeCourse(c.id)}
                className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                title="刪除"
              >
                🗑️
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
