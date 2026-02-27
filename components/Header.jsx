'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Feed' },
  { href: '/intelligence', label: 'Intelligence' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        background: 'linear-gradient(180deg, #0a1520 0%, transparent 100%)',
        borderBottom: '1px solid #1e2d40',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 18,
            color: '#00d4ff',
            letterSpacing: '-0.5px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          OBAKENG<span style={{ color: '#00ff88' }}>INTELLIGENCE</span>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              color: '#3d5266',
              display: 'block',
              letterSpacing: '2px',
              fontWeight: 400,
              marginTop: -2,
            }}
          >
            FINTECH SYSTEMS ANALYSIS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 11,
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid',
                borderColor: pathname === link.href ? '#00d4ff' : 'transparent',
                color: pathname === link.href ? '#00d4ff' : '#6b8299',
                background:
                  pathname === link.href ? 'rgba(0,212,255,0.08)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
                letterSpacing: '0.5px',
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/create-post"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 11,
              padding: '6px 14px',
              borderRadius: 6,
              border: '1px solid #00d4ff',
              color: '#00d4ff',
              background: 'rgba(0,212,255,0.1)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              marginLeft: 8,
              letterSpacing: '0.5px',
            }}
          >
            + NEW POST
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid #1e2d40',
            color: '#6b8299',
            padding: '6px 10px',
            borderRadius: 6,
            cursor: 'pointer',
            fontFamily: 'Space Mono, monospace',
            fontSize: 12,
          }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid #1e2d40',
            padding: '12px 0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 12,
                padding: '8px 12px',
                color: pathname === link.href ? '#00d4ff' : '#6b8299',
                textDecoration: 'none',
                borderRadius: 6,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/create-post"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 12,
              padding: '8px 12px',
              color: '#00d4ff',
              textDecoration: 'none',
            }}
          >
            + NEW POST
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
