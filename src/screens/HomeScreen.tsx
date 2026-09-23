import { useState } from 'react'


const GRAD = 'linear-gradient(135deg, #e8836a 0%, #f5a84e 100%)'
const GRAD_SOFT = 'linear-gradient(135deg, rgba(232,131,106,0.85) 0%, rgba(245,168,78,0.85) 100%)'

interface Props {
  onLogout: () => void
}

const FEATURED_IMAGE = 'https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?w=780&h=420&fit=crop&auto=format'

// Album art using thematic concert / performer images
const ALBUMS = [
  {
    id: 1,
    title: 'Aashiqui 2',
    artist: 'Arijit Singh',
    album: 'Aashiqui 2 OST',
    img: 'https://images.unsplash.com/photo-1653821355793-80142f9c5063?w=200&h=200&fit=crop&auto=format',
    duration: '52 min',
  },
  {
    id: 2,
    title: 'Bhang Da Ghut',
    artist: 'Honey Singh',
    album: 'International Villager',
    img: 'https://images.unsplash.com/photo-1786452156548-9a60189a9876?w=200&h=200&fit=crop&auto=format',
    duration: '44 min',
  },
  {
    id: 3,
    title: 'Paani Paani',
    artist: 'Badshah',
    album: 'Paani Paani',
    img: 'https://images.unsplash.com/photo-1742127211940-bc792aa36db3?w=200&h=200&fit=crop&auto=format',
    duration: '38 min',
  },
  {
    id: 4,
    title: 'Sheila Ki Jawani',
    artist: 'Sunidhi Chauhan',
    album: 'Tees Maar Khan OST',
    img: 'https://images.unsplash.com/photo-1595567582054-f2f0a1940235?w=200&h=200&fit=crop&auto=format',
    duration: '41 min',
  },
  {
    id: 5,
    title: 'Baarish',
    artist: 'Arijit Singh',
    album: 'Half Girlfriend OST',
    img: 'https://images.unsplash.com/photo-1735815007318-08f710df781c?w=200&h=200&fit=crop&auto=format',
    duration: '47 min',
  },
  {
    id: 6,
    title: 'Abhi Toh Party',
    artist: 'Badshah',
    album: 'Khoobsurat OST',
    img: 'https://images.unsplash.com/photo-1587437051578-a82aae398078?w=200&h=200&fit=crop&auto=format',
    duration: '36 min',
  },
]

const RECENT_TRACKS = [
  {
    id: 1,
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    album: 'Aashiqui 2',
    img: 'https://images.unsplash.com/photo-1653821355793-80142f9c5063?w=120&h=120&fit=crop&auto=format',
    duration: '4:22',
  },
  {
    id: 2,
    title: 'Loca',
    artist: 'Honey Singh',
    album: 'Loca',
    img: 'https://images.unsplash.com/photo-1786452156548-9a60189a9876?w=120&h=120&fit=crop&auto=format',
    duration: '3:18',
  },
  {
    id: 3,
    title: 'Kala Chashma',
    artist: 'Badshah',
    album: 'Baar Baar Dekho OST',
    img: 'https://images.unsplash.com/photo-1742127211940-bc792aa36db3?w=120&h=120&fit=crop&auto=format',
    duration: '3:47',
  },
  {
    id: 4,
    title: 'Dil Dhadakne Do',
    artist: 'Sunidhi Chauhan',
    album: 'Dil Dhadakne Do OST',
    img: 'https://images.unsplash.com/photo-1595567582054-f2f0a1940235?w=120&h=120&fit=crop&auto=format',
    duration: '5:03',
  },
  {
    id: 5,
    title: 'Channa Mereya',
    artist: 'Arijit Singh',
    album: 'Ae Dil Hai Mushkil OST',
    img: 'https://images.unsplash.com/photo-1735815007318-08f710df781c?w=120&h=120&fit=crop&auto=format',
    duration: '4:49',
  },
  {
    id: 6,
    title: 'Mercy',
    artist: 'Badshah',
    album: 'Mercy',
    img: 'https://images.unsplash.com/photo-1587437051578-a82aae398078?w=120&h=120&fit=crop&auto=format',
    duration: '3:22',
  },
]

