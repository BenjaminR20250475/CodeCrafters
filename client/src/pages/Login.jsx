import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api' // Path check kar lena bhai apne structure ke hisaab se

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    setError('')
    setLoading(true)

    try {
      // 1. Axios ke through backend par login request bheji
      const response = await loginUser(email, password)
      const data = response.data

      if (!data.token) {
        throw new Error('Login failed: Token not received from server')
      }

      // 2. Token ko browser ke localStorage mein save kiya
      localStorage.setItem('token', data.token)

      // 3. Email check karke dynamic roles/strings dono set karein
      let assignedRole = 1; // Default Student
      let roleString = 'student';

      if (email.includes('admin')) {
        assignedRole = 3;
        roleString = 'admin'; // Isse App.jsx ke saare admin filters aur dashboard elements khulenge!
      } else if (email.includes('tutor')) {
        assignedRole = 2;
        roleString = 'tutor';
      }

      const mockUser = {
        name: email.split('@')[0], // e.g., testadmin
        email: email,
        role_id: assignedRole,
        role: roleString // App.jsx ab is string check par crash nahi hoga aur dynamic privileges de dega
      }

      // 4. App.jsx ko state update karne ko bola
      if (onLogin) {
        onLogin(mockUser)
      }

      // 5. Successful login ke baad seedha dashboard par redirect
      navigate('/home')

    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-center">
      <div className="auth-card">
        <h1>Welcome to CodeCrafters</h1>
        <p className="small-text">Log in using your registered email address and password.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email Address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email (e.g., testadmin@test.com)"
              disabled={loading}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="button button-primary full-width" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login