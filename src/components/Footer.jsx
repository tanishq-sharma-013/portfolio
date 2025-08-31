import React from 'react'

export default function Footer() {
  return (
    <footer style={{marginTop:24}}>
      <div style={{textAlign:'center',color:'var(--muted)'}}>&copy; <span>{new Date().getFullYear()}</span> Tanishq Sharma — Built with React</div>
    </footer>
  )
}
