import { useState } from 'react'
import ArticleCard from '../components/ArticleCard'
import ArticleForm from '../components/ArticleForm'

function TutorDashboard({ articles, onSaveArticle }) {
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
          <h1>Tutor Dashboard</h1>
          <p>Add or update articles to keep the learning resources current.</p>
        </div>
        <button className="button button-primary" type="button" onClick={() => setShowForm(true)}>
          Add Article
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
        />
      )}

      <section className="grid-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            canEdit
            onEdit={handleEdit}
          />
        ))}
      </section>
    </div>
  )
}

export default TutorDashboard
