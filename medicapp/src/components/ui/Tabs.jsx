import { useState } from 'react'
export default function Tabs({ tabs = [], initial = 0 }) {
  const [i, setI] = useState(initial)
  return (
    <div>
      <div className="tablist">
        {tabs.map((t,idx)=> (
          <button key={t.label} className={`tab ${i===idx?'tab-active':'tab-inactive'}`} onClick={()=>setI(idx)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-b-xl p-4">
        {tabs[i]?.content}
      </div>
    </div>
  )
}
