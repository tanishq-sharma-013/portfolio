import React, { useEffect, useRef, useState } from 'react'

const lines = [
  "I create polished, high-performance web interfaces and browser games.",
  "I craft delightful UIs with real-world performance budgets.",
  "I love building game mechanics with Canvas and React."
]

function useTypewriter(texts, speed = 22, pause = 1200) {
  const [idx, setIdx] = useState(0)
  const [out, setOut] = useState('')
  useEffect(() => {
    let mounted = true
    let i = 0
    const type = () => {
      if (!mounted) return
      const full = texts[idx % texts.length]
      if (i <= full.length) {
        setOut(full.slice(0, i))
        i++
        setTimeout(type, speed)
      } else {
        setTimeout(() => {
          i = 0; setIdx(v => (v + 1) % texts.length); setOut('')
        }, pause)
      }
    }
    type()
    return () => { mounted = false }
  }, [idx])
  return out
}

export default function Hero() {
  const canvasRef = useRef(null)
  const text = useTypewriter(lines)

  // particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, particles = []
    const resize = () => {
      w = canvas.width = canvas.clientWidth
      h = canvas.height = canvas.clientHeight
      initParticles()
    }
    const initParticles = () => {
      particles = []
      const count = Math.max(12, Math.round((w * h) / 90000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.6) + 0.6,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: 0.08 + Math.random() * 0.18
        })
      }
    }
    const step = () => {
      ctx.clearRect(0, 0, w, h)
      const offset = (window.scrollY || 0) * 0.02
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
        ctx.arc(p.x + Math.sin((p.y + offset) / 40) * 6, p.y + Math.cos((p.x + offset) / 40) * 6, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      requestAnimationFrame(step)
    }
    window.addEventListener('resize', resize)
    resize()
    step()
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <section id="hero" data-section="home" className="hero" aria-label="Hero section">
      <video autoPlay muted loop playsInline poster="/poster.jpg" aria-hidden="true">
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video element.
      </video>
      <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="overlay" aria-hidden="true"></div>

      <div className="hero-content">
        <div className="intro">
          <span className="kicker">Frontend Developer • Game Dev</span>
          <h1>Hi, I'm <span className="name-grad">Tanishq Sharma</span></h1>
          <div className="lead" id="typewriter">{text}</div>

          <div className="cta">
            <button className="btn btn-cta" onClick={() => document.getElementById('projects').scrollIntoView({behavior:'smooth'})}>View Projects</button>
            <button className="btn btn-ghost" onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}>Hire Me</button>
            <a className="btn btn-ghost" href="mailto:sharmatanishq013@gmail.com" aria-label="Email">sharmatanishq013@gmail.com</a>
          </div>

          <div style={{marginTop:14}} className="small muted">Lives in Bhopal, India • Open to freelance &amp; full-time roles</div>
        </div>

        <aside className="hero-side" aria-hidden="true">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontWeight:800,color:"var(--muted)"}}>Quick stats</div>
            <div style={{fontSize:12,color:"var(--muted)"}}>Updated</div>
          </div>
          <div className="stats" aria-hidden="true">
            <div className="stat"><strong>50+</strong><small style={{display:'block',color:"var(--muted)"}}>Problems solved</small></div>
            <div className="stat"><strong>4</strong><small style={{display:'block',color:"var(--muted)"}}>Projects</small></div>
            <div className="stat"><strong>0</strong><small style={{display:'block',color:"var(--muted)"}}>Open-source</small></div>
          </div>
          <div style={{marginTop:14}} aria-hidden="true">
            <div style={{fontWeight:700,marginBottom:8,color:"var(--muted)"}}>Primary tech</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <span className="tag">HTML</span><span className="tag">CSS</span><span className="tag">JavaScript</span><span className="tag">Canvas</span><span className="tag">React</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
