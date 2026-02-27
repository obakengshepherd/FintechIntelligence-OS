import Hero from '@/components/Hero';
import PostGrid from '@/components/PostGrid';

// Fetch posts server-side for SEO
async function getPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts`, {
      next: { revalidate: 60 }, // ISR — revalidate every 60 seconds
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      <Hero />

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
            paddingBottom: 16,
            borderBottom: '1px solid #1e2d40',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 9,
                color: '#3d5266',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              Intelligence Feed
            </div>
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 22,
                color: '#c9d8e8',
              }}
            >
              Latest Reports
            </h2>
          </div>

          <div
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 10,
              color: '#3d5266',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#00ff88',
                boxShadow: '0 0 6px #00ff88',
              }}
            />
            {posts.length} PUBLISHED
          </div>
        </div>

        <PostGrid initialPosts={posts} />
      </section>
    </>
  );
}
