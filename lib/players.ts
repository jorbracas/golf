export type Player = {
  slug: string
  name: string
  nationality: string
  flag: string
  born: string
  turned_pro: string
  turned_pro_year: number
  height: string
  world_ranking_peak: string
  tour: string
  status: string
  image: string
  bio: string
  bio_extended: string
  achievements: string[]
  equipment: {
    driver?: string
    irons?: string
    putter?: string
    ball?: string
    bag?: string
  }
  amazon_links: {
    label: string
    amazonUrl: string
    description: string
  }[]
  wikipedia_url: string
  social: {
    twitter?: string
    instagram?: string
  }
}

export const players: Player[] = [
  {
    slug: 'edoardo-molinari',
    name: 'Edoardo Molinari',
    nationality: 'Italian',
    flag: '🇮🇹',
    born: '15 February 1980, Turin, Italy',
    turned_pro: '2004',
    turned_pro_year: 2004,
    height: "6'1\" (185 cm)",
    world_ranking_peak: 'Top 50',
    tour: 'DP World Tour',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    bio: 'Edoardo Molinari is an Italian professional golfer who plays on the DP World Tour. Brother of Ryder Cup captain Francesco Molinari, Edoardo has built a distinguished career on the European circuit since turning professional in 2004.',
    bio_extended: `Edoardo Molinari was born in Turin, Italy, into a family deeply rooted in golf culture. His father Giuliano was a respected golf teacher, and his younger brother Francesco would go on to become one of Europe\'s most celebrated golfers, winning The Open Championship in 2018.

Edoardo attended university in Turin before pursuing his professional career, a path less common among elite golfers that speaks to his intellectual approach to the game. He turned professional in 2004 and quickly established himself on the Challenge Tour before graduating to the European Tour.

His most celebrated moment came as part of the victorious 2010 European Ryder Cup team at Celtic Manor, where Europe defeated the United States 14½–13½. Playing alongside his brother Francesco in the foursomes and four-balls, Edoardo contributed to one of golf\'s most emotionally charged team events.

On tour, Edoardo is known for his precise ball-striking, particularly his iron play — a trait shared with his brother and a hallmark of the technical teaching they received growing up. His analytical approach to course management has allowed him to remain competitive across multiple decades on tour.

Off the course, Edoardo is involved in golf development in Italy and is a vocal advocate for growing the sport in a country where football dominates the sporting landscape.`,
    achievements: [
      'Member of 2010 Ryder Cup winning European team (Celtic Manor)',
      'Multiple DP World Tour titles',
      'Challenge Tour graduate',
      'Represented Italy in international team events',
      'Son and brother of professional golfers — the Molinari golf dynasty',
    ],
    equipment: {
      driver: 'TaylorMade Qi10',
      irons: 'TaylorMade P770',
      putter: 'Odyssey White Hot OG',
      ball: 'TaylorMade TP5',
    },
    amazon_links: [
      {
        label: 'TaylorMade P770 Irons',
        amazonUrl: 'https://www.amazon.com/dp/B0DBK5RBXH?tag=dronewithca0b-20',
        description: 'Tour-preferred irons favoured by precision ball-strikers like Edoardo.',
      },
      {
        label: 'TaylorMade TP5 Golf Balls',
        amazonUrl: 'https://www.amazon.com/s?k=TaylorMade+TP5+golf+balls&tag=dronewithca0b-20',
        description: 'Five-layer tour ball for maximum distance and spin control.',
      },
      {
        label: 'Ryder Cup: The Complete History',
        amazonUrl: 'https://www.amazon.com/s?k=Ryder+Cup+history+book&tag=dronewithca0b-20',
        description: 'Comprehensive history of the tournament where Edoardo made his mark.',
      },
    ],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Edoardo_Molinari',
    social: {
      twitter: 'EdoardoMolinari',
      instagram: 'edoardomolinari',
    },
  },
  {
    slug: 'andrea-pavan',
    name: 'Andrea Pavan',
    nationality: 'Italian',
    flag: '🇮🇹',
    born: '25 May 1989, Rome, Italy',
    turned_pro: '2011',
    turned_pro_year: 2011,
    height: "6'0\" (183 cm)",
    world_ranking_peak: 'Top 80',
    tour: 'DP World Tour',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
    bio: 'Andrea Pavan is an Italian professional golfer representing Italy on the DP World Tour. A consistent performer on the European circuit, Pavan is known for his composed approach and consistent ball-striking.',
    bio_extended: `Andrea Pavan grew up in Rome with golf in his blood. From an early age, the sport became his defining passion, and by his teenage years it was clear he had the talent and dedication to pursue a professional career.

After a successful amateur career in Italy, Pavan turned professional in 2011, earning his card on the Challenge Tour before making the step up to the European Tour. His progression was methodical and patient — qualities that would come to define his professional style.

Pavan earned his first DP World Tour victory at the Czech Masters, a win that cemented his status as a legitimate tour-level performer. His game is built on consistency rather than fireworks — precise driving, measured iron play, and a calm temperament under pressure.

He has been a dedicated representative of Italian golf internationally, competing in national team events and helping to raise the profile of golf in a country where the sport, despite growing enthusiasm, still plays second fiddle to other pursuits.

Andrea is known among fellow professionals for his professionalism and work ethic. He approaches each tournament with detailed preparation, a quality that has allowed him to compete at the highest level consistently throughout his career.`,
    achievements: [
      'DP World Tour winner — Czech Masters',
      'Multiple top-10 finishes on the European Tour',
      'Italian national team representative',
      'Challenge Tour graduate',
      'Consistent top-100 world ranking performer',
    ],
    equipment: {
      driver: 'Callaway Paradym Ai Smoke',
      irons: 'Callaway Apex Pro',
      putter: 'Scotty Cameron Special Select',
      ball: 'Callaway Chrome Tour',
    },
    amazon_links: [
      {
        label: 'Callaway Apex Pro Irons',
        amazonUrl: 'https://www.amazon.com/s?k=Callaway+Apex+Pro+irons&tag=dronewithca0b-20',
        description: 'Tour-quality forged irons for players who demand precision and feel.',
      },
      {
        label: 'Scotty Cameron Special Select Putter',
        amazonUrl: 'https://www.amazon.com/s?k=Scotty+Cameron+Special+Select+Newport+2+putter&tag=dronewithca0b-20',
        description: 'Premium milled putter trusted by tour professionals worldwide.',
      },
      {
        label: 'Golf Mental Game Mastery',
        amazonUrl: 'https://www.amazon.com/s?k=golf+mental+game+book&tag=dronewithca0b-20',
        description: 'Develop the composed mindset that separates tour professionals from the rest.',
      },
    ],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Andrea_Pavan',
    social: {
      twitter: 'AndreaPavan89',
      instagram: 'andreapavanofficial',
    },
  },
  {
    slug: 'richie-ramsey',
    name: 'Richie Ramsey',
    nationality: 'Scottish',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    born: '3 July 1983, Aberdeen, Scotland',
    turned_pro: '2006',
    turned_pro_year: 2006,
    height: "6'2\" (188 cm)",
    world_ranking_peak: 'Top 60',
    tour: 'DP World Tour',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4ce?w=800&q=80',
    bio: 'Richie Ramsey is a Scottish professional golfer from Aberdeen, one of the most respected figures in British golf. A multiple European Tour winner, Ramsey is known for his powerful game and fierce competitive spirit.',
    bio_extended: `Richie Ramsey was born and raised in Aberdeen, Scotland, a city with deep connections to the North Sea oil industry and an equally strong golfing tradition. Growing up near some of Scotland\'s finest links courses forged a playing style built on resilience, shot-making, and the ability to perform in the most demanding conditions.

Before turning professional, Ramsey had a distinguished amateur career, culminating in winning the 2006 US Amateur Championship — one of golf\'s most prestigious amateur titles. That victory at Hazeltine National Golf Club announced him to the world and set the expectations for a professional career that would follow.

He turned professional immediately after and quickly earned his European Tour card. His first tour victory came at the 2008 Johnnie Walker Championship at Gleneagles, on home soil in Scotland, a moment of particular personal significance.

Ramsey has gone on to win multiple times on the European Tour, establishing himself as one of Scottish golf\'s most consistent performers over multiple decades. His long game — particularly his driving — is among the strongest on tour, giving him the ability to overpower many courses when playing well.

Beyond his playing record, Ramsey is known within the game for his authenticity and directness. He speaks candidly about life on tour, the pressures of professional sport, and the mental challenges of sustaining a long career.`,
    achievements: [
      '2006 US Amateur Champion — Hazeltine National',
      'Multiple DP World Tour victories',
      'Johnnie Walker Championship at Gleneagles winner',
      'Scottish national team representative',
      'Consistent DP World Tour performer for over 15 years',
    ],
    equipment: {
      driver: 'Titleist TSR3',
      irons: 'Titleist T100',
      putter: 'Odyssey Tri-Hot 5K',
      ball: 'Titleist Pro V1x',
      bag: 'Titleist Players 4',
    },
    amazon_links: [
      {
        label: 'Titleist Pro V1x Golf Balls',
        amazonUrl: 'https://www.amazon.com/dp/B01N7W2V8C?tag=dronewithca0b-20',
        description: 'The tour\'s most trusted ball — distance, spin, and feel in one package.',
      },
      {
        label: 'Titleist T100 Irons',
        amazonUrl: 'https://www.amazon.com/s?k=Titleist+T100+irons&tag=dronewithca0b-20',
        description: 'Precision forged irons for players who demand workability and feedback.',
      },
      {
        label: 'The US Amateur: A History',
        amazonUrl: 'https://www.amazon.com/s?k=US+Amateur+golf+championship+book&tag=dronewithca0b-20',
        description: 'Celebrating the championship where Ramsey announced himself to the world.',
      },
    ],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Richie_Ramsey',
    social: {
      twitter: 'richie_ramsey',
      instagram: 'richieramseygolf',
    },
  },
  {
    slug: 'eddie-pepperell',
    name: 'Eddie Pepperell',
    nationality: 'English',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    born: '2 June 1991, Oxford, England',
    turned_pro: '2012',
    turned_pro_year: 2012,
    height: "6'1\" (185 cm)",
    world_ranking_peak: 'Top 40',
    tour: 'DP World Tour',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=800&q=80',
    bio: 'Eddie Pepperell is an English professional golfer from Oxford, one of the most charismatic and outspoken personalities on the DP World Tour. Known as much for his wit on social media as his elegant ball-striking, Pepperell brings a refreshing authenticity to professional golf.',
    bio_extended: `Eddie Pepperell was born in Oxford, England, and grew up in a household where intellectual curiosity was as valued as sporting achievement. This background would shape a career defined by depth of thought, self-awareness, and a willingness to say things others in professional sport prefer to leave unsaid.

Pepperell turned professional in 2012 and worked his way through the Challenge Tour before graduating to the European Tour. His game is built around an elegant, rhythmic swing — a technical model often cited by coaches and commentators for its efficiency and repeatability.

His breakthrough came at the 2018 British Masters, where he held off Rafa Cabrera Bello to claim his first European Tour title. Later that year he added the Qatar Masters, signalling that he had arrived as a genuine force on tour. That form lifted him into the world\'s top 40 — the highest point of a career that has been marked by moments of brilliance and the kind of honest struggle that defines sport at the highest level.

Off the course, Pepperell has become one of golf\'s most followed voices on social media, where his dry wit, philosophical observations, and willingness to engage critically with the culture of professional golf have earned him a devoted following. He has spoken openly about the mental challenges of touring life and the complex relationship between confidence and performance.

He is widely considered one of the most interesting and intellectually honest figures in the modern game.`,
    achievements: [
      '2018 British Masters champion',
      '2018 Qatar Masters champion',
      'Career high world ranking inside top 40',
      'Challenge Tour graduate',
      'One of European golf\'s most prominent public voices',
    ],
    equipment: {
      driver: 'Ping G430 Max',
      irons: 'Ping i230',
      putter: 'Ping PLD Milled Anser',
      ball: 'Titleist Pro V1',
    },
    amazon_links: [
      {
        label: 'Ping i230 Irons',
        amazonUrl: 'https://www.amazon.com/s?k=Ping+i230+irons&tag=dronewithca0b-20',
        description: 'Tour-level forged irons combining distance and pinpoint accuracy.',
      },
      {
        label: 'Ping PLD Milled Putter',
        amazonUrl: 'https://www.amazon.com/s?k=Ping+PLD+Milled+putter&tag=dronewithca0b-20',
        description: 'Precision milled putting surface for unmatched consistency on the greens.',
      },
      {
        label: 'Golf: The Mind Game',
        amazonUrl: 'https://www.amazon.com/s?k=golf+mind+game+book&tag=dronewithca0b-20',
        description: 'Master the mental side of golf — Pepperell\'s real competitive edge.',
      },
    ],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Eddie_Pepperell',
    social: {
      twitter: 'PepperellEddie',
      instagram: 'eddiepepperell',
    },
  },
]

export function getPlayerBySlug(slug: string): Player | undefined {
  return players.find((p) => p.slug === slug)
}

export function getAllPlayerSlugs(): string[] {
  return players.map((p) => p.slug)
}
