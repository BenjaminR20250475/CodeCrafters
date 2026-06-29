import { useState, useEffect } from 'react'

const defaultForm = {
  title: '',
  content: '',
  category: 'Arts',
  type: 'Biography',
  born: '',
  died: '',
  nationality: '',
  known_for: '',
  notable_works: '',
  designed_by: '',
  developer: '',
  medium: '',
  dimensions: '',
  location: '',
  year: '',
}

function ArticleForm({ initialArticle = null, onSave, onCancel, isSaving = false }) {
  const [formData, setFormData] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialArticle) {
      setFormData({
        ...defaultForm,
        title: initialArticle.title || '',
        content: initialArticle.content || '',
        category: initialArticle.category || 'Arts',
        type: initialArticle.type || 'Biography',
        born: initialArticle.born || '',
        died: initialArticle.died || '',
        nationality: initialArticle.nationality || '',
        known_for: initialArticle.known_for || '',
        notable_works: initialArticle.notable_works || '',
        designed_by: initialArticle.designed_by || '',
        developer: initialArticle.developer || '',
        medium: initialArticle.medium || '',
        dimensions: initialArticle.dimensions || '',
        location: initialArticle.location || '',
        year: initialArticle.year || '',
      })
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
          <option value="Arts">Arts</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Technology">Technology</option>
        </select>
      </label>

      <label>
        Type
        <select value={formData.type} onChange={(event) => handleChange('type', event.target.value)}>
          <option value="Biography">Biography</option>
          <option value="Programming">Programming</option>
          <option value="Painting">Painting</option>
          <option value="Theorem">Theorem</option>
          <option value="Algorithm">Algorithm</option>
        </select>
      </label>

      {formData.type === 'Biography' && (
        <>
          <label>
            Born
            <input
              value={formData.born}
              onChange={(event) => handleChange('born', event.target.value)}
              placeholder="Birth date or location"
            />
          </label>
          <label>
            Died
            <input
              value={formData.died}
              onChange={(event) => handleChange('died', event.target.value)}
              placeholder="Death date or location"
            />
          </label>
          <label>
            Nationality
            <input
              value={formData.nationality}
              onChange={(event) => handleChange('nationality', event.target.value)}
              placeholder="Nationality"
            />
          </label>
          <label>
            Known For
            <input
              value={formData.known_for}
              onChange={(event) => handleChange('known_for', event.target.value)}
              placeholder="Known for what"
            />
          </label>
          <label>
            Notable Works
            <input
              value={formData.notable_works}
              onChange={(event) => handleChange('notable_works', event.target.value)}
              placeholder="Notable works"
            />
          </label>
        </>
      )}

      {formData.type === 'Programming' && (
        <>
          <label>
            Designed By
            <input
              value={formData.designed_by}
              onChange={(event) => handleChange('designed_by', event.target.value)}
              placeholder="Designed by"
            />
          </label>
          <label>
            Developer
            <input
              value={formData.developer}
              onChange={(event) => handleChange('developer', event.target.value)}
              placeholder="Developer"
            />
          </label>
        </>
      )}

      {formData.type === 'Painting' && (
        <>
          <label>
            Medium
            <input
              value={formData.medium}
              onChange={(event) => handleChange('medium', event.target.value)}
              placeholder="Medium (e.g., oil on canvas)"
            />
          </label>
          <label>
            Dimensions
            <input
              value={formData.dimensions}
              onChange={(event) => handleChange('dimensions', event.target.value)}
              placeholder="Dimensions"
            />
          </label>
          <label>
            Location
            <input
              value={formData.location}
              onChange={(event) => handleChange('location', event.target.value)}
              placeholder="Current location"
            />
          </label>
          <label>
            Year
            <input
              value={formData.year}
              onChange={(event) => handleChange('year', event.target.value)}
              placeholder="Year created"
            />
          </label>
        </>
      )}

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
