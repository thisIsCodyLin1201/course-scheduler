import Header from './components/Header'
import ScheduleGrid from './components/ScheduleGrid'
import CourseForm from './components/CourseForm'
import CoursePool from './components/CoursePool'
import SummaryBar from './components/SummaryBar'
import { useStore } from './store'

export default function App() {
  const clearAll = useStore((s) => s.clearAll)
  const hasCourses = useStore((s) => s.courses.length > 0)

  return (
    <div className="flex h-full flex-col bg-slate-100 text-slate-900">
      <Header />
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* 課表 */}
        <main className="flex min-h-0 flex-1 flex-col overflow-auto">
          <div className="flex-1 p-3">
            <ScheduleGrid />
          </div>
          <SummaryBar />
        </main>

        {/* 側邊：新增 + 清單 */}
        <aside className="w-full shrink-0 overflow-y-auto border-t border-slate-200 bg-white p-4 md:w-80 md:border-l md:border-t-0">
          <CourseForm />
          <div className="my-4 border-t border-slate-200" />
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">課程清單</h2>
            {hasCourses && (
              <button
                onClick={() => {
                  if (confirm('確定清除所有課程？')) clearAll()
                }}
                className="text-xs text-slate-400 hover:text-red-500"
              >
                清除全部
              </button>
            )}
          </div>
          <CoursePool />
        </aside>
      </div>
    </div>
  )
}
