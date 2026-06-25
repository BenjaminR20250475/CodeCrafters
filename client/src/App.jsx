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
  const [isSaving, setIsSaving] = useState(false)
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
    setIsSaving(true)
    const articlePayload = {
      title: article.title,
      content: article.content,
      category: article.category,
      type: article.type,
    }

    try {
      if (article.id) {
        await updateArticle(article.id, articlePayload)
        setArticles((current) => current.map((item) => (item.id === article.id ? article : item)))
      } else {
        const response = await createArticle(articlePayload)
        // If backend returns created item (with id), prefer that. Otherwise create a local id.
        const created = response && response.data && response.data.id ? response.data : { id: Date.now(), ...articlePayload }
        setArticles((current) => [created, ...current])
      }
    } catch (err) {
      setError('Error saving article. Operation reflected in UI but failed server-side.')
      if (!article.id) {
        const nextId = Date.now()
        const newArticle = { id: nextId, ...articlePayload }
        setArticles((current) => [newArticle, ...current])
      } else {
        setArticles((current) => current.map((item) => (item.id === article.id ? article : item)))
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteArticle = async (id) => {
    setIsSaving(true)
    try {
      await deleteArticle(id)
      setArticles((current) => current.filter((article) => article.id !== id))
    } catch (err) {
      setError('Error deleting article. Removed locally in UI.')
      setArticles((current) => current.filter((article) => article.id !== id))
    } finally {
      setIsSaving(false)
    }
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
                  loading={loading}
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
                <TutorDashboard articles={articles} onSaveArticle={handleSaveArticle} isSaving={isSaving} />
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
                  isSaving={isSaving}
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
