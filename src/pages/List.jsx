import { useState, useEffect } from 'react'
import { getStudents } from '../services/api'
import StudentCard from '../components/StudentCard'
import './List.css'
import { getStudent } from '../services/api'

function List() {
    const [students,      setStudents]     = useState([])
    const [search,        setSearch]       = useState('')
    const [filterDept,    setFilterDept]   = useState('')
    const [loading,       setLoading]      = useState(true)   
    const [error,         setError]        = useState('')

    useEffect(() => {
        getStudents()
        .then(data => setStudents(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [])

    const depts    = ['All', ...new Set(students.map(s => s.dept))]
    const filtered =  students.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                            s.dept.toLowerCase().includes(search.toLowerCase())
        const matchDept   = filterDept === '' || s.dept === filterDept
        return matchSearch && matchDept
    })

    if (loading) return <div className="empty-state">Loading students...</div>
    if (error)   return <div className="empty-state" style={{ color: '#dc2626' }}>{error}</div>

    return (
        <div className="list-page">
            <div className="list-header">
                <h1>Student Directory</h1>
                <p>{students.length} students across {depts.length - 1} departments</p>
                </div>

                <input
                className="search-input"
                type="text"
                placeholder="Search by name or department..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                />

                <div className="dept-tabs">
                    {depts.map(dept => (
                        <button
                    key={dept}
                    className={filterDept === (dept === 'All' ? '' : dept) ? 'dept-tab active' : 'dept-tab'}
                    onClick={() => setFilterDept(dept === 'All' ? '' : dept)}
                    >
                        {dept}
                        </button>
                   ))}
                   </div>

                   {filtered.length === 0 ? (
                    <div className="empty-state">No students match your search.</div>
                   ) : (
                    <div className="students-grid">
                        {filtered.map(student => (
                            <StudentCard key={student.id} {...student } />
                        ))}
                        </div>
                   )}
                   </div>
                   )
                }
                export default List
    
