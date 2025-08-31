import React, { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Resume from './components/Resume.jsx'
import EducationSkills from './components/EducationSkills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import Modal from './components/Modal.jsx'

export default function App() {
  const [active, setActive] = useState('home')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  // Global reveal on intersect (for .reveal)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in-view')
          io.unobserve(en.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Animate any .skill-fill when visible
  useEffect(() => {
    const fills = document.querySelectorAll('.skill-fill')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.width = (en.target.dataset.value || 0) + '%'
          io.unobserve(en.target)
        }
      })
    }, { threshold: 0.2 })
    fills.forEach(f => io.observe(f))
    return () => io.disconnect()
  }, [])

  // scroll spy
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[data-section]'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          setActive(en.target.dataset.section)
        }
      })
    }, { threshold: 0.38 })
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Keyboard focus rings
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Tab') document.body.classList.add('show-focus') }
    document.body.addEventListener('keydown', onKey)
    return () => document.body.removeEventListener('keydown', onKey)
  }, [])

  const openModal = (node) => { setModalContent(node); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setModalContent(null) }

  return (
    <div id="main">
      <Header active={active} />
      <main>
        <Hero />
        <Projects onOpenModal={openModal} />
        <Resume />
        <EducationSkills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Modal open={modalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  )
}
