import { useStore } from '../store'
import { DAYS, PERIODS } from '../constants'
import { buildOccupancy, cellKey, type Occupancy } from '../lib/conflicts'
import type { Course, Period } from '../types'

export default function ScheduleGrid() {
  const courses = useStore((s) => s.courses)
  const occ = buildOccupancy(courses)

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="min-w-[640px]">
        <div
          className="grid"
          style={{ gridTemplateColumns: '52px repeat(7, minmax(0, 1fr))' }}
        >
          {/* 表頭列 */}
          <div className="sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-100" />
          {DAYS.map((d) => (
            <div
              key={d.value}
              className="border-b border-slate-200 bg-slate-100 py-2 text-center text-sm font-semibold text-slate-600"
            >
              {d.label}
            </div>
          ))}

          {/* 各節次列 */}
          {PERIODS.map((p) => (
            <Row key={p.id} period={p} occ={occ} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Row({ period, occ }: { period: Period; occ: Occupancy }) {
  return (
    <>
      <div
        className={`sticky left-0 z-10 flex flex-col items-center justify-center border-b border-r border-slate-200 py-1 ${
          period.isBreak ? 'bg-slate-100' : 'bg-slate-50'
        }`}
      >
        <span className="text-sm font-bold text-slate-700">{period.id}</span>
        <span className="text-[10px] leading-none text-slate-400">
          {period.start}
        </span>
      </div>
      {DAYS.map((d) => (
        <Cell
          key={d.value}
          courses={occ.get(cellKey(d.value, period.id)) ?? []}
          isBreak={period.isBreak}
        />
      ))}
    </>
  )
}

function Cell({ courses, isBreak }: { courses: Course[]; isBreak?: boolean }) {
  const hoveredId = useStore((s) => s.hoveredCourseId)
  const setHovered = useStore((s) => s.setHovered)
  const setEditing = useStore((s) => s.setEditing)
  const conflict = courses.length >= 2

  return (
    <div
      className={`min-h-[46px] border-b border-r border-slate-200 p-0.5 ${
        courses.length === 0 && isBreak ? 'bg-slate-50' : 'bg-white'
      }`}
    >
      {courses.length === 0 && isBreak && (
        <div className="flex h-full items-center justify-center text-[10px] text-slate-300">
          午休
        </div>
      )}
      <div className="flex h-full flex-col gap-0.5">
        {courses.map((c) => (
          <button
            key={c.id}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setEditing(c.id)}
            className={`min-h-0 flex-1 overflow-hidden rounded px-1 py-0.5 text-left leading-tight transition ${
              conflict
                ? 'bg-red-100 hover:bg-red-200'
                : 'bg-green-100 hover:bg-green-200'
            } ${hoveredId === c.id ? 'ring-2 ring-slate-500' : ''}`}
            style={{ borderLeft: `3px solid ${c.color}` }}
            title={`${c.name}${c.location ? '・' + c.location : ''}`}
          >
            <span className="block truncate text-[11px] font-medium text-slate-800">
              {c.name}
            </span>
            {c.location && (
              <span className="block truncate text-[10px] text-slate-500">
                {c.location}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
