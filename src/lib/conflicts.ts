import type { Course } from '../types'

export type Occupancy = Map<string, Course[]>

export function cellKey(day: number, period: string): string {
  return `${day}-${period}`
}

// 建立 "day-period" -> 佔用該格的課程清單；只計算已放上課表的課程。
// 衝突判斷在節次制下就是「同一天同一節有幾門課」——任何一格 > 1 即衝突。
export function buildOccupancy(courses: Course[]): Occupancy {
  const map: Occupancy = new Map()
  for (const course of courses) {
    if (!course.placed) continue
    for (const meeting of course.meetings) {
      for (const period of meeting.periods) {
        const key = cellKey(meeting.day, period)
        const arr = map.get(key)
        if (arr) arr.push(course)
        else map.set(key, [course])
      }
    }
  }
  return map
}

// 有衝突（同格 >1 門課）的格子數量。
export function countConflictCells(occ: Occupancy): number {
  let n = 0
  for (const arr of occ.values()) if (arr.length > 1) n++
  return n
}
