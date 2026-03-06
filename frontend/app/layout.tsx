import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coupon Marketplace',
  description: 'Digital Coupon Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav style={navStyle}>
          <div style={navContainer}>
            <h1 style={titleStyle}>🎟️ Coupon Marketplace</h1>
            <div style={linksStyle}>
              <a href="/" style={linkStyle}>Customer Shop</a>
              <a href="/admin" style={linkStyle}>Admin Panel</a>
            </div>
          </div>
        </nav>
        <main style={mainStyle}>
          {children}
        </main>
      </body>
    </html>
  )
}

const navStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  padding: '1rem 0',
  marginBottom: '2rem',
};

const navContainer: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.5rem',
};

const linksStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
};

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  backgroundColor: '#333',
  borderRadius: '4px',
};

const mainStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
};
