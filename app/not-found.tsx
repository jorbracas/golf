import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center">
        <p className="font-display text-8xl font-bold text-gold-500/20 mb-4">404</p>
        <h1 className="display-heading text-3xl text-stone-100 mb-4">Out of Bounds</h1>
        <div className="divider-gold mx-auto" />
        <p className="text-stone-400 font-body mt-6 mb-8 max-w-sm mx-auto">
          This page has gone the way of a wayward drive — nowhere to be found. Let's get you back on the fairway.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-gold">Back to Home</Link>
          <Link href="/players" className="btn-outline">Our Players</Link>
        </div>
      </div>
    </div>
  )
}
