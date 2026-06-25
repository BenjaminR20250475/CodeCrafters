import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!username || !password) {
      setError('Username and password are required.')
      return
    }

    setError('')
    onLogin({ username, password })
    navigate('/home')
  }

  return (
    <div className="page page-center">
      <div className="auth-card">
        <h1>Welcome to CodeCrafters</h1>
        <p className="small-text">Use student, tutor, or admin as your username to preview the role view.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="button button-primary full-width">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
