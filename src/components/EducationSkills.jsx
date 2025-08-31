import React, { useEffect } from 'react'

export default function EducationSkills() {
  useEffect(() => {
    const fills = document.querySelectorAll('.skill-bar .skill-fill')
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

  return (
    <section id="education-skills" className="reveal">
      <h2>📌 Education & Skills</h2>

      <div className="card">
        <h3>Education</h3>
        <p>B.Tech in Information Technology — Oriental Institute of Science and Technology, Bhopal (2023–Present)</p>
      </div>

      <div className="card">
        <h3>Certifications</h3>
        <ul>
          <li>Introduction to Java — HackerRank (2024)</li>
          <li>Web Development — Coding Thinker (2024)</li>
          <li>C++ — SoloLearn (2023)</li>
        </ul>
      </div>

      <div className="card">
        <h3>Core Skills</h3>
        <ul>
          <li><p>Java Programming</p></li>
          <li><p>OOPs In C++</p></li>
          <li><p>Intoduction to Python Programming</p></li>
          <li><p>Html, CSS, JavaScript, React</p></li>
          <li><p>MySQL</p></li>
        </ul>
        <div className="skill-bar"><div className="skill-fill" data-value="78"></div></div>
      </div>
    </section>
  )
}
