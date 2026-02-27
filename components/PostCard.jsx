import Link from 'next/link';

const CATEGORY_STYLES = {
  'Infrastructure Breakdown': { label: 'INFRA', class: 'badge-infra' },
  'System Architecture':      { label: 'ARCH', class: 'badge-arch' },
  'Industry Intelligence':    { label: 'INTEL', class: 'badge-intel' },
  'Engineering Strategy':     { label: 'STRATEGY', class: 'badge-strategy' },
  'Intelligence Tracking':    { label: 'TRACKING', class: 'badge-tracking' },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function PostCard({ post }) {
  const cat = CATEGORY_STYLES[post.category] || { label: post.category, class: 'badge-infra' };
  const href = `/posts/${post.slug || post._id}`;

  return (
    <article
      style={{
        background: '#0d1117',
        border: '1px solid #1e2d40',
        borderRadius: 8,
        overflow: 'hidden',
        transition: 'border-color 0.2s, transform 0.2s',
        position: 'relative',
      }}
      className="post-card"
    >
      {/* Featured indicator */}
      {post.featured && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            padding: '2px 7px',
            borderRadius: 3,
            border: '1px solid rgba(240,192,64,0.4)',
            color: '#f0c040',
            background: 'rgba(240,192,64,0.07)',
            letterSpacing: '1px',
            zIndex: 2,
          }}
        >
          ★ FEATURED
        </div>
      )}

      {/* Cover image */}
      {post.coverImage && (
        <div
          style={{
            width: '100%',
            height: 180,
            background: `url(${post.coverImage}) center/cover no-repeat`,
            borderBottom: '1px solid #1e2d40',
          }}
        />
      )}

      {/* No image placeholder */}
      {!post.coverImage && (
        <div
          style={{
            width: '100%',
            height: 120,
            background: 'linear-gradient(135deg, #0d1117 0%, #111820 100%)',
            borderBottom: '1px solid #1e2d40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              color: '#1e2d40',
              letterSpacing: '3px',
            }}
          >
            OBAKENG INTELLIGENCE
          </span>
        </div>
      )}

      <div style={{ padding: '20px 20px 24px' }}>
        {/* Category + sector badges */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          <span className={`badge ${cat.class}`}>{cat.label}</span>
          {post.sector && post.sector !== 'General' && (
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 9,
                color: '#3d5266',
                border: '1px solid #1e2d40',
                borderRadius: 4,
                padding: '2px 7px',
                letterSpacing: '1px',
              }}
            >
              {post.sector.toUpperCase()}
            </span>
          )}
          {post.region && (
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 9,
                color: '#3d5266',
                border: '1px solid #1e2d40',
                borderRadius: 4,
                padding: '2px 7px',
                letterSpacing: '1px',
              }}
            >
              📍 {post.region}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={href} style={{ textDecoration: 'none' }}>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 18,
              color: '#c9d8e8',
              marginBottom: 10,
              lineHeight: 1.3,
              transition: 'color 0.2s',
            }}
            className="post-card-title"
          >
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            style={{
              fontSize: 13,
              color: '#6b8299',
              lineHeight: 1.6,
              marginBottom: 16,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #1e2d40',
            paddingTop: 14,
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'Space Mono, monospace',
              fontSize: 10,
              color: '#3d5266',
            }}
          >
            <span>{formatDate(post.createdAt)}</span>
            <span>·</span>
            <span>{post.readTime || 5} MIN READ</span>
            {post.views > 0 && (
              <>
                <span>·</span>
                <span>{post.views} VIEWS</span>
              </>
            )}
          </div>

          <Link
            href={href}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 10,
              color: '#00d4ff',
              textDecoration: 'none',
              letterSpacing: '0.5px',
              border: '1px solid rgba(0,212,255,0.25)',
              padding: '4px 10px',
              borderRadius: 4,
              transition: 'all 0.2s',
            }}
          >
            READ →
          </Link>
        </div>
      </div>

      <style>{`
        .post-card:hover {
          border-color: #243447;
          transform: translateY(-2px);
        }
        .post-card:hover .post-card-title {
          color: #00d4ff;
        }
      `}</style>
    </article>
  );
}
