import ArticleCard from '../components/ArticleCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'

function Home({ user, articles, search, category, onSearch, onCategory }) {
  const filtered = articles.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(search.toLowerCase())
    const categoryMatch = category === 'All' || article.category === category
    return titleMatch && categoryMatch
  })

  return (
    <div className="page page-padding">
      <div className="hero-panel">
        <div>
          <h1>Digital Articles for Students</h1>
          <p>Browse resources by category and search titles to discover learning material.</p>
        </div>
      </div>

      <section className="home-controls">
        <SearchBar value={search} onChange={onSearch} />
        <CategoryFilter categories={['All', 'Art', 'Mathematics', 'Technology']} selected={category} onSelect={onCategory} />
      </section>

      <section className="grid-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <h2>No articles found</h2>
            <p>Try a different search or category.</p>
          </div>
        ) : (
          filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </section>
    </div>
  )
}

export default Home