const CATEGORIES = ['All', 'Bollywood', 'Hip-Hop', 'Romantic', 'Party', 'Sufi', 'Retro']

const LYRICS: Record<number, string[]> = {
  1: [
    'Hum tere bin ab reh nahin sakte',
    'Tere bina kya wajood mera',
    'Tum hi ho, tum hi ho',
    'Ab tum hi ho, ab tum hi ho',
    'Tum hi ho, tum hi ho',
    'Maine jo kehna tha keh diya',
    'Jo sunna tha sun liya',
    'Ab tum hi ho, tum hi ho',
    'Teri yaadon se jo aaya hai',
    'Ye ehsaas leke aaya hai',
  ],
  2: [
    'Gabru hai desi, style hai desi',
    'Nakhre tere London jaise',
    'Tu hai pari, main hoon jawaan',
    'Tera pyaar hai loca loca loca',
    'Loca loca loca loca',
    'Sohniye tu loca kar de',
    'Loca kar de, loca kar de',
    'Dil nu loca kar de',
    'Teri aankhon mein kho jaata hoon',
    'Loca ho jaata hoon',
  ],
  3: [
    'Teri aankhon ka jo jaadu hai',
    'Woh jadoo mujhe pighlata hai',
    'Paani paani ho gayi',
    'Main toh paani paani ho gayi',
    'Paani paani ho gayi re',
    'Tere ishq mein main paani paani',
    'Ho gayi, ho gayi',
    'Dil mera dhoondha kare',
    'Teri galliyon mein teri yaadein',
    'Paani paani ho gayi',
  ],
  4: [
    'Dil dhadakne do, dil dhadakne do',
    'Kehne do kuch toh kehne do',
    'Dil ko dil se milne do',
    'Dil dhadakne do',
    'Khwaabon ke rang hai',
    'Aankhon mein safar hai',
    'Ye zindagi to milegi na dobara',
    'Dil dhadakne do, dil dhadakne do',
    'Ho jaao befikar thoda sa',
    'Dil dhadakne do',
  ],
  5: [
    'Channa mereya, channa mereya',
    'Sad songs are the only ones I feel',
    'Tujhe bhula diya, teri kasam',
    'Mujhe maafi de, channa mereya',
    'Channa mereya, channa mereya',
    'Na ja, na ja, na ja ve',
    'Reh ja, reh ja, reh ja ve',
    'Channa mereya, channa mereya',
    'Tu hi junoon, tu hi ibaadat',
    'Channa mereya, channa mereya',
  ],
  6: [
    'Mercy, mercy, mercy on me',
    'Baby you the cure to my disease',
    'Ooh, you got me going crazy',
    'Every time I see your face',
    'Mercy, mercy, mercy',
    'Take me higher, take me higher',
    'Oh your love is like a fire',
    'Burning through the night',
    'Mercy, mercy, mercy on me',
    'Baby, mercy',
  ],
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'search', label: 'Search', icon: SearchIcon },
  { id: 'library', label: 'Library', icon: LibraryIcon },
  { id: 'profile', label: 'Profile', icon: ProfileIcon },
]

function MiniEqualizer() {
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px', padding: '0 2px' }}>
      {[0.55, 1, 0.7, 0.85].map((h, i) => (
        <div key={i} style={{ width: '2.5px', height: `${h * 14}px`, borderRadius: '1.5px', background: '#e8836a', animation: `meq-${i} 0.7s ease-in-out infinite alternate`, animationDelay: `${i * 0.13}s` }} />
      ))}
      <style>{`
        @keyframes meq-0 { from { height: 5px } to { height: 12px } }
        @keyframes meq-1 { from { height: 12px } to { height: 4px } }
        @keyframes meq-2 { from { height: 8px } to { height: 14px } }
        @keyframes meq-3 { from { height: 4px } to { height: 10px } }
      `}</style>
    </div>
  )
}

