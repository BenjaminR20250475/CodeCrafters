import { useState } from 'react'
import ArticleCard from '../components/ArticleCard'
import ArticleForm from '../components/ArticleForm'

function AdminDashboard({ articles, onSaveArticle, onDeleteArticle, isSaving }) {
  const [editingArticle, setEditingArticle] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (article) => {
    setEditingArticle(article)
    setShowForm(true)
  }

  const handleSave = (article) => {
    onSaveArticle(article)
    setEditingArticle(null)
    setShowForm(false)
  }

  return (
    <div className="page page-padding">
      <div className="section-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage the full article library with add, edit, and delete controls.</p>
        </div>
        <button className="button button-primary" type="button" onClick={() => setShowForm(true)} disabled={isSaving}>
          {isSaving ? 'Please wait…' : 'Add Article'}
        </button>
      </div>

      {showForm && (
        <ArticleForm
          initialArticle={editingArticle}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingArticle(null)
          }}
          isSaving={isSaving}
        />
      )}

      <section className="grid-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            canEdit
            canDelete
            onEdit={handleEdit}
            onDelete={onDeleteArticle}
          />
        ))}
      </section>
    </div>
  )
}

export default AdminDashboard
