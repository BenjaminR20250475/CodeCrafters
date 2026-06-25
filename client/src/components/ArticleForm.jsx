import { useState, useEffect } from 'react'

const defaultForm = {
  title: '',
  content: '',
  category: 'Art',
  type: 'Article',
}

function ArticleForm({ initialArticle = null, onSave, onCancel }) {
  const [formData, setFormData] = useState(defaultForm)

  useEffect(() => {
    if (initialArticle) {
      setFormData(initialArticle)
    } else {
      setFormData(defaultForm)
    }
  }, [initialArticle])

  const handleChange = (key, value) => {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.title || !formData.content) {
      return
    }

    onSave(formData)
    setFormData(defaultForm)
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{initialArticle ? 'Edit Article' : 'Add Article'}</h2>
      <label>
        Title
        <input
          value={formData.title}
          onChange={(event) => handleChange('title', event.target.value)}
          placeholder="Enter article title"
        />
      </label>

      <label>
        Content
        <textarea
          value={formData.content}
          onChange={(event) => handleChange('content', event.target.value)}
          placeholder="Write an article summary or content"
          rows="5"
        />
      </label>

      <label>
        Category
        <select value={formData.category} onChange={(event) => handleChange('category', event.target.value)}>
          <option value="Art">Art</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Technology">Technology</option>
        </select>
      </label>

      <label>
        Type
        <select value={formData.type} onChange={(event) => handleChange('type', event.target.value)}>
          <option value="Article">Article</option>
          <option value="Lesson">Lesson</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" className="button button-primary">
          Save
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ArticleForm
