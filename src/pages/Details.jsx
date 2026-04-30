import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getStudent } from '../services/api'
import './Details.css'

const AVATAR_COLORS = [
  { bg: '#fff1e6', color: '#c45208' },
  { bg: '#fde8d8', color: '#a33e06' },
  { bg: '#fff8e1', color: '#b36800' },
  { bg: '#fce8e8', color: '#b33a3a' },
  { bg: '#f3e8ff', color: '#7a3ab3' },
  { bg: '#e8f4ff', color: '#2a6db3' },
]

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function getAvatarColor(name) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function Details() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const [student,  setStudent]  = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')

  useEffect(() => {
    getStudent(id)
      .then(data => setStudent(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="empty-state">Loading student…</div>
  if (error)   return (
    <div>
      <div className="empty-state" style={{ color: '#dc2626' }}>{error}</div>
      <button className="back-btn" onClick={() => navigate('/list')}>← Back to directory</button>
    </div>
  )

  const color = getAvatarColor(student.name)

  return (
    <div className="details-page">
      <button className="back-btn" onClick={() => navigate('/list')}>
        ← Back to directory
      </button>

      <div className="details-grid">
        <div className="details-left">
          <div className="detail-avatar" style={{ background: color.bg, color: color.color }}>
            {getInitials(student.name)}
          </div>
          <div className="detail-name">{student.name}</div>
          <div className="detail-dept">{student.dept}</div>
          <span className="detail-year-badge">{student.year}</span>
          <div
            className="detail-status"
            style={{ color: student.status === 'active' ? '#e8620a' : '#aaa' }}
          >
            {student.status === 'active' ? '● Active' : '○ Inactive'}
          </div>
        </div>

        <div className="details-right">
          <div className="info-card">
            <div className="info-card-title">Academic information</div>
            <div className="info-row"><span>Student ID</span><strong>{student.id}</strong></div>
            <div className="info-row"><span>Department</span><strong>{student.dept}</strong></div>
            <div className="info-row"><span>Year</span><strong>{student.year}</strong></div>
            <div className="info-row"><span>GPA</span><strong>{student.gpa} / 4.0</strong></div>
            <div className="info-row"><span>Email</span><strong>{student.email}</strong></div>
            <div className="info-row"><span>Phone</span><strong>{student.phone || '—'}</strong></div>
            <div className="info-row"><span>Status</span><strong>{student.status}</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details