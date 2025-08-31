import React, { useEffect } from 'react'

const TIMELINE = [
  { year: '2023', title: 'Started Journey', body: 'Began building small UI projects using HTML & CSS.' },
  { year: '2023', title: 'Learned Java', body: 'Started learning java for Data Structure.' },
  { year: '2024', title: 'Data Structure & Algorithms', body: 'Learned Basic Data Structure & Searching, Sorting Algorithms.' },
  { year: '2025', title: 'Portfolio', body: 'Built browser games and polished portfolio UX.' }
]

export default function Resume() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.timeline-item')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target) }
      })
    }, { threshold: 0.22 })
    nodes.forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section id="resume" data-section="resume" className="reveal" aria-labelledby="resume-title">
      <h2 id="resume-title">Timeline</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 18 }}>
        <div>
          <div className="timeline">
            {TIMELINE.map((item, idx) => (
              <div className="timeline-item" key={idx}>
                <div style={{ fontWeight: 800 }}>{item.year} — {item.title}</div>
                <div style={{ color: 'var(--muted)', marginTop: 8 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ marginTop: 0 }}>Skills</h3>
            <div style={{ marginTop: 12 }}>
              {[
                { label: 'JavaScript : ', value: 92 },
                { label: 'React : ', value: 88 },
                { label: 'Canvas / Game Logic : ', value: 86 },
                { label: 'Performance & Accessibility : ', value: 84 },
              ].map((s, i) => (
                <div className="skill" key={i}>
                  <div className="meta">
                    <span>{s.label}</span>
                    <span>{s.value}%</span>
                  </div>
                  <div className="bar">
                    <div className="fill" style={{ width: `${s.value}%` }}></div>
                  </div>
                </div>
              ))
              }
              <div style={{ marginTop: 14, color: 'var(--muted)' }}><strong>Tools:</strong><br />VSCode · Git · Chrome DevTools · Figma · Node.js</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
