const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function getToken() {
    return localStorage.getItem('ou_token')
}

// ---------- AUTH ----------

export async function login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    localStorage.setItem('ou_token', data.token)
    return data
}

export async function register(username, email, password) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    localStorage.setItem('ou_token', data.token)
    return data
}

// ---------- STUDENTS ----------

export async function getStudents() {
    const res = await fetch(`${BASE_URL}/students`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to fetch students')
    return data
}

export async function getStudent(id) {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data
}

export async function createStudent(student) {
    const res = await fetch(`${BASE_URL}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(student)
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to create student')
    return data
}

export async function deleteStudent(id) {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data
}
