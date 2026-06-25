import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import TutorDashboard from './pages/TutorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import { getArticles, createArticle, updateArticle, deleteArticle } from './services/api'
import './App.css'

const roleFromUsername = (username) => {
  const normalized = username.trim().toLowerCase()
  if (normalized === 'admin') return 'admin'
  if (normalized === 'tutor') return 'tutor'
  return 'student'
}

function App() {
  const [user, setUser] = useState(null)
  const [articles, setArticles] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await getArticles()
        // Expecting the backend to return an array of articles at /api/articles
        setArticles(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        // Keep UI functional but do not inject mock data; show a helpful message
        setError('Articles API unavailable — no articles to display right now.')
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  const handleLogin = ({ username, password }) => {
    const role = roleFromUsername(username)
    setUser({ username, role })
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleSaveArticle = async (article) => {
    const articlePayload = {
      title: article.title,
      content: article.content,
      category: article.category,
      type: article.type,
    }

    if (article.id) {
      try {
        await updateArticle(article.id, articlePayload)
      } catch (err) {
        setError('Backend update failed; saved locally for now.')
      }
      setArticles((current) => current.map((item) => (item.id === article.id ? article : item)))
      return
    }

    const nextId = Date.now()
    const newArticle = { id: nextId, ...articlePayload }

    try {
      await createArticle(newArticle)
    } catch (err) {
      setError('Backend create failed; added locally for now.')
    }

    setArticles((current) => [newArticle, ...current])
  }

  const handleDeleteArticle = async (id) => {
    try {
      await deleteArticle(id)
    } catch (err) {
      setError('Backend delete failed; removed locally for now.')
    }
    setArticles((current) => current.filter((article) => article.id !== id))
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      {error && <div className="status-banner">{error}</div>}
      <main className="app-shell">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/home"
            element={
              user ? (
                <Home
                  user={user}
                  articles={articles}
                  search={search}
                  category={category}
                  onSearch={setSearch}
                  onCategory={setCategory}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/tutor"
            element={
              user && (user.role === 'tutor' || user.role === 'admin') ? (
                <TutorDashboard articles={articles} onSaveArticle={handleSaveArticle} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={
              user && user.role === 'admin' ? (
                <AdminDashboard
                  articles={articles}
                  onSaveArticle={handleSaveArticle}
                  onDeleteArticle={handleDeleteArticle}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to={user ? '/home' : '/'} replace />} />
        </Routes>
      </main>
      {loading && <div className="loading-overlay">Loading articles…</div>}
    </Router>
  )
}

export default App
