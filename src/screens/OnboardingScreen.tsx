interface Props {
  onGetStarted: () => void
  onLogin: () => void
}

const CONCERT_IMAGE =
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=780&h=900&fit=crop&auto=format'

// Warm gradient: terracotta rose → amber
const GRAD = 'linear-gradient(135deg, #e8836a 0%, #f5a84e 100%)'

export default function OnboardingScreen({ onGetStarted, onLogin }: Props) {
  return (
    <div style={{ height: '844px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Hero image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={CONCERT_IMAGE}
          alt="Concert crowd with vivid lights"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Warm-toned overlay — less harsh than pure black */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(14,16,24,0.25) 0%, rgba(14,16,24,0.55) 38%, rgba(14,16,24,0.88) 62%, #0e1018 85%)',
          }}
        />
        {/* Warm amber glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '220px',
            left: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,168,78,0.2) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Soft rose glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '180px',
            right: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,131,106,0.18) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Status bar */}
      <div style={{ position: 'relative', zIndex: 10, padding: '14px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(240,236,228,0.9)' }}>9:41</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <SignalIcon /><WifiIcon /><BatteryIcon />
        </div>
      </div>

      {/* Logo */}
      <div style={{ position: 'relative', zIndex: 10, padding: '32px 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(232,131,106,0.35)' }}>
          <MusicNote />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
          VibeStream
        </span>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto', padding: '0 28px 52px' }}>
        {/* Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,168,78,0.12)', border: '1px solid rgba(245,168,78,0.28)', borderRadius: '100px', padding: '4px 14px 4px 8px', marginBottom: '20px' }}>
          <span style={{ fontSize: '13px' }}>♪</span>
          <span style={{ fontSize: '13px', color: '#f5c07a', fontWeight: 500, letterSpacing: '0.02em' }}>100M+ tracks</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '46px', lineHeight: '1.08', fontWeight: 700, color: '#f0ece4', margin: '0 0 16px', letterSpacing: '-1.5px' }}>
          Your Music,<br />
          <em style={{ fontStyle: 'italic', background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Your Vibe.
          </em>
        </h1>

        <p style={{ fontSize: '16px', color: 'rgba(200,184,162,0.8)', lineHeight: '1.6', margin: '0 0 36px', maxWidth: '280px' }}>
          Discover music that moves you — from chart-toppers to hidden gems.
        </p>

        <button
          onClick={onGetStarted}
          style={{ width: '100%', padding: '18px', borderRadius: '100px', border: 'none', background: GRAD, color: '#2a1508', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', letterSpacing: '0.01em', marginBottom: '14px', boxShadow: '0 4px 10px rgba(232,131,106,0.12)', transition: 'opacity 0.15s, transform 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(0.99)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          Get Started — It's Free
        </button>

        <button
          onClick={onLogin}
          style={{ width: '100%', padding: '17px', borderRadius: '100px', border: '1.5px solid rgba(232,131,106,0.3)', background: 'rgba(232,131,106,0.06)', color: '#c8b8a2', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', letterSpacing: '0.01em', transition: 'border-color 0.15s, background 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,131,106,0.55)'; e.currentTarget.style.background = 'rgba(232,131,106,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,131,106,0.3)'; e.currentTarget.style.background = 'rgba(232,131,106,0.06)' }}
        >
          I already have an account
        </button>
      </div>
    </div>
  )
}

function MusicNote() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {/* Note head — slightly tilted */}
      <ellipse cx="8.5" cy="18.5" rx="3.9" ry="2.7" transform="rotate(-16 8.5 18.5)" fill="white" />
      {/* Stem as a flowing S-curve */}
      <path d="M12.2 17 C15.2 12.5 9.4 10 12.2 5.2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="rgba(240,236,228,0.85)">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="4.5" y="5" width="3" height="7" rx="1" />
      <rect x="9" y="2" width="3" height="10" rx="1" />
      <rect x="13.5" y="0" width="3" height="12" rx="1" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 24 18" fill="none" stroke="rgba(240,236,228,0.85)" strokeWidth="2.5" strokeLinecap="round">
      <path d="M1 6C5.4 1.8 10.4 0 12 0s6.6 1.8 11 6" />
      <path d="M4 10c2.2-2.2 5-3.5 8-3.5s5.8 1.3 8 3.5" />
      <path d="M7.5 14c1.2-1.2 2.8-2 4.5-2s3.3.8 4.5 2" />
      <circle cx="12" cy="18" r="1.5" fill="rgba(240,236,228,0.85)" stroke="none" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="rgba(240,236,228,0.45)" />
      <rect x="2" y="2" width="16" height="8" rx="2" fill="rgba(240,236,228,0.85)" />
      <path d="M23 4v4a2 2 0 000-4z" fill="rgba(240,236,228,0.45)" />
    </svg>
  )
}
