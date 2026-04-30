import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const location = useLocation();

    const links = [
      {to: '/',      label: 'Home'   },
      {to:'/list',   label: 'Students'},
      {to: '/add',   label: 'Add Student'},
]

function logout() {
                localStorage.removeItem('ou_token')
                window.location.href = '/login'
             }

return (
    <nav className="navbar">
        <div className="nav-brand">
            <div className="nav-logo">
                <span className="logo-o">O</span>
                <span className="logo-u">U</span>
              </div>
             <div className="nav-titles">
             <span className="nav-name">Orange-Uni</span>
             <span className="nav-sub">Student Portal</span>
             </div>
             </div>

             <div className="nav-links">
                {links.map(link => (
                    <Link
                    key={link.to}
                    to={link.to}
                    className={location.pathname === link.to ? 'nav-link active' : 'nav-link'}
                    >
                        {link.label}
                    </Link>
                ))}

                <button className="logout-btn" onClick={logout}>Sign out</button>
             </div>
             </nav>
            )
        }

        export default Navbar
