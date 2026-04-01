import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '4Sports Golf — Professional Golf Management & Insights'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d1f0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Gold accent top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#c9973a',
          }}
        />
        {/* Logo mark */}
        <div
          style={{
            width: 64,
            height: 64,
            background: '#c9973a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <span style={{ color: '#0d1f0d', fontSize: 24, fontWeight: 700 }}>4S</span>
        </div>
        {/* Title */}
        <div
          style={{
            color: '#f5f5f4',
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: '-1px',
            marginBottom: 16,
          }}
        >
          4Sports{' '}
          <span style={{ color: '#c9973a' }}>Golf</span>
        </div>
        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 2,
            background: '#c9973a',
            marginBottom: 24,
          }}
        />
        {/* Subtitle */}
        <div
          style={{
            color: '#a8a29e',
            fontSize: 28,
          }}
        >
          Professional Golf Management & Insights
        </div>
        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            color: '#57534e',
            fontSize: 18,
          }}
        >
          4sportsgolf.com
        </div>
      </div>
    ),
    { ...size },
  )
}
