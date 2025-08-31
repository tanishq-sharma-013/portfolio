import React, { useEffect, useState } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return show ? <button id="backTop" aria-label="Back to top" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>↑</button> : null
}
