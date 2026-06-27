import type { Course } from './types'
import { COURSE_COLORS } from './constants'

// 預設課程資料：取自成大資管所 115-1 開課（真實課程，僅供示範起始畫面）。
// 時間代號對照 constants.ts 的 PERIODS；day: 1=週一 … 5=週五。
// 注意：這份清單涵蓋整學期所有開課，時段會有重疊，課表上會以紅色標示衝堂。
// 要改成自己的課就直接改這裡。
type SeedCourse = Omit<Course, 'id' | 'color' | 'placed'>

const SEED: SeedCourse[] = [
  // 週一
  {
    name: '策略競局',
    teacher: '謝中奇',
    location: '工管系館 61206',
    meetings: [{ day: 1, periods: ['1', '2', '3'] }],
  },
  {
    name: '經驗模式方法',
    teacher: '張裕清',
    location: '工管系館 61208',
    meetings: [{ day: 1, periods: ['2', '3', '4'] }],
  },
  {
    name: '多變量分析與應用',
    teacher: '胡政宏',
    location: '工管系館 61201/61202',
    meetings: [{ day: 1, periods: ['5', '6', '7'] }],
  },
  {
    name: '資料探勘',
    teacher: '翁慈宗',
    location: '工管系館 61204',
    meetings: [
      { day: 1, periods: ['5', '6'] },
      { day: 3, periods: ['7'] },
    ],
  },
  {
    name: '供應鏈管理',
    teacher: '吳政翰',
    location: '工管系館 61206',
    meetings: [
      { day: 1, periods: ['6', '7'] },
      { day: 5, periods: ['1'] },
    ],
  },
  // 週二
  {
    name: '網路安全',
    teacher: '劉任修',
    location: '工管系館 61208',
    meetings: [{ day: 2, periods: ['2', '3', '4'] }],
  },
  {
    name: '排程理論',
    teacher: '李旻陽',
    location: '工管系館 61204',
    meetings: [{ day: 2, periods: ['2', '3', '4'] }],
  },
  {
    name: '人工智慧',
    teacher: '李昇暾',
    location: '工管系館 61206',
    meetings: [
      { day: 2, periods: ['3', '4'] },
      { day: 3, periods: ['3'] },
    ],
  },
  {
    name: '數學規劃',
    teacher: '林仁彥',
    location: '工管系館 61206',
    meetings: [{ day: 2, periods: ['6', '7', '8'] }],
  },
  {
    name: '電子商務',
    teacher: '王維聰',
    location: '工管系館 61208',
    meetings: [{ day: 2, periods: ['7', '8', '9'] }],
  },
  // 週三
  {
    name: '管理決策分析',
    teacher: '黃宇翔',
    location: '工管系館 61208',
    meetings: [{ day: 3, periods: ['2', '3', '4'] }],
  },
  {
    name: '動態規劃',
    teacher: '莊雅棠',
    location: '工管系館 61204',
    meetings: [{ day: 3, periods: ['2', '3', '4'] }],
  },
  {
    name: '系統模擬',
    teacher: '蔡青志',
    location: '工管系館 61201',
    meetings: [
      { day: 3, periods: ['6', '7'] },
      { day: 5, periods: ['7'] },
    ],
  },
  // 週四
  {
    name: '使用者行為研究',
    teacher: '',
    location: '工管系館 61206',
    meetings: [{ day: 4, periods: ['2', '3', '4'] }],
  },
  {
    name: '專題討論（一）',
    teacher: '',
    location: '工管系館 61200',
    meetings: [{ day: 4, periods: ['5'] }],
  },
  {
    name: '專題討論（一）',
    teacher: '蔡青志',
    location: '工管系館 61206',
    meetings: [{ day: 4, periods: ['5'] }],
  },
  {
    name: '專題討論（三）',
    teacher: '王逸琳',
    location: '工管系館 61206',
    meetings: [{ day: 4, periods: ['6'] }],
  },
  {
    name: '專題討論（三）',
    teacher: '侯建任、李昇暾',
    location: '工管系館 61200',
    meetings: [{ day: 4, periods: ['7', '8'] }],
  },
  // 週五
  {
    name: '等候理論與應用',
    teacher: '王俊涵',
    location: '工管系館 61204',
    meetings: [{ day: 5, periods: ['2', '3', '4'] }],
  },
  {
    name: '半導體製造專題',
    teacher: '王逸琳、李旻陽',
    location: '工管系館 61102',
    meetings: [{ day: 5, periods: ['5', '6'] }],
  },
]

// 補上 id / color / placed，組成完整的 Course。
export const SEED_COURSES: Course[] = SEED.map((c, i) => ({
  ...c,
  id: `seed-${i + 1}`,
  color: COURSE_COLORS[i % COURSE_COLORS.length],
  placed: true,
}))
