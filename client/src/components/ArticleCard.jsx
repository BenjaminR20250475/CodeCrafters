function ArticleCard({ article, onEdit, onDelete, canEdit, canDelete }) {
  const snippet = article.content && article.content.length > 220 ? `${article.content.slice(0, 220)}...` : article.content

  return (
    <article className="card">
      <div className="card-header">
        <div>
          <h3>{article.title}</h3>
          <div className="meta">
            <span>{article.category}</span>
            <span>{article.type}</span>
          </div>
        </div>
      </div>

      <p className="card-text">{snippet}</p>

      {(canEdit || canDelete) && (
        <div className="card-actions">
          {canEdit && (
            <button className="button button-primary" type="button" onClick={() => onEdit(article)}>
              Edit
            </button>
          )}
          {canDelete && (
            <button className="button button-danger" type="button" onClick={() => onDelete(article.id)}>
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  )
}

export default ArticleCard
