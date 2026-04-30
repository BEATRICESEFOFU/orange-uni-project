import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStudents } from '../services/api'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents()
      .then(data => setStudents(data))
      .catch(err => console.error(err))
  }, [])

  const depts  = [...new Set(students.map(s => s.dept))].length
  const active = students.filter(s => s.status === 'active').length

  return (
    <div className="hero">
      <div className="hero-text">
        <div className="hero-tag">Welcome to</div>
        <h1 className="hero-title">
          Orange-Uni<br />
          <span className="hero-accent">Student Portal</span>
        </h1>
        <p className="hero-desc">
          A centralised directory of enrolled students, their academic
          programmes, and contact information — all in one place.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/list')}>
            Browse Students
          </button>
          <button className="btn-outline" onClick={() => navigate('/add')}>
            + Add Student
          </button>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-card">
          <div className="stat-num">{students.length}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{depts}</div>
          <div className="stat-label">Departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{active}</div>
          <div className="stat-label">Active</div>
        </div>
      </div>
    </div>
  )
}

export default Home