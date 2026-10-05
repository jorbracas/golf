import dynamic from 'next/dynamic'

// Interactive calculators that articles can embed via their `tool` field.
// Placed where the article content contains the marker [[tool]] (or after the intro if absent).
const TOOLS = {
  handicap: dynamic(() => import('./HandicapCalculator')),
  'cart-range': dynamic(() => import('./CartRangeCalculator')),
  'simulator-room': dynamic(() => import('./SimulatorRoomCalculator')),
}

export type ToolId = keyof typeof TOOLS

export function Tool({ id }: { id?: string }) {
  if (!id || !(id in TOOLS)) return null
  const C = TOOLS[id as ToolId]
  return <C />
}
