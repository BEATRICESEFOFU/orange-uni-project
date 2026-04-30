import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStudent } from '../services/api'
import './AddStudent.css'

function AddStudent() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', dept: '', year: '', gpa: '', phone: '', status: 'active',
  })

  const [errors,  setErrors]  = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const errs = {}
    if (!form.name.trim())  errs.name  = 'Full name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address.'
    if (!form.dept) errs.dept = 'Please select a department.'
    if (!form.year) errs.year = 'Please select a year.'
    if (!form.gpa.trim()) errs.gpa = 'GPA is required.'
    else if (isNaN(form.gpa) || +form.gpa < 0 || +form.gpa > 4)
      errs.gpa = 'GPA must be between 0.0 and 4.0.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    try {
      const newStudent = {
        id:     `OU-00${Date.now()}`,
        name:   form.name.trim(),
        email:  form.email.trim(),
        dept:   form.dept,
        year:   form.year,
        gpa:    parseFloat(form.gpa),
        phone:  form.phone.trim() || null,
        status: form.status,
      }
      await createStudent(newStudent)
      setSuccess(true)
      setErrors({})
      setTimeout(() => navigate('/list'), 1800)
    } catch (err) {
      setErrors({ submit: err.message })
    }
  }

  return (
    <div className="add-page">

      <div className="add-header">
        <h1>Register a student</h1>
        <p>Complete all required fields to add a new student to the portal.</p>
      </div>

      {success && (
        <div className="success-banner">
          Student registered successfully! Redirecting…
        </div>
      )}

      {errors.submit && (
        <div className="login-error" style={{ marginBottom: '1rem' }}>
          {errors.submit}
        </div>
      )}

      <form className="add-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">

          <div className="form-group">
            <label>Full name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Amara Diallo" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email address *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@ou.edu" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Department *</label>
            <select name="dept" value={form.dept} onChange={handleChange}>
              <option value="">Select department…</option>
              <option>Teaching</option>
              <option>Engineering</option>
              <option>Computing</option>
              <option>Nursing</option>
              <option>Business Admin</option>
              <option>Science</option>
            </select>
            {errors.dept && <span className="field-error">{errors.dept}</span>}
          </div>

          <div className="form-group">
            <label>Year of study *</label>
            <select name="year" value={form.year} onChange={handleChange}>
              <option value="">Select year…</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
            {errors.year && <span className="field-error">{errors.year}</span>}
          </div>

          <div className="form-group">
            <label>GPA *</label>
            <input name="gpa" type="number" min="0" max="4" step="0.1" value={form.gpa} onChange={handleChange} placeholder="0.0 – 4.0" />
            {errors.gpa && <span className="field-error">{errors.gpa}</span>}
          </div>

          <div className="form-group">
            <label>Phone number</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+267 72 954 107" />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Register student</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/list')}>Cancel</button>
        </div>

      </form>
    </div>
  )
}

export default AddStudent