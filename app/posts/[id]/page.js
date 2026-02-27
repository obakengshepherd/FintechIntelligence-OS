import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPost(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

const CATEGORY_COLORS = {
  'Infrastructure Breakdown': '#00d4ff',
  'System Architecture':      '#00ff88',
  'Industry Intelligence':    '#f0c040',
  'Engineering Strategy':     '#ff6b35',
  'Intelligence Tracking':    '#b48eff',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  const accentColor = CATEGORY_COLORS[post.category] || '#00d4ff';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Back link */}
      <Link
        href="/"
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 11,
          color: '#3d5266',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 40,
          transition: 'color 0.2s',
        }}
      >
        ← BACK TO FEED
      </Link>

      {/* Cover image */}
      {post.coverImage && (
        <div
          style={{
            width: '100%',
            height: 320,
            background: `url(${post.coverImage}) center/cover no-repeat`,
            borderRadius: 8,
            border: '1px solid #1e2d40',
            marginBottom: 40,
          }}
        />
      )}

      {/* Category + meta */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            padding: '3px 10px',
            borderRadius: 4,
            border: `1px solid ${accentColor}44`,
            color: accentColor,
            background: `${accentColor}11`,
            letterSpacing: '1px',
          }}
        >
          {post.category?.toUpperCase()}
        </span>
        {post.sector && post.sector !== 'General' && (
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 10,
              padding: '3px 10px',
              borderRadius: 4,
              border: '1px solid #1e2d40',
              color: '#3d5266',
              letterSpacing: '1px',
            }}
          >
            {post.sector.toUpperCase()}
          </span>
        )}
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(24px, 4vw, 40px)',
          color: '#c9d8e8',
          lineHeight: 1.1,
          marginBottom: 20,
        }}
      >
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p
          style={{
            fontSize: 17,
            color: '#6b8299',
            lineHeight: 1.7,
            borderLeft: `3px solid ${accentColor}`,
            paddingLeft: 16,
            marginBottom: 32,
            fontStyle: 'italic',
          }}
        >
          {post.excerpt}
        </p>
      )}

      {/* Meta bar */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          fontFamily: 'Space Mono, monospace',
          fontSize: 10,
          color: '#3d5266',
          borderTop: '1px solid #1e2d40',
          borderBottom: '1px solid #1e2d40',
          padding: '14px 0',
          marginBottom: 40,
          flexWrap: 'wrap',
        }}
      >
        <span>OBAKENG INTELLIGENCE</span>
        <span>·</span>
        <span>{formatDate(post.createdAt)}</span>
        <span>·</span>
        <span>{post.readTime || 5} MIN READ</span>
        {post.region && (
          <>
            <span>·</span>
            <span>📍 {post.region}</span>
          </>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          fontSize: 16,
          lineHeight: 1.8,
          color: '#a0b4c8',
          whiteSpace: 'pre-wrap',
        }}
        // If you switch to a rich text editor later, replace this with dangerouslySetInnerHTML
      >
        {post.body}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid #1e2d40',
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              color: '#3d5266',
              letterSpacing: '2px',
              marginRight: 4,
              alignSelf: 'center',
            }}
          >
            TAGS:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                padding: '3px 9px',
                borderRadius: 4,
                border: '1px solid #1e2d40',
                color: '#3d5266',
                letterSpacing: '0.5px',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Edit link */}
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #1e2d40' }}>
        <Link
          href={`/edit-post/${post._id}`}
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            color: '#3d5266',
            textDecoration: 'none',
            border: '1px solid #1e2d40',
            padding: '6px 14px',
            borderRadius: 4,
            transition: 'all 0.2s',
          }}
        >
          EDIT THIS POST
        </Link>
      </div>
    </div>
  );
}
