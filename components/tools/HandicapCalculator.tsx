'use client'

import { useMemo, useState } from 'react'

type Round = { score: string; rating: string; slope: string }

// WHS: number of differentials used and adjustment for fewer than 20 scores (Rule 5.2a)
const TABLE: Record<number, [number, number]> = {
  3: [1, -2], 4: [1, -1], 5: [1, 0], 6: [2, -1], 7: [2, 0], 8: [2, 0],
  9: [3, 0], 10: [3, 0], 11: [3, 0], 12: [4, 0], 13: [4, 0], 14: [4, 0],
  15: [5, 0], 16: [5, 0], 17: [6, 0], 18: [6, 0], 19: [7, 0], 20: [8, 0],
}

const blank = (): Round => ({ score: '', rating: '72.0', slope: '113' })

export default function HandicapCalculator() {
  const [rounds, setRounds] = useState<Round[]>([
    { score: '98', rating: '71.2', slope: '128' },
    { score: '102', rating: '71.2', slope: '128' },
    { score: '95', rating: '69.8', slope: '121' },
    blank(),
    blank(),
  ])
  const [par, setPar] = useState('72')

  const result = useMemo(() => {
    const diffs = rounds
      .map((r) => {
        const s = parseFloat(r.score), cr = parseFloat(r.rating), sl = parseFloat(r.slope)
        if (!s || !cr || !sl || sl < 55 || sl > 155) return null
        return ((s - cr) * 113) / sl
      })
      .filter((d): d is number => d !== null)
      .slice(-20)
    if (diffs.length < 3) return { diffs, index: null as number | null }
    const [use, adj] = TABLE[Math.min(diffs.length, 20)]
    const lowest = [...diffs].sort((a, b) => a - b).slice(0, use)
    const avg = lowest.reduce((a, b) => a + b, 0) / use + adj
    const index = Math.min(54, Math.floor(avg * 10) / 10)
    return { diffs, index, use, adj }
  }, [rounds])

  const last = rounds.filter((r) => parseFloat(r.score) && parseFloat(r.rating) && parseFloat(r.slope)).slice(-1)[0]
  const courseHcp =
    result.index !== null && last
      ? Math.round(result.index * (parseFloat(last.slope) / 113) + (parseFloat(last.rating) - (parseFloat(par) || 72)))
      : null

  const update = (i: number, key: keyof Round, v: string) =>
    setRounds((rs) => rs.map((r, j) => (j === i ? { ...r, [key]: v } : r)))

  const input = 'w-full bg-fairway-900 border border-fairway-700 focus:border-gold-500 outline-none px-2 py-1.5 text-stone-100 text-sm font-body'

  return (
    <div className="card-dark p-5 sm:p-6 my-8 border-gold-600/40" id="calculator">
      <p className="section-label mb-2">Calculator</p>
      <h2 className="display-heading text-xl text-stone-100 mb-1">Handicap Index calculator (WHS)</h2>
      <p className="text-stone-500 text-xs font-body mb-5">
        Enter adjusted gross scores with the course rating and slope from the scorecard. Use 113 / par as rating if you don&apos;t know them (the result will be rougher).
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[420px]">
          <thead>
            <tr className="text-stone-500 text-xs uppercase tracking-wide">
              <th className="text-left pb-2 pr-2">#</th>
              <th className="text-left pb-2 pr-2">Score</th>
              <th className="text-left pb-2 pr-2">Course rating</th>
              <th className="text-left pb-2 pr-2">Slope</th>
              <th className="text-left pb-2">Differential</th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((r, i) => {
              const s = parseFloat(r.score), cr = parseFloat(r.rating), sl = parseFloat(r.slope)
              const d = s && cr && sl ? ((s - cr) * 113) / sl : null
              return (
                <tr key={i}>
                  <td className="pr-2 py-1 text-stone-600">{i + 1}</td>
                  <td className="pr-2 py-1"><input aria-label={`Score round ${i + 1}`} inputMode="numeric" className={input} value={r.score} onChange={(e) => update(i, 'score', e.target.value)} /></td>
                  <td className="pr-2 py-1"><input aria-label={`Course rating round ${i + 1}`} inputMode="decimal" className={input} value={r.rating} onChange={(e) => update(i, 'rating', e.target.value)} /></td>
                  <td className="pr-2 py-1"><input aria-label={`Slope round ${i + 1}`} inputMode="numeric" className={input} value={r.slope} onChange={(e) => update(i, 'slope', e.target.value)} /></td>
                  <td className="py-1 text-stone-300 tabular-nums">{d !== null ? d.toFixed(1) : '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {rounds.length < 20 && (
          <button type="button" onClick={() => setRounds((rs) => [...rs, blank()])} className="text-xs font-body border border-fairway-700 hover:border-gold-500 text-stone-300 px-3 py-2">
            + Add round
          </button>
        )}
        <label className="text-xs font-body text-stone-500 flex items-center gap-2">
          Par of your usual course
          <input aria-label="Par" className={input + ' w-16'} value={par} onChange={(e) => setPar(e.target.value)} />
        </label>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-fairway-900 border border-fairway-700 p-4">
          <p className="text-stone-500 text-xs uppercase tracking-wide font-body mb-1">Handicap Index</p>
          <p className="font-display text-3xl text-gold-400 tabular-nums">{result.index !== null ? result.index.toFixed(1) : '—'}</p>
          <p className="text-stone-500 text-xs font-body mt-1">
            {result.index !== null
              ? `Average of your lowest ${result.use} of ${result.diffs.length} differentials${result.adj ? ` ${result.adj > 0 ? '+' : ''}${result.adj.toFixed(1)} adjustment` : ''}.`
              : 'Enter at least 3 rounds.'}
          </p>
        </div>
        <div className="bg-fairway-900 border border-fairway-700 p-4">
          <p className="text-stone-500 text-xs uppercase tracking-wide font-body mb-1">Course handicap (last course)</p>
          <p className="font-display text-3xl text-stone-100 tabular-nums">{courseHcp !== null ? courseHcp : '—'}</p>
          <p className="text-stone-500 text-xs font-body mt-1">Strokes you&apos;d get on that course from those tees.</p>
        </div>
      </div>
      <p className="text-stone-600 text-xs font-body mt-4">
        An estimate only. An official Handicap Index comes from your national association (GHIN in the US, England Golf, etc.), which also applies daily playing-conditions adjustments and caps.
      </p>
    </div>
  )
}
