import { useNavigate } from 'react-router-dom'
import './StudentCard.css'

const AVATAR_COLORS = [
  { bg: '#fff1e6', color: '#c45208' },
  { bg: '#fde8d8', color: '#a33e06' },
  { bg: '#fff8e1', color: '#b36800' },
  { bg: '#fce8e8', color: '#b33a3a' },
  { bg: '#f3e8ff', color: '#7a3ab3' },
  { bg: '#e8f4ff', color: '#2a6db3' },
]

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

function getAvatarColor(name) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function StudentCard({ id, name, dept, year, gpa, status }) {
  const navigate = useNavigate()
  const color = getAvatarColor(name)

  return (
    <div className="student-card" onClick={() => navigate(`/details/${id}`)}>

      <div
        className="card-status-dot"
        style={{ background: status === 'active' ? '#e8620a' : '#aaa' }}
      />

      <div className="card-top">
        <div className="avatar" style={{ background: color.bg, color: color.color }}>
          {getInitials(name)}
        </div>
        <div>
          <div className="card-name">{name}</div>
          <div className="card-id">{id}</div>
        </div>
      </div>

      <div className="card-divider" />

      <div className="card-meta">
        <span className="badge badge-dept">{dept}</span>
        <span className="badge badge-year">{year}</span>
        <span className="badge-gpa">GPA: {gpa}</span>
      </div>

    </div>
  )
}

export default StudentCard