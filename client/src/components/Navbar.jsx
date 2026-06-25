import { Link } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand">
        <Link to="/home">CodeCrafters</Link>
      </div>

      <nav className="nav-links">
        <Link to="/home">Home</Link>
        {user?.role === 'tutor' && <Link to="/tutor">Tutor panel</Link>}
        {user?.role === 'admin' && <Link to="/admin">Admin panel</Link>}
      </nav>

      <div className="user-actions">
        {user ? (
          <>
            <span className="user-role">{user.role}</span>
            <button type="button" className="button button-secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
