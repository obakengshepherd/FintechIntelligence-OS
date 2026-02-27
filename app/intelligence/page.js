import PostGrid from '@/components/PostGrid';
import Link from 'next/link';

export const metadata = {
  title: 'Intelligence Reports',
  description: 'All fintech intelligence reports, system breakdowns, and strategic analysis.',
};

async function getPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

const CATEGORY_STATS = [
  { key: 'Infrastructure Breakdown', icon: '⬡', color: '#00d4ff' },
  { key: 'System Architecture',      icon: '◈', color: '#00ff88' },
  { key: 'Industry Intelligence',    icon: '◉', color: '#f0c040' },
  { key: 'Engineering Strategy',     icon: '▲', color: '#ff6b35' },
  { key: 'Intelligence Tracking',    icon: '◆', color: '#b48eff' },
];

export default async function IntelligencePage() {
  const posts = await getPosts();

  const published = posts.filter((p) => p.status === 'published');
  const featured  = posts.filter((p) => p.featured);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px' }}>
      {/* Page header */}
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
          INTELLIGENCE OPERATIONS CENTER
        </div>
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 40px)',
            color: '#c9d8e8',
            marginBottom: 12,
          }}
        >
          Intelligence Reports
        </h1>
        <p style={{ fontSize: 15, color: '#6b8299', maxWidth: 520 }}>
          System breakdowns, infrastructure analysis, and strategic intelligence on the
          global fintech ecosystem.
        </p>
      </div>

      {/* Stats cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 48,
        }}
      >
        {CATEGORY_STATS.map((cat) => {
          const count = posts.filter((p) => p.category === cat.key).length;
          return (
            <div
              key={cat.key}
              style={{
                background: '#0d1117',
                border: '1px solid #1e2d40',
                borderRadius: 8,
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 20,
                  color: cat.color,
                  marginBottom: 8,
                }}
              >
                {cat.icon}
              </div>
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: 24,
                  color: '#c9d8e8',
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {count}
              </div>
              <div
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 9,
                  color: '#3d5266',
                  letterSpacing: '1px',
                }}
              >
                {cat.key.toUpperCase().slice(0, 16)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              color: '#f0c040',
              letterSpacing: '3px',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            ★ FEATURED REPORT
          </div>
          <Link
            href={`/posts/${featured[0].slug || featured[0]._id}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                background: '#0d1117',
                border: '1px solid rgba(240,192,64,0.2)',
                borderRadius: 8,
                padding: '28px 28px',
                transition: 'border-color 0.2s',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#c9d8e8',
                  marginBottom: 10,
                }}
              >
                {featured[0].title}
              </h2>
              {featured[0].excerpt && (
                <p style={{ fontSize: 14, color: '#6b8299' }}>{featured[0].excerpt}</p>
              )}
            </div>
          </Link>
        </div>
      )}

      {/* All posts */}
      <PostGrid initialPosts={posts} />
    </div>
  );
}
