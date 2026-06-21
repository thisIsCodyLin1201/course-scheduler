// 節次代號：注意不是純數字，N = 午休，A/B/C = 晚間，
// 順序固定（見 constants.ts 的 PERIODS），所有邏輯都用代號字串、不要用索引硬算。
export type PeriodId =
  | '0' | '1' | '2' | '3' | '4' | 'N'
  | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C'

export interface Period {
  id: PeriodId
  start: string
  end: string
  isBreak?: boolean
}

// 一個上課時段 = 某一天 + 該天佔用的節次（通常連續，如 ['3','4'] 連堂）。
// 一門課若一週上多次（不同天），就掛多個 Meeting。
export interface Meeting {
  day: number // 1 = 週一 ... 7 = 週日
  periods: PeriodId[]
}

export interface Course {
  id: string
  name: string
  teacher: string
  location: string
  color: string
  meetings: Meeting[]
  placed: boolean // 是否已放到課表上（右側清單可切換）
}
