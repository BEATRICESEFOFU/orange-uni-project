import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  login } from '../services/api'
import './Login.css'

function Login() {
    const navigate = useNavigate()

    const [form,    setForm] = useState({ email: '', password: ''})
    const [error,   setFError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        setFError('')
        setLoading(true)
        try {
            await login(form.email, form.password)
            navigate('/')
        } catch (err) {
            setFError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-logo">
                    <span className="logo-o">O</span>
                    <span className="logo-u">U</span>
                    </div>
                    <h1 className="login-title">Orange-Uni</h1>
                    <p className="login-sub">Student Portal - Staff Login</p>

                    {error && <div className="login-error">{error}</div>}
                    
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="login-group">
                            <label>Email address</label>
                            <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="staff@orangeuni.edu"
                            autoFocus
                            />
                        </div>

                        <div className="login-group">
                            <label>Password</label>
                            <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="********"
                            />
                            </div>

                            <button className="login-btn" type="submit" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign in'}
                                </button>
                                </form>

                                </div>
                                </div>
    )
}

export default Login