import { useState, useEffect } from 'react'

const defaultForm = {
  title: '',
  content: '',
  category: 'Art',
  type: 'Article',
}

function ArticleForm({ initialArticle = null, onSave, onCancel, isSaving = false }) {
  const [formData, setFormData] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialArticle) {
      setFormData(initialArticle)
    } else {
      setFormData(defaultForm)
    }
    setErrors({})
  }, [initialArticle])

  const handleChange = (key, value) => {
    setFormData((current) => ({ ...current, [key]: value }))
    setErrors((e) => ({ ...e, [key]: null }))
  }

  const validate = () => {
    const next = {}
    if (!formData.title || formData.title.trim().length < 3) next.title = 'Title must be at least 3 characters.'
    if (!formData.content || formData.content.trim().length < 10) next.content = 'Content must be at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    onSave(formData)
  }

  const isDisabled = isSaving

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h2>{initialArticle ? 'Edit Article' : 'Add Article'}</h2>

      <label>
        Title
        <input
          value={formData.title}
          onChange={(event) => handleChange('title', event.target.value)}
          placeholder="Enter article title"
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && <div className="form-error">{errors.title}</div>}
      </label>

      <label>
        Content
        <textarea
          value={formData.content}
          onChange={(event) => handleChange('content', event.target.value)}
          placeholder="Write an article summary or content"
          rows="5"
        />
        {errors.content && <div className="form-error">{errors.content}</div>}
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
        <button type="submit" className="button button-primary" disabled={isDisabled}>
          {isSaving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel} disabled={isDisabled}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ArticleForm
