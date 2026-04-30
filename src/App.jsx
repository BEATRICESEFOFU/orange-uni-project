import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar      from './components/Navbar'
import Home        from './pages/Home'
import List        from './pages/List'
import Details     from './pages/Details'
import AddStudent  from './pages/AddStudent'
import Login       from './pages/Login'
import './App.css'

function isLoggedIn() {
  return !!localStorage.getItem('ou_token')
}

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route path="/*" element={
        <ProtectedRoute>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/"            element={<Home />}       />
              <Route path="/list"        element={<List />}       />
              <Route path="/details/:id" element={<Details />}    />
              <Route path="/add"         element={<AddStudent />} />
              </Routes>
              </main>
              </ProtectedRoute>
      } />

      </Routes>
      </BrowserRouter>
      
  )
}

export default App