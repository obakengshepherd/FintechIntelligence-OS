import './globals.css';
import Header from '@/components/Header';
import Preloader from '@/components/Preloader';

export const metadata = {
  title: {
    default: 'Fintech Intelligence OS | Obakeng Intelligence',
    template: '%s | Fintech Intelligence OS',
  },
  description:
    'Fintech Systems Analysis & Engineering — Intelligence Reports, Infrastructure Breakdowns, and Strategic Observations on the global fintech ecosystem.',
  keywords: [
    'fintech',
    'insurtech',
    'wealthtech',
    'banktech',
    'fintech intelligence',
    'fintech analysis',
    'financial technology',
    'South Africa fintech',
    'payment infrastructure',
    'digital banking',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Fintech Intelligence OS',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <div id="app" style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          <main>{children}</main>
          <footer
            style={{
              borderTop: '1px solid #1e2d40',
              padding: '32px 24px',
              marginTop: '80px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                color: '#3d5266',
                letterSpacing: '1px',
              }}
            >
              © {new Date().getFullYear()} OBAKENG INTELLIGENCE —{' '}
              <span style={{ color: '#00d4ff' }}>
                FINTECH SYSTEMS ANALYSIS & ENGINEERING
              </span>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
