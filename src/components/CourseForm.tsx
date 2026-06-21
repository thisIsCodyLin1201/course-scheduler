import { useEffect, useState, type FormEvent } from 'react'
import { useStore } from '../store'
import { COURSE_COLORS, DAYS, PERIODS, sortPeriods } from '../constants'
import type { Meeting, PeriodId } from '../types'

interface Draft {
  name: string
  teacher: string
  location: string
  color: string
  meetings: { day: number; periods: PeriodId[] }[]
}

const emptyDraft = (): Draft => ({
  name: '',
  teacher: '',
  location: '',
  color: COURSE_COLORS[0],
  meetings: [{ day: 1, periods: [] }],
})

export default function CourseForm() {
  const addCourse = useStore((s) => s.addCourse)
  const updateCourse = useStore((s) => s.updateCourse)
  const editingId = useStore((s) => s.editingCourseId)
  const setEditing = useStore((s) => s.setEditing)
  const editingCourse = useStore(
    (s) => s.courses.find((c) => c.id === s.editingCourseId) ?? null,
  )

  const [draft, setDraft] = useState<Draft>(emptyDraft())
  const [error, setError] = useState('')

  // 進入編輯模式時，把該課程內容載入表單。
  useEffect(() => {
    if (editingCourse) {
      setDraft({
        name: editingCourse.name,
        teacher: editingCourse.teacher,
        location: editingCourse.location,
        color: editingCourse.color,
        meetings: editingCourse.meetings.map((m) => ({
          day: m.day,
          periods: [...m.periods],
        })),
      })
      setError('')
    }
  }, [editingCourse])

  const isEditing = !!editingId

  function reset() {
    setDraft(emptyDraft())
    setError('')
  }

  function cancelEdit() {
    setEditing(null)
    reset()
  }

  function setMeetingDay(idx: number, day: number) {
    setDraft((d) => ({
      ...d,
      meetings: d.meetings.map((m, i) => (i === idx ? { ...m, day } : m)),
    }))
  }

  function togglePeriod(idx: number, period: PeriodId) {
    setDraft((d) => ({
      ...d,
      meetings: d.meetings.map((m, i) => {
        if (i !== idx) return m
        const has = m.periods.includes(period)
        return {
          ...m,
          periods: has
            ? m.periods.filter((p) => p !== period)
            : [...m.periods, period],
        }
      }),
    }))
  }

  function addMeeting() {
    setDraft((d) => ({
      ...d,
      meetings: [...d.meetings, { day: 1, periods: [] }],
    }))
  }

  function removeMeeting(idx: number) {
    setDraft((d) => ({
      ...d,
      meetings: d.meetings.filter((_, i) => i !== idx),
    }))
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    const name = draft.name.trim()
    if (!name) {
      setError('請輸入課程名稱')
      return
    }
    const meetings: Meeting[] = draft.meetings
      .filter((m) => m.periods.length > 0)
      .map((m) => ({ day: m.day, periods: sortPeriods(m.periods) }))
    if (meetings.length === 0) {
      setError('請至少選擇一個上課時段')
      return
    }

    const input = {
      name,
      teacher: draft.teacher.trim(),
      location: draft.location.trim(),
      color: draft.color,
      meetings,
    }
    if (isEditing && editingId) updateCourse(editingId, input)
    else addCourse(input)
    reset()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">
          {isEditing ? '編輯課程' : '新增課程'}
        </h2>
        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            取消編輯
          </button>
        )}
      </div>

      <input
        value={draft.name}
        onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
        placeholder="課程名稱（必填）"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
      />

      <div className="flex gap-2">
        <input
          value={draft.teacher}
          onChange={(e) => setDraft((d) => ({ ...d, teacher: e.target.value }))}
          placeholder="老師"
          className="w-1/2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
        />
        <input
          value={draft.location}
          onChange={(e) =>
            setDraft((d) => ({ ...d, location: e.target.value }))
          }
          placeholder="教室"
          className="w-1/2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
        />
      </div>

      {/* 顏色 */}
      <div className="flex flex-wrap gap-1.5">
        {COURSE_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setDraft((d) => ({ ...d, color: c }))}
            className={`h-6 w-6 rounded-full transition ${
              draft.color === c ? 'ring-2 ring-slate-400 ring-offset-2' : ''
            }`}
            style={{ backgroundColor: c }}
            aria-label={`顏色 ${c}`}
          />
        ))}
      </div>

      {/* 上課時段 */}
      <div className="space-y-2">
        {draft.meetings.map((m, idx) => (
          <div key={idx} className="rounded-lg border border-slate-200 p-2.5">
            <div className="mb-2 flex items-center justify-between">
              <select
                value={m.day}
                onChange={(e) => setMeetingDay(idx, Number(e.target.value))}
                className="rounded-md border border-slate-300 px-2 py-1 text-sm"
              >
                {DAYS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              {draft.meetings.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMeeting(idx)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  移除
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {PERIODS.map((p) => {
                const active = m.periods.includes(p.id)
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePeriod(idx, p.id)}
                    title={`${p.start}-${p.end}`}
                    className={`h-7 w-7 rounded text-xs font-medium transition ${
                      active
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p.id}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addMeeting}
          className="text-xs font-medium text-blue-500 hover:text-blue-700"
        >
          + 新增時段
        </button>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        {isEditing ? '儲存變更' : '新增課程'}
      </button>
    </form>
  )
}
