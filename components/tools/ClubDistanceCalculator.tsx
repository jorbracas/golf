'use client'

import { useMemo, useState } from 'react'

// Carry of each club as a share of driver carry. Woods, 3-hybrid and irons use TrackMan PGA Tour carry averages
// as published by GolfWRX (driver 269, 3W 243, 5W 230, hybrid 225, 4i 203 ... PW 136 yd); the 7-wood uses the
// LPGA TrackMan ratio (174/220); the 4-hybrid and the wedges below PW are interpolated (wedges ~13 yd apart at
// tour speed, ~10 yd at average amateur speed). Estimates for a full, solid swing.
const CLUBS: [string, number][] = [
  ['Driver', 1],
  ['3-wood', 0.9],
  ['5-wood', 0.855],
  ['3-hybrid', 0.835],
  ['7-wood', 0.79],
  ['4-hybrid', 0.775],
  ['4-iron', 0.755],
  ['5-iron', 0.72],
  ['6-iron', 0.68],
  ['7-iron', 0.64],
  ['8-iron', 0.595],
  ['9-iron', 0.55],
  ['Pitching wedge', 0.505],
  ['Gap wedge (50–52°)', 0.455],
  ['Sand wedge (54–56°)', 0.405],
  ['Lob wedge (58–60°)', 0.355],
]
// Amateur driver carry ≈ 2.3 yd per mph of club speed (tour players with better strike get ~2.4).
const YD_PER_MPH = 2.3
const SEVEN_IRON = 0.64

export default function ClubDistanceCalculator() {
  const [mode, setMode] = useState<'speed' | 'seven'>('speed')
  const [speed, setSpeed] = useState(90)
  const [seven, setSeven] = useState(140)
  const [metres, setMetres] = useState(false)

  const rows = useMemo(() => {
    const driverCarry = mode === 'speed' ? speed * YD_PER_MPH : seven / SEVEN_IRON
    // slower swingers lose relatively more with long irons: trim 4-6 iron when driver carry < 200 yd
    const slow = Math.max(0, Math.min(1, (200 - driverCarry) / 60))
    return CLUBS.map(([name, k]) => {
      let carry = driverCarry * k
      if (/^[456]-iron$/.test(name)) carry *= 1 - 0.05 * slow
      return { name, carry: metres ? carry * 0.9144 : carry }
    })
  }, [mode, speed, seven, metres])

  const unit = metres ? 'm' : 'yd'
  const inp = 'w-full bg-fairway-900 border border-fairway-700 focus:border-gold-500 outline-none px-2 py-2 text-stone-100 text-sm font-body'
  const label = 'text-stone-500 text-xs uppercase tracking-wide font-body mb-1 block'
  const tab = (on: boolean) =>
    `px-3 py-2 text-xs font-body border ${on ? 'border-gold-500 text-gold-300' : 'border-fairway-700 text-stone-400 hover:text-stone-200'}`

  return (
    <div className="card-dark p-5 sm:p-6 my-8 border-gold-600/40" id="calculator">
      <p className="section-label mb-2">Calculator</p>
      <h2 className="display-heading text-xl text-stone-100 mb-1">Your club distance chart</h2>
      <p className="text-stone-500 text-xs font-body mb-5">Enter your driver swing speed or how far you carry a 7-iron. We estimate the carry for every other club.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <button type="button" className={tab(mode === 'speed')} onClick={() => setMode('speed')}>Driver swing speed</button>
        <button type="button" className={tab(mode === 'seven')} onClick={() => setMode('seven')}>7-iron carry</button>
        <button type="button" className={tab(metres)} onClick={() => setMetres(!metres)}>{metres ? 'Showing metres' : 'Show metres'}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mode === 'speed' ? (
          <label><span className={label}>Driver club speed (mph): {speed}</span>
            <input type="range" min={60} max={125} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full accent-gold-500" />
          </label>
        ) : (
          <label><span className={label}>7-iron carry (yards)</span>
            <input className={inp} inputMode="numeric" value={seven} onChange={(e) => setSeven(Math.max(0, Math.min(250, +e.target.value || 0)))} />
          </label>
        )}
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="text-stone-500 text-xs uppercase tracking-wide text-left">
              <th className="py-2 pr-4 font-normal">Club</th>
              <th className="py-2 font-normal text-right">Est. carry ({unit})</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-fairway-700">
                <td className="py-2 pr-4 text-stone-300">{r.name}</td>
                <td className="py-2 text-right tabular-nums text-gold-400">{Math.round(r.carry)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-stone-600 text-xs font-body mt-4">
        Estimates for solid, full swings in calm conditions, scaled from TrackMan tour and LPGA ratios between clubs. Carry only: add roll on firm ground. Your real numbers depend on strike quality, lofts and conditions, so check them on a launch monitor or range.
      </p>
    </div>
  )
}
