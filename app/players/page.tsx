import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { players } from '@/lib/players'

export const metadata: Metadata = {
  title: 'Our Players',
  description: 'Meet the professional golfers managed by 4Sports Golf on the DP World Tour.',
}

export default function PlayersPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">The Roster</p>
          <h1 className="display-heading text-5xl sm:text-6xl text-stone-100 mb-6">Our Players</h1>
          <div className="divider-gold" />
          <p className="text-stone-400 max-w-xl mt-6 font-body leading-relaxed text-lg">
            Four of professional golf's most respected names, competing week in week out on the DP World Tour.
          </p>
        </div>
      </section>

      {/* Players */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {players.map((player, index) => (
            <Link
              key={player.slug}
              href={`/players/${player.slug}`}
              className="group card-dark flex flex-col sm:flex-row overflow-hidden hover:border-gold-500 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full sm:w-72 h-56 sm:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-fairway-800 hidden sm:block" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-center flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{player.flag}</span>
                      <span className="section-label">{player.nationality} · {player.tour}</span>
                    </div>
                    <h2 className="display-heading text-3xl sm:text-4xl text-stone-100 mb-4 group-hover:text-gold-300 transition-colors">
                      {player.name}
                    </h2>
                  </div>
                  <span className="text-stone-600 font-display text-6xl font-bold opacity-30 hidden lg:block">
                    0{index + 1}
                  </span>
                </div>

                <p className="text-stone-400 font-body leading-relaxed mb-6 max-w-2xl">
                  {player.bio}
                </p>

                {/* Key achievements */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {player.achievements.slice(0, 2).map((a) => (
                    <span key={a} className="text-xs font-body text-gold-500 bg-gold-500/10 border border-gold-500/20 px-3 py-1">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-gold-500 text-sm font-body tracking-wide">
                  Read full biography <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
