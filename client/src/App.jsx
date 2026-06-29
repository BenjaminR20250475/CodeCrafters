import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import TutorDashboard from './pages/TutorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import { getArticlesByCategory, searchArticles, createArticle, updateArticle, deleteArticle } from './services/api'
import './App.css'

const categoryMap = { 'Arts': 1, 'Mathematics': 2, 'Technology': 3 }
const typeMap = { 'Biography': 1, 'Programming': 2, 'Painting': 3, 'Theorem': 4, 'Algorithm': 5 }

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
        let response
        if (search.trim()) {
          response = await searchArticles(search)
        } else if (category !== 'All') {
          const categoryId = categoryMap[category]
          response = await getArticlesByCategory(categoryId)
        } else {
          // Load all categories
          const art = await getArticlesByCategory(1)
          const math = await getArticlesByCategory(2)
          const tech = await getArticlesByCategory(3)
          response = {
            data: [...(art.data || []), ...(math.data || []), ...(tech.data || [])]
          }
        }
        setArticles(Array.isArray(response.data) ? response.data : [])
        setError('')
      } catch (err) {
        setError('Articles API unavailable — no articles to display right now.')
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [category, search])

  const handleLogin = ({ username, password }) => {
    const role = roleFromUsername(username)
    setUser({ username, role })
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleSaveArticle = async (article) => {
    setIsSaving(true)
    const categoryId = categoryMap[article.category] || 1
    const typeId = typeMap[article.type] || 1
    
    const articlePayload = {
      category_id: categoryId,
      type_id: typeId,
      name: article.title,
      about: article.content,
      created_by: user?.username || 'user',
      modified_by: user?.username || 'user'
    }

    try {
      if (article.id) {
        await updateArticle(article.id, articlePayload)
        setArticles((current) => current.map((item) => (item.id === article.id ? article : item)))
      } else {
        const response = await createArticle(articlePayload)
        const created = response?.data?.id ? { id: response.data.id, ...article } : { id: Date.now(), ...article }
        setArticles((current) => [created, ...current])
      }
    } catch (err) {
      setError('Error saving article. Operation reflected in UI but failed server-side.')
      if (!article.id) {
        const nextId = Date.now()
        const newArticle = { id: nextId, ...article }
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
      await deleteArticle(id, { deleted_by: user?.username || 'user' })
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