export default function HomeScreen({ onLogout }: Props) {
  const [activeNav, setActiveNav] = useState('home')
  const [activeCategory, setActiveCategory] = useState('All')
  const [playingId, setPlayingId] = useState<number | null>(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set([1, 3, 5]))
  const [fullPlayerOpen, setFullPlayerOpen] = useState(false)
  const [showTrackMenu, setShowTrackMenu] = useState(false)

  const ALL_TRACKS = [...RECENT_TRACKS]

  function playNext() {
    if (!playingId) return
    const idx = ALL_TRACKS.findIndex(t => t.id === playingId)
    if (shuffle) {
      const next = ALL_TRACKS[Math.floor(Math.random() * ALL_TRACKS.length)]
      setPlayingId(next.id)
    } else {
      setPlayingId(ALL_TRACKS[(idx + 1) % ALL_TRACKS.length].id)
    }
    setIsPlaying(true)
  }

  function playPrev() {
    if (!playingId) return
    const idx = ALL_TRACKS.findIndex(t => t.id === playingId)
    setPlayingId(ALL_TRACKS[(idx - 1 + ALL_TRACKS.length) % ALL_TRACKS.length].id)
    setIsPlaying(true)
  }
  const [searchQuery, setSearchQuery] = useState('')

  function toggleLike(id: number) {
    setLikedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isHome = activeNav === 'home'
  const isSearch = activeNav === 'search'
  const isLibrary = activeNav === 'library'
  const isProfile = activeNav === 'profile'

  return (
    <div style={{ height: '844px', display: 'flex', flexDirection: 'column', background: 'var(--background)', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '100px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,131,106,0.15) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Top status bar */}
      <div style={{ padding: '14px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(240,236,228,0.9)' }}>9:41</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="rgba(240,236,228,0.8)"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="7" rx="1" /><rect x="9" y="2" width="3" height="10" rx="1" /><rect x="13.5" y="0" width="3" height="12" rx="1" /></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="rgba(240,236,228,0.45)" /><rect x="2" y="2" width="16" height="8" rx="2" fill="rgba(240,236,228,0.8)" /><path d="M23 4v4a2 2 0 000-4z" fill="rgba(240,236,228,0.45)" /></svg>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 2 }} className="scrollbar-hide">

        {/* Header */}
        <div style={{ padding: '14px 24px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#7a7060', fontWeight: 500, letterSpacing: '0.02em' }}>
              {isHome ? 'Good evening,' : isSearch ? 'Discover' : isLibrary ? 'Your Library' : 'Account'}
            </p>
            <h1 style={{ margin: '1px 0 0', fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: '#f0ece4', letterSpacing: '-0.4px', lineHeight: 1.2 }}>
              {isHome ? 'Alex Rivera 👋' : isSearch ? 'Find anything' : isLibrary ? 'Saved music' : 'Alex Rivera'}
            </h1>
          </div>
          {/* Profile avatar */}
          <button
            onClick={onLogout}
            style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(30,32,44,0.9)', border: '1.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a09080" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div style={{ padding: '0 24px 20px' }}>
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a7060" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Songs, artists, playlists..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setActiveNav('search')}
              style={{
                width: '100%',
                padding: '17px 52px 17px 48px',
                borderRadius: '14px',
                border: '1.5px solid rgba(255,255,255,0.06)',
                background: 'rgba(23,25,35,0.7)',
                color: '#f0ece4',
                fontSize: '15px',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
            {/* Microphone icon */}
            <button
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a6050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10a7 7 0 0014 0" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="9" y1="22" x2="15" y2="22" />
              </svg>
            </button>
          </div>
        </div>

        {isHome && (
          <>
            {/* Category chips */}
            <div style={{ display: 'flex', gap: '10px', padding: '0 24px 24px', overflowX: 'auto' }} className="scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    flexShrink: 0,
                    padding: '8px 18px',
                    borderRadius: '100px',
                    border: `1.5px solid ${activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.07)'}`,
                    background: activeCategory === cat ? 'linear-gradient(135deg, #e8836a, #f5a84e)' : 'rgba(28,30,42,0.7)',
                    color: activeCategory === cat ? '#1a0e06' : '#7a7060',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured banner */}
            <div style={{ margin: '0 24px 28px', borderRadius: '20px', overflow: 'hidden', position: 'relative', height: '180px', background: '#171923' }}>
              <img src={FEATURED_IMAGE} alt="Featured artist concert" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {/* Bottom-to-top dark gradient — ensures text legibility over busy image */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,18,0.95) 0%, rgba(10,11,18,0.55) 50%, rgba(10,11,18,0.1) 100%)' }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '56px' }}>
                <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #e8836a, #f5a84e)', borderRadius: '5px', padding: '2px 9px', fontSize: '10px', fontWeight: 700, color: '#1a0e06', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Featured
                </div>
                <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Tum Hi Ho — Live</p>
                <p style={{ margin: '3px 0 0', fontSize: '13px', color: 'rgba(240,220,196,0.75)' }}>Arijit Singh · New Release</p>
              </div>
              <button
                onClick={() => setPlayingId(1)}
                style={{ position: 'absolute', right: '14px', bottom: '14px', width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #e8836a, #f5a84e)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(232,131,106,0.35)', flexShrink: 0 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3" /></svg>
              </button>
            </div>

            {/* Recently played */}
            <SectionHeader title="Recently Played" />
            <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {RECENT_TRACKS.map(track => {
                const isPlaying = playingId === track.id
                return (
                  <div
                    key={track.id}
                    onClick={() => setPlayingId(track.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '6px 8px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: isPlaying ? 'rgba(232,131,106,0.07)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    {/* Thumbnail with equalizer overlay when playing */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img src={track.img} alt={track.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', display: 'block', opacity: isPlaying ? 0.75 : 1, transition: 'opacity 0.2s' }} />
                      {isPlaying && (
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MiniEqualizer />
                        </div>
                      )}
                    </div>

                    {/* Title + artist */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: isPlaying ? 700 : 500, color: isPlaying ? '#e8836a' : '#e8e2d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</p>
                      <p style={{ margin: '1px 0 0', fontSize: '12px', color: '#5a5040', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.artist}</p>
                    </div>

                    {/* Duration + play/pause + heart */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <span style={{ fontSize: '11px', color: '#4a4030', minWidth: '28px', textAlign: 'right' }}>{track.duration}</span>
                      {/* Play / pause button */}
                      <button
                        onClick={e => { e.stopPropagation(); setPlayingId(isPlaying ? null : track.id) }}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', background: isPlaying ? 'rgba(232,131,106,0.15)' : 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}
                      >
                        {isPlaying
                          ? <svg width="10" height="10" viewBox="0 0 10 10" fill="#e8836a"><rect x="1" y="1" width="3" height="8" rx="1"/><rect x="6" y="1" width="3" height="8" rx="1"/></svg>
                          : <svg width="10" height="10" viewBox="0 0 10 10" fill="#a09080"><polygon points="2,1 9,5 2,9"/></svg>
                        }
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); toggleLike(track.id) }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={likedIds.has(track.id) ? '#e8836a' : 'none'} stroke={likedIds.has(track.id) ? '#e8836a' : '#4a4030'} strokeWidth="2" strokeLinecap="round">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* New releases carousel */}
            <SectionHeader title="New Releases" />
            <div style={{ display: 'flex', gap: '16px', padding: '0 24px 28px', overflowX: 'auto' }} className="scrollbar-hide">
              {ALBUMS.map(album => (
                <div
                  key={album.id}
                  onClick={() => setPlayingId(album.id)}
                  style={{ flexShrink: 0, width: '150px', cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <img src={album.img} alt={album.title} style={{ width: '150px', height: '150px', borderRadius: '16px', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '16px', background: 'rgba(14,16,24,0.3)' }} />
                    <button
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e8836a, #f5a84e)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: playingId === album.id ? 1 : 0.85,
                        boxShadow: '0 4px 12px rgba(232,131,106,0.4)',
                        transition: 'opacity 0.2s',
                      }}
                    >
                      {playingId === album.id
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                        : <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                      }
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#e8e2d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{album.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#7a7060', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{album.artist} · {album.duration}</p>
                </div>
              ))}
            </div>

            {/* Trending grid */}
            <SectionHeader title="Trending Now" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '0 24px 140px' }}>
              {ALBUMS.map(album => (
                <div
                  key={album.id}
                  onClick={() => setPlayingId(album.id)}
                  style={{ borderRadius: '14px', overflow: 'hidden', background: 'rgba(20,22,32,0.6)', cursor: 'pointer', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <img src={album.img} alt={album.title} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '10px 12px 12px' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#e8e2d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{album.title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#7a7060', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {isSearch && (
          <div style={{ padding: '0 24px 100px' }}>
            <p style={{ color: '#7a7060', fontSize: '15px', textAlign: 'center', marginTop: '40px' }}>
              {searchQuery ? `Searching for "${searchQuery}"…` : 'Start typing to find songs, artists, or playlists.'}
            </p>
          </div>
        )}

        {isLibrary && (
          <div style={{ padding: '0 24px 100px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {RECENT_TRACKS.filter(t => likedIds.has(t.id)).length === 0 && (
              <p style={{ color: '#7a7060', fontSize: '15px', textAlign: 'center', marginTop: '40px' }}>No liked tracks yet. Heart a song to save it here.</p>
            )}
            {RECENT_TRACKS.filter(t => likedIds.has(t.id)).map(track => (
              <div key={track.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 12px', borderRadius: '14px', background: 'rgba(23,25,35,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <img src={track.img} alt={track.title} style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#f0ece4' }}>{track.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#7a7060' }}>{track.artist}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8836a" stroke="#e8836a" strokeWidth="2" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
            ))}
          </div>
        )}

        {isProfile && (
          <div style={{ padding: '0 24px 100px' }}>
            <div style={{ textAlign: 'center', paddingTop: '20px', marginBottom: '32px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #e8836a, #f5a84e)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: '#f0ece4' }}>Alex Rivera</p>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#7a7060' }}>alex@example.com</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '20px' }}>
                {[['24', 'Liked'], ['7', 'Playlists'], ['312', 'Following']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: '#f0ece4' }}>{n}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#7a7060' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onLogout} style={{ width: '100%', padding: '16px', borderRadius: '100px', border: '1.5px solid rgba(232,131,106,0.3)', background: 'transparent', color: '#e8836a', fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Now Playing mini-bar */}
      {playingId !== null && !fullPlayerOpen && (
        <div
          onClick={() => setFullPlayerOpen(true)}
          style={{
            position: 'absolute',
            bottom: '76px',
            left: '10px',
            right: '10px',
            background: 'rgba(22,24,34,0.97)',
            backdropFilter: 'blur(24px)',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 10,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}>
          {(() => {
            const track = RECENT_TRACKS.find(t => t.id === playingId) ?? ALBUMS.find(t => t.id === playingId)
            if (!track) return null
            return (
              <>
                <img src={track.img} alt={track.title} style={{ width: '36px', height: '36px', borderRadius: '7px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#f0ece4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</p>
                  <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#5a5040', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.artist}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  <MiniEqualizer />
                  {/* Pause button — filled rectangle pair, immediately readable */}
                  <button
                    onClick={e => { e.stopPropagation(); setIsPlaying(p => !p) }}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(232,131,106,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {isPlaying
                      ? <svg width="11" height="11" viewBox="0 0 11 11" fill="#e8836a"><rect x="1" y="1" width="3.5" height="9" rx="1"/><rect x="6.5" y="1" width="3.5" height="9" rx="1"/></svg>
                      : <svg width="11" height="11" viewBox="0 0 11 11" fill="#e8836a"><polygon points="1,1 10,5.5 1,10"/></svg>
                    }
                  </button>
                  {/* Next button — filled triangle + bar */}
                  <button
                    onClick={e => e.stopPropagation()}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="13" height="11" viewBox="0 0 13 11" fill="#a09080">
                      <polygon points="1,1 8,5.5 1,10"/>
                      <rect x="9.5" y="1" width="2.5" height="9" rx="1"/>
                    </svg>
                  </button>
                </div>
              </>
            )
          })()}
        </div>
      )}

      {/* Full player overlay */}
      {fullPlayerOpen && playingId !== null && (() => {
        const track = RECENT_TRACKS.find(t => t.id === playingId) ?? ALBUMS.find(t => t.id === playingId)
        if (!track) return null
        return (
          <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', flexDirection: 'column', background: '#0e1018' }}>
            {/* Blurred album art backdrop */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <img src={track.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(60px) saturate(0.6)', transform: 'scale(1.2)', opacity: 0.35 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,16,24,0.5) 0%, rgba(14,16,24,0.85) 60%, #0e1018 100%)' }} />
            </div>

            {/* Content — scrollable so lyrics don't clip */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }} className="scrollbar-hide">
              <div style={{ padding: '0 28px 40px', flexShrink: 0 }}>
                {/* Top bar */}
                <div style={{ paddingTop: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <button onClick={() => setFullPlayerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a09080" strokeWidth="2.2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  </button>
                  <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#5a5040', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Now Playing</p>
                  <button onClick={() => setShowTrackMenu(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a09080" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="1.5" fill="#a09080"/><circle cx="12" cy="12" r="1.5" fill="#a09080"/><circle cx="12" cy="19" r="1.5" fill="#a09080"/></svg>
                  </button>
                </div>

                {/* Album art */}
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: '22px', overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,0,0,0.55)', marginBottom: '28px', flexShrink: 0 }}>
                  <img src={track.img} alt={track.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Track info + like */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '23px', fontWeight: 700, color: '#f0ece4', letterSpacing: '-0.4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</p>
                    <p style={{ margin: '3px 0 0', fontSize: '14px', color: '#7a7060' }}>{track.artist}</p>
                  </div>
                  <button onClick={() => toggleLike(playingId)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={likedIds.has(playingId) ? '#e8836a' : 'none'} stroke={likedIds.has(playingId) ? '#e8836a' : '#5a5040'} strokeWidth="2" strokeLinecap="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)', marginBottom: '8px', overflow: 'hidden' }}>
                    <div style={{ width: '38%', height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #e8836a, #f5a84e)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: '#5a5040' }}>1:42</span>
                    <span style={{ fontSize: '11px', color: '#5a5040' }}>{'duration' in track ? track.duration : '—'}</span>
                  </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Shuffle */}
                  <button onClick={() => setShuffle(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', opacity: shuffle ? 1 : 0.4, transition: 'opacity 0.2s' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={shuffle ? '#e8836a' : '#f0ece4'} strokeWidth="2" strokeLinecap="round">
                      <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
                      <polyline points="21 16 21 21 16 21"/><line x1="4" y1="4" x2="9" y2="9"/>
                    </svg>
                  </button>
                  {/* Prev */}
                  <button onClick={playPrev} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#e8e2d8">
                      <polygon points="19,20 9,12 19,4"/><rect x="5" y="4" width="3" height="16" rx="1"/>
                    </svg>
                  </button>
                  {/* Play / Pause */}
                  <button
                    onClick={() => setIsPlaying(p => !p)}
                    style={{ width: '62px', height: '62px', borderRadius: '50%', background: 'linear-gradient(135deg, #e8836a, #f5a84e)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 22px rgba(232,131,106,0.4)' }}
                  >
                    {isPlaying
                      ? <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><rect x="3" y="2" width="5" height="16" rx="1.5"/><rect x="12" y="2" width="5" height="16" rx="1.5"/></svg>
                      : <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><polygon points="4,2 18,10 4,18"/></svg>
                    }
                  </button>
                  {/* Next */}
                  <button onClick={playNext} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#e8e2d8">
                      <polygon points="5,4 15,12 5,20"/><rect x="16" y="4" width="3" height="16" rx="1"/>
                    </svg>
                  </button>
                  {/* Repeat */}
                  <button onClick={() => setRepeat(r => !r)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', opacity: repeat ? 1 : 0.4, transition: 'opacity 0.2s' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={repeat ? '#e8836a' : '#f0ece4'} strokeWidth="2" strokeLinecap="round">
                      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/>
                      <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Lyrics section */}
              <div style={{ padding: '0 28px 48px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#5a5040', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Lyrics</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {LYRICS[track.id] ? LYRICS[track.id].map((line, i) => (
                    <p key={i} style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: i === 2 ? '18px' : '15px', fontWeight: i === 2 ? 600 : 400, color: i === 2 ? '#f0ece4' : 'rgba(240,236,228,0.35)', lineHeight: 1.5, transition: 'color 0.3s', textAlign: 'center' }}>
                      {line}
                    </p>
                  )) : (
                    <p style={{ margin: 0, fontSize: '14px', color: '#4a4030', textAlign: 'center', fontStyle: 'italic' }}>Lyrics not available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Track menu bottom sheet */}
            {showTrackMenu && (
              <div
                onClick={() => setShowTrackMenu(false)}
                style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end' }}
              >
                <div
                  onClick={e => e.stopPropagation()}
                  style={{ width: '100%', background: 'rgba(22,24,34,0.97)', borderRadius: '24px 24px 0 0', padding: '12px 0 36px', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.07)', borderBottom: 'none' }}
                >
                  {/* Handle bar */}
                  <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)', margin: '0 auto 20px' }} />
                  {/* Track preview */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <img src={track.img} alt={track.title} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#f0ece4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#7a7060' }}>{track.artist}</p>
                    </div>
                  </div>
                  {/* Menu items */}
                  {[
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8b8a2" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/><circle cx="12" cy="12" r="9" stroke="#c8b8a2" strokeWidth="1.5"/></svg>, label: 'Add to playlist' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8b8a2" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h12"/><circle cx="19" cy="18" r="3" stroke="#c8b8a2" strokeWidth="1.5"/></svg>, label: 'Add to queue' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8b8a2" strokeWidth="1.8" strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>, label: 'Share' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8b8a2" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>, label: 'View Artist' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8b8a2" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/><path d="M12 9V3M12 21v-6M9 12H3M21 12h-6"/></svg>, label: 'View Album' },
                  ].map(({ icon, label }) => (
                    <button
                      key={label}
                      onClick={() => setShowTrackMenu(false)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
                    >
                      {icon}
                      <span style={{ fontSize: '15px', fontWeight: 500, color: '#c8b8a2', fontFamily: 'var(--font-body)' }}>{label}</span>
                    </button>
                  ))}
                  {/* Cancel */}
                  <button
                    onClick={() => setShowTrackMenu(false)}
                    style={{ width: 'calc(100% - 40px)', margin: '8px 20px 0', padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: '#7a7060', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })()}

      {/* Bottom navigation */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '72px',
        background: 'rgba(14,16,24,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 20,
        padding: '0 8px 4px',
      }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeNav === id
          return (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '12px',
                transition: 'background 0.2s',
              }}
            >
              <Icon active={active} />
              <span style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-body)', color: active ? '#e8836a' : '#4a4030', transition: 'color 0.2s' }}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ padding: '0 24px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#f0ece4', letterSpacing: '-0.3px' }}>{title}</h2>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#7a7060', fontFamily: 'var(--font-body)', fontWeight: 600 }}>See all</button>
    </div>
  )
}

function NowPlayingBars() {
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px' }}>
      {[0.6, 1, 0.75, 0.9].map((h, i) => (
        <div key={i} style={{ width: '3px', height: `${h * 16}px`, borderRadius: '2px', background: 'linear-gradient(180deg, #e8836a, #f5a84e)', animation: `pulse-bar-${i} 0.8s ease-in-out infinite alternate`, animationDelay: `${i * 0.15}s` }} />
      ))}
      <style>{`
        @keyframes pulse-bar-0 { from { height: 8px } to { height: 14px } }
        @keyframes pulse-bar-1 { from { height: 14px } to { height: 6px } }
        @keyframes pulse-bar-2 { from { height: 10px } to { height: 16px } }
        @keyframes pulse-bar-3 { from { height: 6px } to { height: 12px } }
      `}</style>
    </div>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#e8836a' : 'none'} stroke={active ? '#e8836a' : '#5a5040'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#e8836a' : '#5a5040'} strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function LibraryIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#e8836a' : '#5a5040'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  )
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#e8836a' : '#5a5040'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
