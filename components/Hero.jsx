import Link from 'next/link';

const STAGES = [
  { n: '01', label: 'Intelligence Publisher' },
  { n: '02', label: 'Systems Analyst' },
  { n: '03', label: 'Infrastructure Specialist' },
  { n: '04', label: 'Intelligence Consultant' },
  { n: '05', label: 'Systems Architect', active: true },
];

export default function Hero() {
  return (
    <section
      style={{
        padding: '72px 24px 56px',
        maxWidth: 1200,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Top label */}
      <div
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 10,
          color: '#3d5266',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#00ff88',
            boxShadow: '0 0 8px #00ff88',
            animation: 'pulse 2s ease infinite',
          }}
        />
        LIVE INTELLIGENCE FEED — JOHANNESBURG
      </div>

      {/* Main heading */}
      <h1
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 60px)',
          lineHeight: 1.05,
          marginBottom: 20,
          maxWidth: 720,
        }}
      >
        <span style={{ color: '#c9d8e8' }}>FINTECH</span>
        <br />
        <span
          style={{
            color: '#00d4ff',
            textShadow: '0 0 40px rgba(0,212,255,0.3)',
          }}
        >
          INTELLIGENCE OS
        </span>
      </h1>

      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 16,
          color: '#6b8299',
          maxWidth: 560,
          lineHeight: 1.7,
          marginBottom: 40,
        }}
      >
        Not a blog. An intelligence infrastructure. Strategic analysis of fintech
        systems, payment architecture, and the engineering layers powering modern
        finance — globally and in Africa.
      </p>

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 64 }}>
        <Link
          href="/intelligence"
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 12,
            padding: '10px 20px',
            borderRadius: 6,
            border: '1px solid #00d4ff',
            color: '#00d4ff',
            background: 'rgba(0,212,255,0.1)',
            textDecoration: 'none',
            transition: 'all 0.2s',
            letterSpacing: '0.5px',
          }}
        >
          VIEW INTELLIGENCE REPORTS →
        </Link>
        <Link
          href="/categories"
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 12,
            padding: '10px 20px',
            borderRadius: 6,
            border: '1px solid #1e2d40',
            color: '#6b8299',
            background: 'transparent',
            textDecoration: 'none',
            transition: 'all 0.2s',
            letterSpacing: '0.5px',
          }}
        >
          BROWSE CATEGORIES
        </Link>
      </div>

      {/* Authority stage ladder */}
      <div>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Authority Stage Ladder
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {STAGES.map((s) => (
            <div
              key={s.n}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                padding: '5px 12px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: s.active ? 'rgba(0,255,136,0.4)' : '#1e2d40',
                color: s.active ? '#00ff88' : '#3d5266',
                background: s.active ? 'rgba(0,255,136,0.05)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ opacity: 0.5 }}>{s.n}</span>
              {s.label}
              {s.active && (
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#00ff88',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
