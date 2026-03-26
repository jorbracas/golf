const TAG = 'dronewithca0b-20'
const dp  = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${TAG}`
const s   = (q: string)    => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${TAG}`

export type Product = {
  id: string
  name: string
  brand: string
  category: string
  amazonUrl: string
  description: string
  features: string[]
  who_uses: string
  image: string
  badge?: string
}

export const products: Product[] = [
  {
    id: 'titleist-pro-v1x',
    name: 'Pro V1x Golf Balls',
    brand: 'Titleist',
    category: 'Golf Balls',
    amazonUrl: dp('B01N7W2V8C'),
    description: "The world's most played tour ball. High trajectory, low long game spin, and exceptional Drop-and-Stop greenside control with a firmer feel.",
    features: ['High trajectory, low long game spin', 'Drop-and-Stop short game control', 'Firmer feel than Pro V1', '348 tetrahedral dimple design'],
    who_uses: 'Richie Ramsey',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4ce?w=600&q=80',
    badge: 'Tour Choice',
  },
  {
    id: 'taylormade-p770-2024',
    name: 'P770 Irons (2024)',
    brand: 'TaylorMade',
    category: 'Irons',
    amazonUrl: dp('B0DBK5RBXH'),
    description: 'Forged precision irons with FLTD CG technology for improved launch and spin. The best feeling P770 to date, refined for the modern tour player.',
    features: ['Solid forged construction', 'FLTD CG for optimal launch', 'Precision milled face and grooves', 'Compact tour-preferred head shape'],
    who_uses: 'Edoardo Molinari',
    image: 'https://images.unsplash.com/photo-1611374243504-de7b19e79b8f?w=600&q=80',
    badge: 'Best Seller',
  },
  {
    id: 'scotty-cameron-special-select',
    name: 'Special Select Newport 2',
    brand: 'Scotty Cameron',
    category: 'Putters',
    amazonUrl: s('Scotty Cameron Special Select Newport 2 putter'),
    description: 'Milled from 303 stainless steel, the Newport 2 is the most trusted putter shape on tour. Dual-milled face for consistent distance control and pure roll.',
    features: ['303 stainless steel milling', 'Dual-milled face texture', 'Interchangeable sole weights', 'Straight step steel shaft'],
    who_uses: 'Andrea Pavan',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
  },
  {
    id: 'ping-i230',
    name: 'i230 Irons',
    brand: 'Ping',
    category: 'Irons',
    amazonUrl: s('Ping i230 irons set'),
    description: "Players' irons delivering exceptional consistency and feel. MicroMax grooves and a rounded lead edge give tour-level precision with added forgiveness.",
    features: ['MicroMax precision-milled grooves', 'Activated elastomer insert for feel', 'Rounded lead edge for clean turf', 'Consistent distance gapping throughout'],
    who_uses: 'Eddie Pepperell',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    badge: "Editor's Pick",
  },
  {
    id: 'titleist-t100',
    name: 'T100 Irons',
    brand: 'Titleist',
    category: 'Irons',
    amazonUrl: s('Titleist T100 irons set'),
    description: 'The iron of choice for tour professionals demanding maximum workability. Co-forged construction delivers pure feedback on every strike.',
    features: ['Co-forged 1025 carbon steel', 'Max-impact insert', 'Compact players profile', 'Extreme precision CNC milled face'],
    who_uses: 'Richie Ramsey',
    image: 'https://images.unsplash.com/photo-1560175400-e78e1a7b6f08?w=600&q=80',
  },
  {
    id: 'callaway-chrome-tour',
    name: 'Chrome Tour Golf Balls',
    brand: 'Callaway',
    category: 'Golf Balls',
    amazonUrl: s('Callaway Chrome Tour golf balls dozen'),
    description: 'Tour urethane cover ball with Graphene-infused dual SoftFast Core. Exceptional speed, spin control, and feel from tee to green.',
    features: ['Graphene-infused dual core', 'Tour urethane cover', 'HEX aerodynamics', 'Soft feel across all clubs'],
    who_uses: 'Andrea Pavan',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80',
  },
  {
    id: 'titleist-players4-bag',
    name: 'Players 4 Stand Bag',
    brand: 'Titleist',
    category: 'Bags',
    amazonUrl: s('Titleist Players 4 stand bag'),
    description: 'Lightweight walking bag for the serious golfer. Clean tour aesthetic, practical organisation, and a comfortable dual strap system.',
    features: ['4-way top with full-length dividers', 'Lightweight 3.3 lb construction', 'Premium dual strap system', 'Multiple pockets with valuables pouch'],
    who_uses: 'Richie Ramsey',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
  },
  {
    id: 'garmin-approach-s62',
    name: 'Approach S62 GPS Watch',
    brand: 'Garmin',
    category: 'Technology',
    amazonUrl: s('Garmin Approach S62 GPS golf watch'),
    description: 'Tour-quality GPS in a premium smartwatch. 42,000+ preloaded courses, Virtual Caddie, and full shot tracking on your wrist.',
    features: ['42,000+ preloaded courses', 'PlaysLike distance adjustments', 'Virtual Caddie feature', 'Full round shot tracking'],
    who_uses: '',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    badge: 'Staff Pick',
  },
]

export const categories = ['All', 'Golf Balls', 'Irons', 'Putters', 'Bags', 'Technology']
