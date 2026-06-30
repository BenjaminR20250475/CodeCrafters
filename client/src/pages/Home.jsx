import ArticleCard from '../components/ArticleCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'

function Home({ user, articles, search, category, onSearch, onCategory, loading, onOpenArticle }) {
  const filtered = articles.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(search.toLowerCase())
    return titleMatch
  })

  return (
    <div className="page page-padding">
      <div className="hero-panel">
        <div>
          <h1>Digital Articles for Students</h1>
          <p>Search by title or choose a category to explore the latest learning resources.</p>
        </div>
      </div>

      <section className="home-controls">
        <SearchBar value={search} onChange={onSearch} />
        <CategoryFilter categories={['All', 'Arts', 'Mathematics', 'Technology']} selected={category} onSelect={onCategory} />
      </section>

      <section className="grid-list">
        {loading ? (
          <div className="empty-state">
            <h2>Loading articles…</h2>
            <p>Please wait while we fetch the latest resources.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <h2>No articles available</h2>
            <p>Try another search term or category, or return later when articles are available.</p>
          </div>
        ) : (
          filtered.map((article) => (
            <ArticleCard key={article.id} article={article} onOpenArticle={onOpenArticle} />
          ))
        )}
      </section>
    </div>
  )
}

export default Home
