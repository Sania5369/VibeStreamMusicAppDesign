import { useState } from 'react'
import type { AuthMode } from '../App'

interface Props {
  mode: AuthMode
  onToggleMode: (m: AuthMode) => void
  onSuccess: () => void
  onBack: () => void
}

const GRAD = 'linear-gradient(135deg, #e8836a 0%, #f5a84e 100%)'

export default function AuthScreen({ mode, onToggleMode, onSuccess, onBack }: Props) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focused, setFocused] = useState('')

  const isSignup = mode === 'signup'

  function validate() {
    const e: Record<string, string> = {}
    if (isSignup && !form.name.trim()) e.name = 'Full name is required'
    if (loginMethod === 'email') {
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email'
      if (!form.password || form.password.length < 6) e.password = 'Minimum 6 characters'
      if (isSignup && form.confirm !== form.password) e.confirm = 'Passwords do not match'
    } else {
      if (!form.phone.match(/^\+?[\d\s\-]{8,}/)) e.phone = 'Enter a valid number'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (loginMethod === 'phone' && !showOtp) {
      if (validate()) setShowOtp(true)
      return
    }
    if (validate()) onSuccess()
  }

  function handleOtpChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 3) {
      document.getElementById(`otp-${i + 1}`)?.focus()
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '15px 18px',
    borderRadius: '14px',
    border: '1.5px solid',
    background: 'rgba(23,25,35,0.7)',
    color: '#f0ece4',
    fontSize: '15px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  }

  function inputStyle(field: string): React.CSSProperties {
    return {
      ...inputBase,
      borderColor: errors[field]
        ? '#e07070'
        : focused === field
        ? '#e8836a'
        : 'rgba(232,131,106,0.18)',
      background: focused === field ? 'rgba(30,26,22,0.9)' : 'rgba(23,25,35,0.6)',
    }
  }

  return (
    <div style={{ height: '844px', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Soft ambient glows */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,168,78,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '80px', left: '-100px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,131,106,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ padding: '54px 24px 0', position: 'relative', zIndex: 2 }}>
        <button
          onClick={onBack}
          style={{ background: 'rgba(232,131,106,0.08)', border: '1px solid rgba(232,131,106,0.2)', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8a07a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(232,131,106,0.3)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <ellipse cx="8.5" cy="18.5" rx="3.9" ry="2.7" transform="rotate(-16 8.5 18.5)" fill="white" />
              <path d="M12.2 17 C15.2 12.5 9.4 10 12.2 5.2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#f0ece4', letterSpacing: '-0.5px' }}>VibeStream</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 700, color: '#f0ece4', margin: '0 0 6px', letterSpacing: '-0.6px', lineHeight: 1.15 }}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h2>
        <p style={{ fontSize: '15px', color: '#7a7060', margin: '0 0 24px' }}>
          {isSignup ? 'Start streaming in seconds.' : 'Sign in to continue listening.'}
        </p>

        {/* Mode tabs */}
        <div style={{ display: 'flex', background: 'rgba(23,25,35,0.8)', borderRadius: '14px', padding: '4px', marginBottom: '24px', border: '1px solid rgba(232,131,106,0.12)' }}>
          {(['signup', 'login'] as const).map(m => (
            <button
              key={m}
              onClick={() => { onToggleMode(m); setErrors({}); setShowOtp(false) }}
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '10px',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                background: mode === m ? GRAD : 'transparent',
                color: mode === m ? '#fff' : '#7a7060',
              }}
            >
              {m === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 40px', position: 'relative', zIndex: 2 }} className="scrollbar-hide">

        {!isSignup && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {(['email', 'phone'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setLoginMethod(m); setErrors({}); setShowOtp(false) }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  border: `1.5px solid ${loginMethod === m ? '#e8836a' : 'rgba(232,131,106,0.15)'}`,
                  background: loginMethod === m ? 'rgba(232,131,106,0.1)' : 'transparent',
                  color: loginMethod === m ? '#e8836a' : '#7a7060',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {m === 'email' ? '✉ Email' : '📱 Mobile'}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isSignup && (
            <Field label="Full Name" error={errors.name}>
              <input type="text" placeholder="Alex Rivera" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} style={inputStyle('name')} />
            </Field>
          )}

          {loginMethod === 'email' ? (
            <>
              <Field label="Email Address" error={errors.email}>
                <input type="email" placeholder="alex@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} style={inputStyle('email')} />
              </Field>
              <Field label="Password" error={errors.password}>
                <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} onFocus={() => setFocused('password')} onBlur={() => setFocused('')} style={inputStyle('password')} />
              </Field>
              {isSignup && (
                <Field label="Confirm Password" error={errors.confirm}>
                  <input type="password" placeholder="••••••••" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} onFocus={() => setFocused('confirm')} onBlur={() => setFocused('')} style={inputStyle('confirm')} />
                </Field>
              )}
            </>
          ) : (
            <>
              <Field label="Mobile Number" error={errors.phone}>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} style={inputStyle('phone')} />
              </Field>
              {showOtp && (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#7a7060', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Enter OTP</label>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    {otp.map((digit, i) => (
                      <input
                        key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        style={{ width: '64px', height: '64px', textAlign: 'center', fontSize: '24px', fontWeight: 700, borderRadius: '14px', border: `2px solid ${digit ? '#e8836a' : 'rgba(232,131,106,0.2)'}`, background: 'rgba(23,25,35,0.8)', color: '#f0ece4', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s' }}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: '13px', color: '#7a7060', textAlign: 'center', marginTop: '12px' }}>
                    Sent to {form.phone} ·{' '}
                    <button onClick={() => setShowOtp(false)} style={{ background: 'none', border: 'none', color: '#e8836a', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', padding: 0 }}>Resend</button>
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(232,131,106,0.12)' }} />
          <span style={{ fontSize: '12px', color: '#5a5040', fontWeight: 500 }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(232,131,106,0.12)' }} />
        </div>

        {/* Social */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
          {([
            {
              label: 'Google',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              ),
            },
            {
              label: 'Apple',
              icon: (
                <svg width="17" height="20" viewBox="0 0 814 1000" fill="#f0ece4">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.3 135.3-317 268.1-317 70.1 0 128.4 46.4 172.5 46.4 42.2 0 108.5-49 191.4-49 30.8 0 111.2 2.6 168.6 79.7zm-126.7-86.1c-20.1-23.7-51.6-41.8-83-41.8-33.8 0-68.3 20.1-91.7 44.4-21.4 22.4-38.3 55.5-38.3 90.2 0 4.5.6 9 1.3 12.5 2.6.3 6.4.6 10.3.6 30.8 0 65.4-19.5 87.5-43.2 22.4-24.3 39-57.1 13.9-62.7z"/>
                </svg>
              ),
            },
            {
              label: 'Facebook',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              ),
            },
          ] as const).map(s => (
            <button
              key={s.label}
              onClick={onSuccess}
              style={{ flex: 1, padding: '13px 8px', borderRadius: '14px', border: '1.5px solid rgba(232,131,106,0.15)', background: 'rgba(23,25,35,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,131,106,0.4)'; e.currentTarget.style.background = 'rgba(30,26,22,0.8)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,131,106,0.15)'; e.currentTarget.style.background = 'rgba(23,25,35,0.6)' }}
            >
              {s.icon}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          style={{ width: '100%', padding: '18px', borderRadius: '100px', border: 'none', background: GRAD, color: '#fff', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', boxShadow: '0 8px 28px rgba(232,131,106,0.3)', transition: 'opacity 0.15s, transform 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(0.99)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          {isSignup ? 'Create Account' : loginMethod === 'phone' && !showOtp ? 'Send OTP' : 'Sign In'}
        </button>

        {!isSignup && (
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#7a7060' }}>
            Forgot password?{' '}
            <button style={{ background: 'none', border: 'none', color: '#e8836a', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, padding: 0 }}>Reset it</button>
          </p>
        )}

        {isSignup && (
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#3a3428', lineHeight: 1.6 }}>
            By creating an account you agree to our{' '}
            <span style={{ color: '#7a7060' }}>Terms of Service</span> and{' '}
            <span style={{ color: '#7a7060' }}>Privacy Policy</span>.
          </p>
        )}
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: '12px', fontWeight: 600, color: '#7a7060', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
        {label}
      </label>
      {children}
      {error && <p style={{ fontSize: '12px', color: '#e07070', marginTop: '6px', marginBottom: 0 }}>{error}</p>}
    </div>
  )
}
