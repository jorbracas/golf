export type Product = {
  id: string
  name: string
  brand: string
  category: string
  asin: string
  description: string
  features: string[]
  who_uses: string
  image: string
  badge?: string
}

export const products: Product[] = [
  {
    id: 'titleist-pro-v1',
    name: 'Pro V1 Golf Balls',
    brand: 'Titleist',
    category: 'Golf Balls',
    asin: 'B0CXYZEFGH',
    description: 'The world\'s number one golf ball. The Pro V1 delivers total performance in distance, consistent flight, and Drop-and-Stop™ greenside control.',
    features: ['Soft feel on all shots', 'Penetrating trajectory', 'Exceptional short game spin', 'Durable ionomer cover'],
    who_uses: 'Richie Ramsey',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4ce?w=600&q=80',
    badge: 'Tour Choice',
  },
  {
    id: 'taylormade-p770',
    name: 'P770 Irons',
    brand: 'TaylorMade',
    category: 'Irons',
    asin: 'B0CXYZ1234',
    description: 'Forged precision with distance-enhancing technology. The P770 combines a traditional players\' aesthetic with modern multi-material construction for tour-quality performance.',
    features: ['Forged 1025 carbon steel face', 'Hollow body construction', 'Thru-Slot Speed Pocket', 'Tour-preferred compact head shape'],
    who_uses: 'Edoardo Molinari',
    image: 'https://images.unsplash.com/photo-1611374243504-de7b19e79b8f?w=600&q=80',
    badge: 'Best Seller',
  },
  {
    id: 'scotty-cameron-special-select',
    name: 'Special Select Newport 2 Putter',
    brand: 'Scotty Cameron',
    category: 'Putters',
    asin: 'B0CXYZ7890',
    description: 'Milled from 303 stainless steel, the Newport 2 is the most trusted putter shape on tour. Precision crafted for consistent distance control and perfect alignment.',
    features: ['303 stainless steel milling', 'Dual-milled face', 'Studio Select weighting', 'Straight step steel shaft'],
    who_uses: 'Andrea Pavan',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
  },
  {
    id: 'ping-i230',
    name: 'i230 Irons',
    brand: 'Ping',
    category: 'Irons',
    asin: 'B0CXYZPQRS',
    description: 'Forged from 8620 carbon steel, the i230 is PING\'s most precise iron. Designed for skilled players demanding consistent, workable performance and premium feel.',
    features: ['8620 carbon steel forging', 'Precision CNC milling', 'Elastomer medallion', 'True Temper Dynamic Gold shaft'],
    who_uses: 'Eddie Pepperell',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    badge: 'Editor\'s Pick',
  },
  {
    id: 'titleist-t100',
    name: 'T100 Irons',
    brand: 'Titleist',
    category: 'Irons',
    asin: 'B0CXYZIJKL',
    description: 'The T100 delivers pure forged feel and exceptional precision for the tour-calibre player. Maximum workability for shotmakers who demand the very best.',
    features: ['Co-forged 1025 carbon steel', 'Max-impact insert', 'Compact player profile', 'Extreme precision CNC milling'],
    who_uses: 'Richie Ramsey',
    image: 'https://images.unsplash.com/photo-1560175400-e78e1a7b6f08?w=600&q=80',
  },
  {
    id: 'callaway-chrome-tour',
    name: 'Chrome Tour Golf Balls',
    brand: 'Callaway',
    category: 'Golf Balls',
    asin: 'B0CXYZ5678',
    description: 'Engineered with Graphene-infused Dual SoftFast Core and a Tour Urethane cover. The Chrome Tour delivers exceptional speed and spin control in all conditions.',
    features: ['Graphene dual core', 'Tour urethane cover', 'HEX Aerodynamics', 'Soft feel at impact'],
    who_uses: 'Andrea Pavan',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80',
  },
  {
    id: 'titleist-players-4-stand-bag',
    name: 'Players 4 Stand Bag',
    brand: 'Titleist',
    category: 'Bags',
    asin: 'B0CXYZIJKL2',
    description: 'Lightweight and comfortable, the Players 4 is the stand bag of choice for walking golfers worldwide. Clean lines and practical organisation for the serious player.',
    features: ['4-way top with full-length dividers', 'Lightweight 1.5 kg construction', 'Premium dual strap system', 'Multiple pockets with valuables pouch'],
    who_uses: 'Richie Ramsey',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
  },
  {
    id: 'golf-gps-watch',
    name: 'Approach S62 GPS Watch',
    brand: 'Garmin',
    category: 'Technology',
    asin: 'B0CXYZTUV2',
    description: 'Tour-level GPS precision in a premium watch. The Approach S62 delivers precise front, middle, and back distances alongside advanced performance statistics.',
    features: ['42,000+ preloaded courses', 'Green view with PlaysLike distance', 'Virtual Caddie feature', 'Shot tracking and statistics'],
    who_uses: '',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    badge: 'Staff Pick',
  },
]

export const categories = ['All', 'Golf Balls', 'Irons', 'Putters', 'Bags', 'Technology']
