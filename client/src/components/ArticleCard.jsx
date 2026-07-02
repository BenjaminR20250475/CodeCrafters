function ArticleCard({ article, onEdit, onDelete, canEdit, canDelete, onOpenArticle }) {
  return (
    <article className="card" onClick={() => onOpenArticle && onOpenArticle(article)}>
      <div className="card-header">
        <div>
          <h3>{article.title}</h3>
          <div className="meta">
            <span>{article.category}</span>
            <span>{article.type}</span>
          </div>
        </div>
      </div>

      {(canEdit || canDelete) && (
        <div className="card-actions">
          {canEdit && (
            <button className="button button-primary" type="button" onClick={(event) => { event.stopPropagation(); onEdit(article) }}>
              Edit
            </button>
          )}
          {canDelete && (
            <button className="button button-danger" type="button" onClick={(event) => { event.stopPropagation(); onDelete(article.id) }}>
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  )
}

export default ArticleCard
