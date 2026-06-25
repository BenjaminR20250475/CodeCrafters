import { NavLink } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand">
        <NavLink to="/home" className="brand-link">CodeCrafters</NavLink>
      </div>

      <nav className="nav-links">
        <NavLink to="/home" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
        {user?.role === 'tutor' && <NavLink to="/tutor" className={({isActive}) => isActive ? 'active' : ''}>Tutor</NavLink>}
        {user?.role === 'admin' && <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : ''}>Admin</NavLink>}
      </nav>

      <div className="user-actions">
        {user ? (
          <>
            <span className="user-role">{user.username} ({user.role})</span>
            <button type="button" className="button button-secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/">Login</NavLink>
        )}
      </div>
    </header>
  )
}

export default Navbar
