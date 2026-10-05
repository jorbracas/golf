'use client'

import { useMemo, useState } from 'react'

const FT = 12

function fmt(inches: number) {
  const ft = Math.floor(inches / FT)
  const inch = Math.round(inches - ft * FT)
  return inch === 12 ? `${ft + 1}′ 0″` : `${ft}′ ${inch}″`
}

export default function SimulatorRoomCalculator() {
  const [heightIn, setHeightIn] = useState(70)      // golfer height in inches
  const [driverIn, setDriverIn] = useState(45.5)   // driver length
  const [hands, setHands] = useState<'right' | 'both'>('right')
  const [monitor, setMonitor] = useState<'front' | 'overhead' | 'radar'>('front')
  const [room, setRoom] = useState({ w: 12, d: 16, h: 9.5 })  // feet

  const r = useMemo(() => {
    // Conservative rule of thumb: golfer height + driver length. Many swings need less;
    // a real swing test in the room is the only definitive check.
    const ceiling = heightIn + driverIn
    const width = hands === 'both' ? [14, 16] : [10, 12]
    const behindBall = monitor === 'radar' ? [8, 10] : [4, 7]
    const depth = [1 + 10 + behindBall[0], 1 + 12 + behindBall[1]]
    return { ceiling, width, depth, behindBall }
  }, [heightIn, driverIn, hands, monitor])

  const ok = (have: number, need: number) => (have >= need ? 'text-emerald-400' : 'text-amber-400')
  const sel = 'w-full bg-fairway-900 border border-fairway-700 focus:border-gold-500 outline-none px-2 py-2 text-stone-100 text-sm font-body'
  const label = 'text-stone-500 text-xs uppercase tracking-wide font-body mb-1 block'

  return (
    <div className="card-dark p-5 sm:p-6 my-8 border-gold-600/40" id="calculator">
      <p className="section-label mb-2">Calculator</p>
      <h2 className="display-heading text-xl text-stone-100 mb-1">Will a golf simulator fit in my room?</h2>
      <p className="text-stone-500 text-xs font-body mb-5">Enter the tallest player and your room. Results are planning guidance, not a substitute for a swing test with your driver.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label><span className={label}>Tallest player</span>
          <select className={sel} value={heightIn} onChange={(e) => setHeightIn(+e.target.value)}>
            {Array.from({ length: 25 }, (_, i) => 60 + i).map((v) => <option key={v} value={v}>{fmt(v)} ({Math.round(v * 2.54)} cm)</option>)}
          </select>
        </label>
        <label><span className={label}>Driver length (inches)</span>
          <input className={sel} inputMode="decimal" value={driverIn} onChange={(e) => setDriverIn(+e.target.value || 0)} />
        </label>
        <label><span className={label}>Who will hit?</span>
          <select className={sel} value={hands} onChange={(e) => setHands(e.target.value as 'right' | 'both')}>
            <option value="right">Right-handed only (or left only)</option>
            <option value="both">Both right- and left-handed</option>
          </select>
        </label>
        <label><span className={label}>Launch monitor</span>
          <select className={sel} value={monitor} onChange={(e) => setMonitor(e.target.value as 'front' | 'overhead' | 'radar')}>
            <option value="front">Beside the ball (photometric, e.g. SkyTrak, Bushnell)</option>
            <option value="overhead">Ceiling-mounted camera (e.g. Uneekor)</option>
            <option value="radar">Radar behind the golfer (e.g. Garmin R10, Mevo+)</option>
          </select>
        </label>
        <div className="sm:col-span-2 grid grid-cols-3 gap-3">
          {(['w', 'd', 'h'] as const).map((k) => (
            <label key={k}><span className={label}>Room {k === 'w' ? 'width' : k === 'd' ? 'depth' : 'height'} (ft)</span>
              <input className={sel} inputMode="decimal" value={room[k]} onChange={(e) => setRoom({ ...room, [k]: +e.target.value || 0 })} />
            </label>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-fairway-900 border border-fairway-700 p-4">
          <p className={label}>Ceiling</p>
          <p className="font-display text-2xl text-stone-100">{fmt(r.ceiling)}</p>
          <p className={`text-xs font-body mt-1 ${ok(room.h * FT, r.ceiling)}`}>
            {room.h * FT >= r.ceiling ? 'Clears our conservative estimate' : `${fmt(r.ceiling - room.h * FT)} under our conservative estimate: swing-test it`}
          </p>
        </div>
        <div className="bg-fairway-900 border border-fairway-700 p-4">
          <p className={label}>Width</p>
          <p className="font-display text-2xl text-stone-100">{r.width[0]}–{r.width[1]} ft</p>
          <p className={`text-xs font-body mt-1 ${ok(room.w, r.width[0])}`}>{room.w >= r.width[1] ? 'Comfortable' : room.w >= r.width[0] ? 'Workable' : 'Tight'}</p>
        </div>
        <div className="bg-fairway-900 border border-fairway-700 p-4">
          <p className={label}>Depth</p>
          <p className="font-display text-2xl text-stone-100">{r.depth[0]}–{r.depth[1]} ft</p>
          <p className={`text-xs font-body mt-1 ${ok(room.d, r.depth[0])}`}>{room.d >= r.depth[1] ? 'Comfortable' : room.d >= r.depth[0] ? 'Workable' : 'Tight'}</p>
        </div>
      </div>
      <p className="text-stone-600 text-xs font-body mt-4">
        Depth = ~1 ft behind the screen + 10–12 ft from ball to screen + {r.behindBall[0]}–{r.behindBall[1]} ft behind the ball
        {monitor === 'radar' ? ' (radar units sit several feet behind the tee)' : ''}. Width assumes the hitting area is offset for one-handed setups and centred for mixed groups.
      </p>
    </div>
  )
}
