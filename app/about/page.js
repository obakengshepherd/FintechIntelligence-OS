export const metadata = {
  title: 'About — Obakeng Intelligence',
  description: 'About Obakeng Intelligence — Fintech Systems Analysis & Engineering',
};

const PILLARS = [
  {
    n: '01',
    label: 'Infrastructure Breakdowns',
    description: 'Dissecting how payment systems, APIs, and financial infrastructure actually work under the hood.',
    color: '#00d4ff',
  },
  {
    n: '02',
    label: 'System Architecture Analysis',
    description: 'Engineering-level breakdowns of how modern financial technology platforms are designed.',
    color: '#00ff88',
  },
  {
    n: '03',
    label: 'Industry Intelligence Reports',
    description: 'Strategic intelligence on key players and market infrastructure in fintech ecosystems globally.',
    color: '#f0c040',
  },
  {
    n: '04',
    label: 'Engineering Strategy Posts',
    description: 'Personal perspectives on architecting and scaling financial technology systems.',
    color: '#ff6b35',
  },
  {
    n: '05',
    label: 'Intelligence Tracking Reports',
    description: 'Ongoing monitoring and documentation of fintech companies, platforms, and industry accounts.',
    color: '#b48eff',
  },
];

const STAGE_LADDER = [
  { n: '01', label: 'Fintech Intelligence Publisher', done: true },
  { n: '02', label: 'Fintech Systems Analyst', done: false },
  { n: '03', label: 'Fintech Infrastructure Specialist', done: false },
  { n: '04', label: 'Fintech Intelligence Consultant', done: false },
  { n: '05', label: 'Fintech Systems Architect', done: false },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '3px',
            marginBottom: 10,
          }}
        >
          AUTHORITY NODE
        </div>
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 5vw, 48px)',
            color: '#c9d8e8',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          OBAKENG<br />
          <span style={{ color: '#00d4ff' }}>INTELLIGENCE</span>
        </h1>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            color: '#6b8299',
            letterSpacing: '1px',
            marginBottom: 24,
          }}
        >
          FINTECH SYSTEMS ANALYSIS & ENGINEERING
        </div>
        <p style={{ fontSize: 16, color: '#6b8299', lineHeight: 1.8, maxWidth: 600 }}>
          This is not a blog. It is an intelligence infrastructure — built to demonstrate
          strategic thinking, systems-level analysis, and technical authority in the global
          fintech ecosystem, with a particular focus on Africa.
        </p>
      </div>

      {/* What this is */}
      <div
        style={{
          background: '#0d1117',
          border: '1px solid #1e2d40',
          borderRadius: 8,
          padding: '28px',
          marginBottom: 48,
        }}
      >
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '2px',
            marginBottom: 16,
          }}
        >
          POSITIONING STATEMENT
        </div>
        <p style={{ fontSize: 15, color: '#a0b4c8', lineHeight: 1.8, marginBottom: 16 }}>
          My media company exists to demonstrate strategic intelligence, systems thinking,
          industry monitoring, technical authority, and consulting readiness.
        </p>
        <p style={{ fontSize: 15, color: '#a0b4c8', lineHeight: 1.8 }}>
          The content here is positioned as Intelligence Reports, System Breakdowns,
          Infrastructure Analysis, Strategic Observations, and Technical Architecture
          Explanations — not entertainment.
        </p>
      </div>

      {/* Content pillars */}
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '2px',
            marginBottom: 20,
          }}
        >
          MEDIA PILLARS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PILLARS.map((p) => (
            <div
              key={p.n}
              style={{
                display: 'flex',
                gap: 16,
                padding: '16px',
                background: '#0d1117',
                border: '1px solid #1e2d40',
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 11,
                  color: p.color,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {p.n}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: 15,
                    color: '#c9d8e8',
                    marginBottom: 4,
                  }}
                >
                  {p.label}
                </div>
                <p style={{ fontSize: 13, color: '#6b8299', lineHeight: 1.6 }}>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Authority ladder */}
      <div>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '2px',
            marginBottom: 20,
          }}
        >
          AUTHORITY STAGE LADDER
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STAGE_LADDER.map((stage, i) => (
            <div
              key={stage.n}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 16px',
                background: i === 0 ? 'rgba(0,212,255,0.04)' : '#0d1117',
                border: '1px solid',
                borderColor: i === 0 ? 'rgba(0,212,255,0.2)' : '#1e2d40',
                borderRadius: i === 0 ? 8 : 0,
                borderTop: i !== 0 ? 'none' : undefined,
              }}
            >
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 10,
                  color: i === 0 ? '#00d4ff' : '#3d5266',
                  width: 24,
                  flexShrink: 0,
                }}
              >
                {stage.n}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: i === 0 ? '#c9d8e8' : '#3d5266',
                  fontFamily: i === 0 ? 'Syne, sans-serif' : 'DM Sans, sans-serif',
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {stage.label}
              </span>
              {i === 0 && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 9,
                    color: '#00d4ff',
                    border: '1px solid rgba(0,212,255,0.3)',
                    padding: '2px 8px',
                    borderRadius: 3,
                  }}
                >
                  CURRENT
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
