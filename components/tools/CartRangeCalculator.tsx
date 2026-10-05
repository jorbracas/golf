'use client'

import { useMemo, useState } from 'react'

// Baseline consumption for a 2-seat cart on flat ground at 12-15 mph: ~120 Wh per mile.
// Derived from published 48V lithium ranges (e.g. 48V 100Ah ≈ 4.8 kWh → ~35-45 miles).
const BASE_WH_PER_MILE = 120

const TERRAIN = { flat: 1, rolling: 1.25, hilly: 1.5 } as const
const LOAD = { two: 1, four: 1.15, six: 1.3 } as const
const CHEM = { lithium: 0.9, lead: 0.5 } as const // usable share of rated capacity

export default function CartRangeCalculator() {
  const [voltage, setVoltage] = useState(48)
  const [ah, setAh] = useState(105)
  const [chem, setChem] = useState<keyof typeof CHEM>('lithium')
  const [terrain, setTerrain] = useState<keyof typeof TERRAIN>('flat')
  const [load, setLoad] = useState<keyof typeof LOAD>('two')
  const [lifted, setLifted] = useState(false)
  const [fast, setFast] = useState(false)

  const r = useMemo(() => {
    const kwh = (voltage * ah) / 1000
    const usable = kwh * CHEM[chem]
    const wh = BASE_WH_PER_MILE * TERRAIN[terrain] * LOAD[load] * (lifted ? 1.15 : 1) * (fast ? 1.2 : 1)
    const miles = (usable * 1000) / wh
    return { kwh, usable, wh, low: miles * 0.85, high: miles * 1.1 }
  }, [voltage, ah, chem, terrain, load, lifted, fast])

  const sel = 'w-full bg-fairway-900 border border-fairway-700 focus:border-gold-500 outline-none px-2 py-2 text-stone-100 text-sm font-body'
  const label = 'text-stone-500 text-xs uppercase tracking-wide font-body mb-1 block'

  return (
    <div className="card-dark p-5 sm:p-6 my-8 border-gold-600/40" id="calculator">
      <p className="section-label mb-2">Calculator</p>
      <h2 className="display-heading text-xl text-stone-100 mb-1">Golf cart range estimator</h2>
      <p className="text-stone-500 text-xs font-body mb-5">Pack voltage × amp-hours gives the energy in the pack; the rest depends on how and where you drive.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label><span className={label}>System voltage</span>
          <select className={sel} value={voltage} onChange={(e) => setVoltage(+e.target.value)}>
            {[36, 48, 72].map((v) => <option key={v} value={v}>{v} V</option>)}
          </select>
        </label>
        <label><span className={label}>Pack capacity (Ah)</span>
          <input className={sel} inputMode="numeric" value={ah} onChange={(e) => setAh(Math.max(0, +e.target.value || 0))} />
        </label>
        <label><span className={label}>Battery type</span>
          <select className={sel} value={chem} onChange={(e) => setChem(e.target.value as keyof typeof CHEM)}>
            <option value="lithium">Lithium (LiFePO4)</option>
            <option value="lead">Lead-acid (flooded / AGM)</option>
          </select>
        </label>
        <label><span className={label}>Terrain</span>
          <select className={sel} value={terrain} onChange={(e) => setTerrain(e.target.value as keyof typeof TERRAIN)}>
            <option value="flat">Mostly flat</option>
            <option value="rolling">Rolling</option>
            <option value="hilly">Hilly</option>
          </select>
        </label>
        <label><span className={label}>Passengers</span>
          <select className={sel} value={load} onChange={(e) => setLoad(e.target.value as keyof typeof LOAD)}>
            <option value="two">1–2</option>
            <option value="four">3–4</option>
            <option value="six">5–6</option>
          </select>
        </label>
        <div className="flex flex-col gap-2 justify-end text-sm font-body text-stone-300">
          <label className="flex items-center gap-2"><input type="checkbox" checked={lifted} onChange={(e) => setLifted(e.target.checked)} /> Lift kit / oversize tyres</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={fast} onChange={(e) => setFast(e.target.checked)} /> Mostly at top speed (20 mph+)</label>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-fairway-900 border border-fairway-700 p-4 sm:col-span-2">
          <p className={label}>Estimated range</p>
          <p className="font-display text-3xl text-gold-400 tabular-nums">{Math.round(r.low)}–{Math.round(r.high)} miles</p>
          <p className="text-stone-500 text-xs font-body mt-1">{Math.round(r.low * 1.609)}–{Math.round(r.high * 1.609)} km on a full charge</p>
        </div>
        <div className="bg-fairway-900 border border-fairway-700 p-4">
          <p className={label}>Usable energy</p>
          <p className="font-display text-2xl text-stone-100 tabular-nums">{r.usable.toFixed(1)} kWh</p>
          <p className="text-stone-500 text-xs font-body mt-1">of {r.kwh.toFixed(1)} kWh rated · ~{Math.round(r.wh)} Wh/mile</p>
        </div>
      </div>
      <p className="text-stone-600 text-xs font-body mt-4">
        Assumes ~{BASE_WH_PER_MILE} Wh/mile for a two-seater on flat ground, ~90% usable capacity for lithium and ~50% for lead-acid (deeper discharges shorten lead-acid life). Cold weather, soft tyres and worn batteries cut range further.
      </p>
    </div>
  )
}
