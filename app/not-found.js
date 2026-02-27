import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '100px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 64,
          color: '#1e2d40',
          marginBottom: 16,
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: 24,
          color: '#c9d8e8',
          marginBottom: 12,
        }}
      >
        Intelligence Signal Lost
      </h1>
      <p
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 11,
          color: '#3d5266',
          letterSpacing: '1px',
          marginBottom: 32,
        }}
      >
        THE REQUESTED INTELLIGENCE RESOURCE COULD NOT BE LOCATED.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 11,
          color: '#00d4ff',
          border: '1px solid rgba(0,212,255,0.3)',
          padding: '8px 20px',
          borderRadius: 6,
          textDecoration: 'none',
          transition: 'all 0.2s',
        }}
      >
        ← RETURN TO FEED
      </Link>
    </div>
  );
}
