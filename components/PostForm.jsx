'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  'Infrastructure Breakdown',
  'System Architecture',
  'Industry Intelligence',
  'Engineering Strategy',
  'Intelligence Tracking',
];

const SECTORS = ['General', 'Fintech', 'Insurtech', 'Wealthtech', 'Banktech'];

const inputStyle = {
  width: '100%',
  background: '#111820',
  border: '1px solid #1e2d40',
  borderRadius: 6,
  color: '#c9d8e8',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: 14,
  padding: '10px 14px',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  fontFamily: 'Space Mono, monospace',
  fontSize: 10,
  color: '#3d5266',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: 8,
  display: 'block',
};

export default function PostForm({ initialData = {}, mode = 'create' }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData.title || '',
    excerpt: initialData.excerpt || '',
    body: initialData.body || '',
    coverImage: initialData.coverImage || '',
    category: initialData.category || CATEGORIES[0],
    sector: initialData.sector || 'General',
    region: initialData.region || '',
    tags: initialData.tags?.join(', ') || '',
    status: initialData.status || 'draft',
    featured: initialData.featured || false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const payload = {
      ...form,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const url =
        mode === 'edit' ? `/api/posts/${initialData._id}` : '/api/posts';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      router.push(
        mode === 'edit'
          ? `/posts/${data.data.slug || data.data._id}`
          : '/intelligence'
      );
      router.refresh();
    } catch (err) {
      setError('Network error. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post permanently?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${initialData._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 9,
            color: '#3d5266',
            letterSpacing: '3px',
            marginBottom: 6,
          }}
        >
          {mode === 'create' ? 'NEW INTELLIGENCE REPORT' : 'EDIT INTELLIGENCE REPORT'}
        </div>
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 28,
            color: '#c9d8e8',
          }}
        >
          {mode === 'create' ? 'Publish a Report' : 'Edit Report'}
        </h1>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(255,68,68,0.08)',
            border: '1px solid rgba(255,68,68,0.3)',
            color: '#ff6b6b',
            borderRadius: 6,
            padding: '12px 16px',
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}

      {/* Form fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Title */}
        <div>
          <label style={labelStyle}>Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. How Stripe's payment infrastructure actually works"
            style={inputStyle}
          />
        </div>

        {/* Excerpt */}
        <div>
          <label style={labelStyle}>Excerpt / Summary</label>
          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="A 1–2 sentence summary shown on the feed card"
            style={inputStyle}
          />
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              color: '#3d5266',
              display: 'block',
              marginTop: 4,
            }}
          >
            {form.excerpt.length}/280
          </span>
        </div>

        {/* Category + Sector row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Sector</label>
            <select name="sector" value={form.sector} onChange={handleChange} style={inputStyle}>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Region */}
        <div>
          <label style={labelStyle}>Region / Country Focus</label>
          <input
            name="region"
            value={form.region}
            onChange={handleChange}
            placeholder="e.g. South Africa, Sub-Saharan Africa, Global"
            style={inputStyle}
          />
        </div>

        {/* Cover image URL */}
        <div>
          <label style={labelStyle}>Cover Image URL</label>
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            style={inputStyle}
          />
        </div>

        {/* Tags */}
        <div>
          <label style={labelStyle}>Tags (comma-separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="stripe, payment rails, api, south africa"
            style={inputStyle}
          />
        </div>

        {/* Body */}
        <div>
          <label style={labelStyle}>Body Content *</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Write your intelligence report here..."
            rows={16}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
          />
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              color: '#3d5266',
              display: 'block',
              marginTop: 4,
            }}
          >
            {form.body.split(/\s+/).filter(Boolean).length} words · ~
            {Math.max(1, Math.ceil(form.body.split(/\s+/).filter(Boolean).length / 200))} min read
          </span>
        </div>

        {/* Status + Featured */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} style={{ ...inputStyle, width: 'auto' }}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24 }}>
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={form.featured}
              onChange={handleChange}
              style={{ accentColor: '#f0c040', width: 14, height: 14 }}
            />
            <label
              htmlFor="featured"
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                color: '#3d5266',
                letterSpacing: '1px',
                cursor: 'pointer',
              }}
            >
              MARK AS FEATURED
            </label>
          </div>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            paddingTop: 8,
            borderTop: '1px solid #1e2d40',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 11,
              padding: '10px 24px',
              borderRadius: 6,
              border: '1px solid #00d4ff',
              color: '#00d4ff',
              background: 'rgba(0,212,255,0.1)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              letterSpacing: '0.5px',
              transition: 'all 0.2s',
            }}
          >
            {loading
              ? 'SAVING...'
              : mode === 'create'
              ? '+ PUBLISH REPORT'
              : '✓ SAVE CHANGES'}
          </button>

          {mode === 'edit' && (
            <button
              onClick={handleDelete}
              disabled={loading}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 11,
                padding: '10px 20px',
                borderRadius: 6,
                border: '1px solid rgba(255,68,68,0.3)',
                color: '#ff6b6b',
                background: 'rgba(255,68,68,0.06)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                letterSpacing: '0.5px',
                transition: 'all 0.2s',
              }}
            >
              DELETE POST
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
