import Link from 'next/link';

export const metadata = {
  title: 'Categories',
};

const CATEGORIES = [
  {
    title: 'Infrastructure Breakdown',
    slug: 'Infrastructure Breakdown',
    icon: '⬡',
    color: '#00d4ff',
    description:
      'Deep dives into the technical infrastructure powering fintech platforms — payment rails, API architecture, cloud systems.',
    example: '"How Stripe\'s payment infrastructure actually works"',
  },
  {
    title: 'System Architecture',
    slug: 'System Architecture',
    icon: '◈',
    color: '#00ff88',
    description:
      'Engineering-level analysis of how modern financial systems are designed and built from the ground up.',
    example: '"How modern digital wallets are engineered"',
  },
  {
    title: 'Industry Intelligence',
    slug: 'Industry Intelligence',
    icon: '◉',
    color: '#f0c040',
    description:
      'Strategic intelligence reports on key players, market dynamics, and infrastructure companies in the fintech ecosystem.',
    example: '"Top 5 fintech infrastructure companies in South Africa"',
  },
  {
    title: 'Engineering Strategy',
    slug: 'Engineering Strategy',
    icon: '▲',
    color: '#ff6b35',
    description:
      'Strategic perspectives on how to architect, scale, and engineer financial technology systems.',
    example: '"How I would architect a digital bank backend"',
  },
  {
    title: 'Intelligence Tracking',
    slug: 'Intelligence Tracking',
    icon: '◆',
    color: '#b48eff',
    description:
      'Ongoing intelligence tracking reports — companies, platforms, and accounts being monitored.',
    example: '"Fintech companies I am monitoring this week"',
  },
];

export default function CategoriesPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '3px',
            marginBottom: 8,
          }}
        >
          INTELLIGENCE TAXONOMY
        </div>
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 40px)',
            color: '#c9d8e8',
          }}
        >
          Content Categories
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {CATEGORIES.map((cat) => (
          <div
            key={cat.slug}
            style={{
              background: '#0d1117',
              border: '1px solid #1e2d40',
              borderRadius: 8,
              padding: '28px',
              display: 'grid',
              gridTemplateColumns: '60px 1fr auto',
              gap: 20,
              alignItems: 'center',
              transition: 'border-color 0.2s',
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 28,
                color: cat.color,
                textAlign: 'center',
              }}
            >
              {cat.icon}
            </div>

            {/* Info */}
            <div>
              <h2
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#c9d8e8',
                  marginBottom: 8,
                }}
              >
                {cat.title}
              </h2>
              <p style={{ fontSize: 13, color: '#6b8299', lineHeight: 1.6, marginBottom: 8 }}>
                {cat.description}
              </p>
              <p
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 10,
                  color: '#3d5266',
                  fontStyle: 'italic',
                }}
              >
                Example: {cat.example}
              </p>
            </div>

            {/* Link */}
            <Link
              href={`/intelligence?category=${encodeURIComponent(cat.slug)}`}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                color: cat.color,
                textDecoration: 'none',
                border: `1px solid ${cat.color}33`,
                padding: '6px 14px',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              VIEW →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
