import React, { useMemo, useState } from 'react'
const PROJECTS = [
  { id: 'p2', title: 'Snake Mania', desc: 'Grid-based snake game built for desktop with responsive controls (open demo).', tags: ['Game'], demo: './snake.html', repo: '#', img: '/snake.jpeg' },
  { id: 'p4', title: 'Tic Tac Toe', desc: 'Vanilla JS game with a minimax-based AI opponent and clean UI.', tags: ['Game','Web'], demo: './tictactoe.html', repo: '#', img: '/tictactoe.jpeg' },
]

export default function Projects({ onOpenModal }) {
  const [filter, setFilter] = useState('all')

  const list = useMemo(() => {
    return PROJECTS.filter(p => filter === 'all' || p.tags.includes(filter))
  }, [filter])

  const openDemo = (demo) => {
    if (demo === 'snake') onOpenModal(<Snake />)
    else if (demo === 'tictactoe') onOpenModal(<TicTacToe />)
    else window.open(demo, '_blank', 'noopener')
  }

  return (
    <section id="projects" data-section="projects" className="reveal" aria-labelledby="projects-title">
      <h2 id="projects-title">Selected Projects</h2>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{color:'var(--muted)'}}>Click a card to open live demo </div>
        <div>
          <label style={{fontSize:13,color:'var(--muted)',marginRight:8}}>Filter:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{padding:8,borderRadius:8,background:'transparent',border:'1px solid rgba(255,255,255,0.04)',color:'inherit'}}>
            <option value="all">All</option>
            <option>Web</option>
            <option>Game</option>
            <option>Dashboard</option>
          </select>
        </div>
      </div>

      <div className="grid" aria-live="polite">
        {list.map(p => (
          <article key={p.id} className="card reveal project-card" role="button" aria-label={`${p.title} - open demo`} tabIndex={0} onClick={() => openDemo(p.demo)} onKeyDown={(e) => { if (e.key==='Enter' || e.key===' ') openDemo(p.demo) }}>
            <div className="thumb"><img src={p.img} alt={`${p.title} thumbnail`} /></div>
            <h3 style={{margin:0}}>{p.title}</h3>
            <p style={{color:'var(--muted)',marginTop:8}}>{p.desc}</p>
            <div className="tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            <div className="links-row" style={{marginTop:8}}>
              {/* <a className="link" href={p.repo} target="_blank" rel="noopener">Code</a> */}
              <button className="link" onClick={(e) => { e.stopPropagation(); openDemo(p.demo) }} aria-label={`Open demo for ${p.title}`}>Demo</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
