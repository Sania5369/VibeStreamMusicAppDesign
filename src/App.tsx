import { useState } from 'react'
import OnboardingScreen from './screens/OnboardingScreen'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'

export type Screen = 'onboarding' | 'auth' | 'home'
export type AuthMode = 'signup' | 'login'

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const [authMode, setAuthMode] = useState<AuthMode>('signup')

  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#08090e',
      }}
    >
      <div
        style={{
          width: '390px',
          minHeight: '844px',
          background: 'var(--background)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '40px',
          boxShadow: '0 0 60px rgba(232,131,106,0.12), 0 0 120px rgba(245,168,78,0.07), 0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        {screen === 'onboarding' && (
          <OnboardingScreen
            onGetStarted={() => { setAuthMode('signup'); setScreen('auth') }}
            onLogin={() => { setAuthMode('login'); setScreen('auth') }}
          />
        )}
        {screen === 'auth' && (
          <AuthScreen
            mode={authMode}
            onToggleMode={(m) => setAuthMode(m)}
            onSuccess={() => setScreen('home')}
            onBack={() => setScreen('onboarding')}
          />
        )}
        {screen === 'home' && (
          <HomeScreen onLogout={() => setScreen('onboarding')} />
        )}
      </div>
    </div>
  )
}
