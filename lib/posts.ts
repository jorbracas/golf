export type Post = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  image: string
  featured: boolean
  relatedPlayers?: string[]
}

export const posts: Post[] = [
  {
    slug: 'european-tour-season-preview-2025',
    title: 'DP World Tour 2025: Who to Watch This Season',
    excerpt: 'A comprehensive look at the players and storylines set to define the European circuit\'s most competitive season in years.',
    category: 'Tour Preview',
    date: '2025-01-15',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1560175400-e78e1a7b6f08?w=1200&q=80',
    featured: true,
    relatedPlayers: ['eddie-pepperell', 'richie-ramsey'],
    content: `The 2025 DP World Tour season promises to be one of the most compelling in recent memory. With the Ryder Cup cycle entering its mid-point, ranking points carry extra weight, and the field of contenders has rarely been more open.

## The Italian Contingent

Italy's representation on tour has never been stronger. Following Francesco Molinari's groundbreaking success, a new generation of Italian professionals has emerged with genuine top-level ambitions. Edoardo Molinari and Andrea Pavan continue to fly the flag with distinction, providing a template for the next wave of Italian talent coming through the amateur ranks.

## Scotland's Enduring Strength

Scottish golf maintains its depth across generations. Richie Ramsey, now in his late thirties, continues to demonstrate that longevity in professional golf is about consistency of preparation as much as raw talent. His performances in links conditions — a natural advantage for any golfer who grew up on the east coast of Scotland — remain among the best on tour.

## The Pepperell Factor

Few players divide opinion quite like Eddie Pepperell. When he's playing his best golf, the elegant Oxford-born right-hander is capable of competing with anyone in the world. The question, as it has always been with Pepperell, is sustaining that form over four rounds and across a full season.

## Equipment Trends to Watch

The equipment landscape continues to evolve rapidly. Multi-material driver construction, improved iron forgiveness, and advances in ball technology mean that the distance gap between tour professionals and elite amateurs continues to narrow. We break down what the top players are putting in the bag in 2025.`,
  },
  {
    slug: 'understanding-ryder-cup-qualifying',
    title: 'How Ryder Cup Qualifying Works: The Complete Guide',
    excerpt: 'The path from tour card to Ryder Cup selection is complex, high-stakes, and one of the most compelling narratives in European golf.',
    category: 'Explained',
    date: '2025-02-03',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',
    featured: false,
    relatedPlayers: ['edoardo-molinari', 'richie-ramsey'],
    content: `The Ryder Cup is professional golf's greatest team event. Understanding how players qualify for Europe's side reveals as much about the strategic landscape of the DP World Tour as it does about the event itself.

## The Points System

European Ryder Cup qualification operates through a two-pronged points system. The first list tracks world ranking points accumulated over a defined qualifying period. The second list awards points specifically for DP World Tour performances, giving extra weight to European circuit results.

## Automatic Picks vs Captain's Selections

The top nine players on the combined qualification list earn automatic selection. The captain then makes three wildcard picks — decisions that have defined careers and provoked debate for as long as the competition has existed.

## Why It Matters Year-Round

Understanding the Ryder Cup points race transforms how you watch the DP World Tour. Every tournament has a second narrative running underneath the leaderboard: who is rising in the rankings, who is playing their way onto the team, and who risks missing the cut at the most consequential level.`,
  },
  {
    slug: 'golf-equipment-guide-irons-2025',
    title: 'Best Golf Irons 2025: From Beginner to Tour Level',
    excerpt: 'A comprehensive breakdown of the iron market in 2025, from game-improvement clubs to the forged blades trusted by DP World Tour professionals.',
    category: 'Equipment',
    date: '2025-02-20',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1611374243504-de7b19e79b8f?w=1200&q=80',
    featured: true,
    content: `Iron technology has advanced more rapidly in the last five years than in the previous twenty. Understanding where different products sit in the market — and why tour professionals choose what they choose — is the starting point for making a smart purchase.

## What Tour Players Actually Use

Professional golfers play forged irons. The reasons are feel, workability, and tradition — in roughly that order. Forged irons provide haptic feedback through the hands that tells a skilled player exactly where contact was made on the face. That information allows real-time shot correction in a way that cast clubs cannot provide.

## Game Improvement vs Players Irons

The iron market divides broadly into game improvement clubs and players irons. Game improvement irons maximise forgiveness through perimeter weighting, wider soles, and higher launch. Players irons sacrifice some forgiveness for feel, workability, and the compact head shape that skilled players prefer.

## 2025 Recommendations by Category

**Tour Level**: TaylorMade P770, Titleist T100, Ping i230, Callaway Apex Pro
**Mid-Handicap**: TaylorMade P790, Titleist T200, Cobra KING Tour
**Game Improvement**: Callaway Paradym Ai, TaylorMade Stealth HD, Ping G430

The best iron is the one that suits your current game while leaving room for development. Getting a proper fitting — ideally on a launch monitor with a PGA professional — is worth every penny before a purchase at this price point.`,
  },
  {
    slug: 'links-golf-guide-scotland',
    title: 'Links Golf in Scotland: The Essential Guide',
    excerpt: 'From St Andrews to Carnoustie, the birthplace of golf offers an experience unlike anything else in the sport. Here\'s what you need to know before you go.',
    category: 'Travel',
    date: '2025-03-01',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80',
    featured: false,
    relatedPlayers: ['richie-ramsey'],
    content: `Scotland is where golf began, and links golf — played on the coastal strips of rough, wind-battered land between the beach and the farmland — remains the purest expression of the game. Every player should experience it at least once.

## What Makes Links Golf Different

Links courses play nothing like their parkland counterparts. The absence of trees, the constant wind, the firm and fast fairways, the deep pot bunkers, and the absence of defined rough create a game that rewards creativity, trajectory control, and a philosophical acceptance of what the weather delivers.

## The Essential Courses

**St Andrews Old Course** — The home of golf. Booking requires a ballot for visitor tee times. Apply months in advance.

**Carnoustie** — Perhaps the most brutal of the major venues. A course that demands respect and punishes complacency severely.

**Royal Dornoch** — Widely considered the finest course most golfers will ever play. Remote, wild, and utterly magnificent.

**Kingsbarns** — Newer than the others but already essential. Stunning clifftop setting near St Andrews.

**Brora** — The hidden gem. A James Braid design largely unchanged since 1923, cattle still wander the course.

## Practical Notes

Book accommodation in St Andrews well in advance. The town is small and demand is high. Hire a caddie at every course where it\'s available — their local knowledge transforms the experience and adds to the romance of the round.`,
  },
  {
    slug: 'mental-game-tour-professionals',
    title: 'The Mental Game: What Separates Tour Professionals',
    excerpt: 'Technical skill gets you to the tour. The mental game determines whether you stay. An exploration of the psychological demands of professional golf.',
    category: 'Psychology',
    date: '2025-03-10',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80',
    featured: false,
    relatedPlayers: ['eddie-pepperell', 'andrea-pavan'],
    content: `Professional golf is a psychologically demanding sport unlike almost any other. The periods of inaction between shots, the solitary nature of competition, the public visibility of every mistake, and the absence of a fixed season create conditions that test mental resilience continuously.

## The Confidence Paradox

Confidence in golf is both necessary and precarious. The best players in the world describe feeling genuinely bulletproof when in form — a certainty that each shot will go where intended. And yet that same certainty can evaporate in hours, leaving a player who ranked inside the world's top fifty struggling to break par.

## Process Over Outcome

Sport psychologists consistently identify a single distinction between high and low performers: focus on process versus focus on outcome. A player thinking about where the ball will land is producing anxiety. A player thinking about the quality of the takeaway, the tempo of the transition, the extension through impact — they are in process.

## The Pepperell Model

Eddie Pepperell has spoken more openly than almost any tour professional about the mental challenges of his career. His willingness to discuss form slumps, confidence crises, and the existential strangeness of making a living from hitting a ball into a hole is unusual in a culture that prizes stoic positivity. His honesty has made him one of the sport's most valuable voices.`,
  },
  {
    slug: 'golf-ball-guide-which-to-buy',
    title: 'Which Golf Ball Should You Be Playing? A Complete 2025 Guide',
    excerpt: 'The golf ball market has never been more complex or more interesting. Here\'s how to choose the right ball for your game — and why it matters more than you think.',
    category: 'Equipment',
    date: '2025-03-18',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4ce?w=1200&q=80',
    featured: false,
    content: `The golf ball is the only piece of equipment used on every single shot. And yet most amateur golfers pay less attention to ball selection than to almost any other gear decision. This is a mistake worth correcting.

## Why Ball Choice Matters

Different balls produce measurably different results in spin rate, launch angle, feel, and distance. The right ball for your swing speed, strike pattern, and scoring priorities can make a genuine difference to your round.

## The Compression Question

Ball compression — how much the ball deforms at impact — is the fundamental variable. High swing speeds (above 95 mph) generate enough force to compress a high-compression tour ball properly, releasing the stored energy as distance. Lower swing speeds benefit from softer, lower-compression balls that deform more easily at impact.

## 2025 Market Overview

**Tour Premium**: Titleist Pro V1/Pro V1x, TaylorMade TP5/TP5x, Callaway Chrome Tour, Bridgestone Tour B series. All are multi-layer constructions with urethane covers optimised for tour-level spin and feel.

**Mid-Range**: Srixon Q-Star Tour, Callaway Chrome Soft, TaylorMade Tour Response. Very strong performance at lower price points than the tour flagship models.

**Distance/Value**: Titleist Velocity, Srixon Soft Feel, TaylorMade Noodle. For golfers prioritising distance and durability over spin control.

The single most useful thing you can do is play the same ball consistently for several rounds. Switching between different models prevents you from learning how any of them behaves.`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug)
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured)
}
