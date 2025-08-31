import React, { useEffect, useRef } from 'react'

export default function Header({ active }) {
  const headerRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // theme toggle
  const setTheme = (isLight) => {
    const root = document.documentElement
    if (isLight) {
      root.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    const preferLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    const saved = localStorage.getItem('theme')
    setTheme(saved ? saved === 'light' : preferLight)
  }, [])

  // micro hide on scroll
  useEffect(() => {
    const header = headerRef.current
    let last = 0
    const onScroll = () => {
      const s = window.scrollY
      if (s > last && s > 120) header.style.transform = 'translateY(-8px)'
      else header.style.transform = 'none'
      last = s
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (id) => active === id

  const toggleTheme = () => {
    const isLight = !document.documentElement.classList.contains('light')
    setTheme(isLight)
  }

  return (
    <header role="banner" id="site-header" aria-label="Main header" ref={headerRef}>
      <div className="brand">
        <div className="logo" aria-hidden="true">TS</div>
        <div>
          <div style={{fontWeight:800,color:"var(--muted)"}}>Tanishq Sharma</div>
          <div style={{fontSize:12,color:"var(--muted)"}}>Frontend Developer • Game Dev • UI Engineer</div>
        </div>
      </div>

      <nav role="navigation" aria-label="Primary navigation">
        <button className={`nav-link ${isActive('home') ? 'active' : ''}`} onClick={() => scrollTo('hero')}>Home</button>
        <button className={`nav-link ${isActive('projects') ? 'active' : ''}`} onClick={() => scrollTo('projects')}>Projects</button>
        <button className={`nav-link ${isActive('resume') ? 'active' : ''}`} onClick={() => scrollTo('resume')}>Resume</button>
        <button className={`nav-link ${isActive('contact') ? 'active' : ''}`} onClick={() => scrollTo('contact')}>Contact</button>

        <a className="download" href="/resume.pdf" download aria-label="Download resume (PDF)">Download Resume
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{opacity:.9}}>
            <path d="M12 3v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 9l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 21H3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>

        <button className="theme-toggle" id="themeToggle" aria-pressed="false" title="Toggle theme" style={{marginLeft:8}} onClick={toggleTheme}>
          <svg id="themeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
