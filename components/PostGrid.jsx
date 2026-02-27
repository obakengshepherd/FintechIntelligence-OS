'use client';
import { useState, useEffect } from 'react';
import PostCard from './PostCard';

const CATEGORIES = [
  'All',
  'Infrastructure Breakdown',
  'System Architecture',
  'Industry Intelligence',
  'Engineering Strategy',
  'Intelligence Tracking',
];

const SECTORS = ['All', 'Fintech', 'Insurtech', 'Wealthtech', 'Banktech'];

export default function PostGrid({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [filtered, setFiltered] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSector, setActiveSector] = useState('All');
  const [loading, setLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetch('/api/posts')
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            setPosts(data.data);
            setFiltered(data.data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    let result = [...posts];
    if (activeCategory !== 'All') result = result.filter((p) => p.category === activeCategory);
    if (activeSector !== 'All') result = result.filter((p) => p.sector === activeSector);
    setFiltered(result);
  }, [activeCategory, activeSector, posts]);

  return (
    <div>
      {/* Filters */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Filter by Category
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                padding: '5px 12px',
                borderRadius: 4,
                border: '1px solid',
                borderColor: activeCategory === cat ? '#00d4ff' : '#1e2d40',
                color: activeCategory === cat ? '#00d4ff' : '#3d5266',
                background: activeCategory === cat ? 'rgba(0,212,255,0.08)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s',
                letterSpacing: '0.5px',
              }}
            >
              {cat === 'All' ? 'ALL' : cat.toUpperCase().slice(0, 12)}
            </button>
          ))}
        </div>

        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Filter by Sector
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SECTORS.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSector(sec)}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                padding: '5px 12px',
                borderRadius: 4,
                border: '1px solid',
                borderColor: activeSector === sec ? '#00ff88' : '#1e2d40',
                color: activeSector === sec ? '#00ff88' : '#3d5266',
                background: activeSector === sec ? 'rgba(0,255,136,0.06)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s',
                letterSpacing: '0.5px',
              }}
            >
              {sec.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 10,
          color: '#3d5266',
          marginBottom: 24,
          letterSpacing: '1px',
        }}
      >
        {loading ? 'LOADING...' : `${filtered.length} INTELLIGENCE REPORTS`}
      </div>

      {/* Grid */}
      {loading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                height: 280,
                background: '#0d1117',
                border: '1px solid #1e2d40',
                borderRadius: 8,
                animation: 'pulse 1.5s ease infinite',
              }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '64px 24px',
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            color: '#3d5266',
            letterSpacing: '1px',
          }}
        >
          NO INTELLIGENCE REPORTS FOUND.
          <br />
          <span style={{ color: '#1e2d40', display: 'block', marginTop: 8 }}>
            Adjust filters or publish your first report.
          </span>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {filtered.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
