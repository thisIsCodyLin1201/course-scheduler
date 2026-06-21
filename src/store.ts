import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Course, Meeting } from './types'
import { COURSE_COLORS } from './constants'

export interface CourseInput {
  name: string
  teacher: string
  location: string
  color: string
  meetings: Meeting[]
}

interface ScheduleState {
  courses: Course[]
  // --- UI 狀態（不持久化）---
  hoveredCourseId: string | null
  editingCourseId: string | null
  // --- actions ---
  addCourse: (input: CourseInput) => void
  updateCourse: (id: string, input: CourseInput) => void
  removeCourse: (id: string) => void
  togglePlaced: (id: string) => void
  clearAll: () => void
  setHovered: (id: string | null) => void
  setEditing: (id: string | null) => void
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

export const useStore = create<ScheduleState>()(
  persist(
    (set) => ({
      courses: [],
      hoveredCourseId: null,
      editingCourseId: null,

      addCourse: (input) =>
        set((state) => ({
          courses: [
            ...state.courses,
            {
              id: makeId(),
              ...input,
              placed: true,
              color:
                input.color ||
                COURSE_COLORS[state.courses.length % COURSE_COLORS.length],
            },
          ],
        })),

      updateCourse: (id, input) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, ...input } : c,
          ),
          editingCourseId: null,
        })),

      removeCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
          editingCourseId:
            state.editingCourseId === id ? null : state.editingCourseId,
        })),

      togglePlaced: (id) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, placed: !c.placed } : c,
          ),
        })),

      clearAll: () =>
        set({ courses: [], editingCourseId: null, hoveredCourseId: null }),

      setHovered: (id) => set({ hoveredCourseId: id }),
      setEditing: (id) => set({ editingCourseId: id }),
    }),
    {
      name: 'course-scheduler',
      // 只持久化資料，UI 狀態（hover/editing）不存。
      partialize: (state) => ({ courses: state.courses }),
    },
  ),
)
